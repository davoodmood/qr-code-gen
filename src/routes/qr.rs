use std::io::Cursor;
use actix_web::{web, HttpResponse};
use base64::{engine::general_purpose, Engine as _};
use mongodb::{Client, bson::doc};
use chrono::Utc;
use qrcodegen::QrCode;
use crate::errors::CustomError;
use crate::qr_code::generator;
use image::{
	codecs::png::PngEncoder, 
    DynamicImage, 
    ExtendedColorType, 
    GenericImageView, 
    ImageBuffer, 
    ImageEncoder, 
    Rgba
};


#[derive(serde::Deserialize)] // Deserialize the JSON data into this struct
struct JsonData {
    data: String,
	logo_base64: Option<String>,
    background_color: Option<String>,
    dot_color: Option<String>,
	format: Option<String>,  // Add format field ("png" or "svg")
    size: Option<u32>,       // Add size field for the QR code size
	border: Option<u32>,
	border_radius: Option<u32>,
}

pub(crate) fn api_config() -> impl FnOnce(&mut web::ServiceConfig) {
    move | cfg: &mut web::ServiceConfig| {
        // Add your service configurations here

        // Create a scope for "/api/v1"
        cfg.service(
            web::scope("/api/v1")
                // Add your route configurations within the scope
                .route("/createQr", web::post().to(generate_qr_code))
                // .route("/another", web::get().to(another_handler)),
        );
    }
}


async fn generate_qr_code(data: web::Json<JsonData>, db: web::Data<Client>) -> Result<HttpResponse, CustomError> {
    let json_string= &data.data;

	// Log the received JSON string for debugging
    log::debug!("Received JSON data: {}", json_string);
	
	let qr_code_content = match generator::generate_qr_code(json_string) {
        Ok(qr_code_content) => qr_code_content,
        Err(_) => return Err(CustomError.into()), // Handle the error and convert it to CustomError
    };

	let size = data.size.unwrap_or(256);  // Default size if not provided
    let border = data.border.unwrap_or(4) as i32;
	let border_radius = data.border_radius.unwrap_or(0) as i32;
	let format = data.format.as_deref().unwrap_or("png");  // Default format if not provided

    if format == "svg" {
        let svg_data = to_svg_string(
			&qr_code_content, 
			border, 
			&data.background_color, 
			&data.dot_color, 
			data.logo_base64.as_deref(),
			size,
			border_radius
		)?;
        return Ok(HttpResponse::Ok().content_type("image/svg+xml").body(svg_data));
    }

    let mut qr_image = generate_image(
		&qr_code_content, 
		&data.background_color, 
		&data.dot_color, 
		size,
		border,
		border_radius
	);

    if let Some(logo_base64) = &data.logo_base64 {
        qr_image = overlay_logo(&qr_image, logo_base64).await?;
    }
    
	let mut buf = Cursor::new(Vec::new());
    let encoder = PngEncoder::new(&mut buf);
    encoder.write_image(
        qr_image.to_rgba8().as_raw(),
        qr_image.width(),
        qr_image.height(),
        ExtendedColorType::Rgba8,
    ).map_err(|_| CustomError)?;

    let encoded_image = buf.into_inner();

	let timestamp = Utc::now();

    let coll = db.database("qrcode_tracking").collection("tracking");

	let cloned_json_string = json_string.clone();

    let doc = doc! {
        "data": cloned_json_string,
        "timestamp": timestamp.to_string()
    };

    let insert_result = coll.insert_one(doc, None).await;
    
	match insert_result {
        Ok(_) => Ok(HttpResponse::Ok().content_type("image/png").body(encoded_image)),
        Err(_) => Err(CustomError.into()),
    }
}


/*---- Utilities ----*/

// Returns a string of SVG code for an image depicting
// the given QR Code, with the given number of border modules.
// The string always uses Unix newlines (\n), regardless of the platform.
fn to_svg_string(
    qr: &QrCode,
    border: i32,
    background_color: &Option<String>,
    dot_color: &Option<String>,
    logo_base64: Option<&str>,
    size: u32, // Add size parameter for user input size
	border_radius: i32, // Add border radius parameter for user input border radius
) -> Result<String, CustomError> {
    assert!(border >= 0, "Border must be non-negative");

    let bg_color = background_color.as_deref().unwrap_or("#FFFFFF");
    let dot_color = dot_color.as_deref().unwrap_or("#000000");

    // Calculate the actual dimension considering the border
    let dimension = qr.size() as u32;
	// let dimension = qr.size().checked_add(border.checked_mul(2).unwrap()).unwrap(); //@dev: handle the unwraps gracefully

	let mut result = String::new();
    result += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    result += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    result += &format!(
        "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"{}\" height=\"{}\" viewBox=\"0 0 {} {}\" stroke=\"none\">\n",
        size, size, size, size
    );
    result += &format!("\t<rect width=\"100%\" height=\"100%\" fill=\"{}\"/>\n", bg_color);


    // Calculate the scaling factor based on the user input size
    let scale = (size - 2 * border as u32) as f32 / dimension as f32;

    // Calculate the position for the QR code content
    let content_start_x = border as f32;
    let content_start_y = border as f32;

	// Calculate coordinates of bottom-left and bottom-right corners
    let bottom_left = qr.size() - 1;
    let bottom_right = qr.size() - 1;

    // Draw the QR code content
    for y in 0..qr.size() {
        for x in 0..qr.size() {
            if qr.get_module(x, y) {
				let border_radius = match (x, y) {
                    (0, 0) => border_radius, // Top-left corner
                    (0, bottom_left) => border_radius, // Bottom-left corner
                    (bottom_right, 0) => border_radius, // Top-right corner
                    (bottom_right, bottom_left) => border_radius, // Bottom-right corner
                    _ => 0, // Other modules
                };


                result += &format!("\t<rect x=\"{}\" y=\"{}\" width=\"{}\" height=\"{}\" fill=\"{}\" rx=\"{}\"/>\n",
                    content_start_x + x as f32 * scale,
                    content_start_y + y as f32 * scale,
                    scale,
                    scale,
                    dot_color,
					border_radius
                );
            }
        }
    }

    // Add logo if provided
    if let Some(logo_base64) = logo_base64 {
        let decoded_logo = general_purpose::STANDARD.decode(logo_base64).map_err(|_| CustomError)?;
        let logo = image::load_from_memory(&decoded_logo).map_err(|_| CustomError)?;
        let (logo_width, logo_height) = logo.dimensions();

        // Calculate the maximum size that fits inside the QR code
        let max_logo_size = qr.size() * 4 ; // Adjust the scaling factor as needed
		let logo_scale = max_logo_size as f32 / logo_width as f32;
        let new_logo_width = (logo_width as f32 * logo_scale) as u32;
        let new_logo_height = (logo_height as f32 * logo_scale) as u32;

        // Calculate the position to center the logo on the QR code
        let logo_x = (size - new_logo_width) / 2;
        let logo_y = (size - new_logo_height) / 2;

        // Embed the logo as an image
        let logo_data_url = format!("data:image/png;base64,{}", general_purpose::STANDARD.encode(&decoded_logo));
        result += &format!(
            "<image href=\"{}\" x=\"{}\" y=\"{}\" width=\"{}\" height=\"{}\" />\n",
            logo_data_url, logo_x, logo_y, new_logo_width, new_logo_height
        );
    }

    result += "</svg>\n";
    Ok(result)

}

async fn overlay_logo(qr_image: &DynamicImage, logo_base64: &str) -> Result<DynamicImage, CustomError> {
    // Decode the base64 logo
    let decoded_logo = general_purpose::STANDARD.decode(logo_base64).map_err(|_| CustomError)?;
    let logo = image::load_from_memory(&decoded_logo).map_err(|_| CustomError)?;

    // Determine the scaling factor and resize the logo
    let (qr_width, qr_height) = qr_image.dimensions();
    let (logo_width, logo_height) = logo.dimensions();

    // Determine the maximum size of the logo (e.g., 1/4th of the QR code size)
    let max_logo_size = qr_width.min(qr_height) / 4;
    let scale = (max_logo_size as f32 / logo_width as f32).min(max_logo_size as f32 / logo_height as f32);
    let new_logo_width = (logo_width as f32 * scale).round() as u32;
    let new_logo_height = (logo_height as f32 * scale).round() as u32;

    let resized_logo = logo.resize(new_logo_width, new_logo_height, image::imageops::Lanczos3);

    // Calculate the position to center the logo on the QR code
    let logo_x = (qr_width - new_logo_width) / 2;
    let logo_y = (qr_height - new_logo_height) / 2;

    // Create a mutable copy of the QR code image and overlay the resized logo onto it
    let mut qr_image = qr_image.clone();
    image::imageops::overlay(&mut qr_image, &resized_logo, logo_x.into(), logo_y.into());

    Ok(qr_image)
}


fn generate_image(
    qr_code_content: &QrCode,
    background_color: &Option<String>,
    dot_color: &Option<String>,
    size: u32,
    border: i32, // Added border parameter
    border_radius: i32, // Added border_radius parameter
) -> DynamicImage {

	let scale = size / qr_code_content.size() as u32;
    let image_size = qr_code_content.size() * scale as i32 + 2 * border;
    let mut image = ImageBuffer::new(image_size as u32, image_size as u32);

    let bg_color = parse_color(background_color.as_deref().unwrap_or("#FFFFFF"));
    let dot_color = parse_color(dot_color.as_deref().unwrap_or("#000000"));

    let border_color = bg_color; // Border color is same as background color

    // Draw the background color
    for y in 0..image_size as u32 {
        for x in 0..image_size as u32 {
            image.put_pixel(x, y, bg_color);
        }
    }

    // Draw QR code content
    for y in 0..qr_code_content.size() {
        for x in 0..qr_code_content.size() {
            let color = if qr_code_content.get_module(x, y) { dot_color } else { bg_color };
            for dy in 0..scale {
                for dx in 0..scale {
                    let px = (x * scale as i32 + dx as i32 + border) as u32;
                    let py = (y * scale as i32 + dy as i32 + border) as u32;
                    image.put_pixel(px, py, color.clone());
					// _draw_gliched_rect(
					// 	&mut image,
					// 	px as i32,
					// 	py as i32,
					// 	scale,
					// 	scale,
					// 	border_radius as u32,
					// 	color,
					// );
                }
            }
        }
    }

	DynamicImage::ImageRgba8(image)
}


fn parse_color(hex: &str) -> Rgba<u8> {
    let hex = hex.trim_start_matches('#');
    let (r, g, b) = match hex.len() {
        6 => {
            let r = u8::from_str_radix(&hex[0..2], 16).unwrap();
            let g = u8::from_str_radix(&hex[2..4], 16).unwrap();
            let b = u8::from_str_radix(&hex[4..6], 16).unwrap();
            (r, g, b)
        },
        _ => (255, 255, 255), // default to white if the hex code is invalid
    };
    Rgba([r, g, b, 255])
}


// used for drawing dots with gliched shape
fn _draw_gliched_rect(
    image: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,
    x: u32,
    y: u32,
    width: u32,
    height: u32,
    radius: u32,
    color: Rgba<u8>,
) {
    // Iterate over each pixel in the rectangle
    for i in x..x + width {
        for j in y..y + height {
            // Check if the pixel is within the rounded corners
            if is_in_rounded_rect(i, j, x, y, width, height, radius) {
                image.put_pixel(i, j, color);
            }
        }
    }
}

// Check if a pixel is within the rounded corners of the rectangle
fn is_in_rounded_rect(
    x: u32,
    y: u32,
    rect_x: u32,
    rect_y: u32,
    rect_width: u32,
    rect_height: u32,
    radius: u32,
) -> bool {
    let left = rect_x;
    let right = rect_x + rect_width - 1;
    let top = rect_y;
    let bottom = rect_y + rect_height - 1;

    let mut corner_flags = 0;

    // Determine which corners of the rectangle are rounded
    if x >= left && x <= left + radius && y >= top && y <= top + radius {
        // Top-left corner
        corner_flags |= 0b0001;
    }
    if x >= right - radius && x <= right && y >= top && y <= top + radius {
        // Top-right corner
        corner_flags |= 0b0010;
    }
    if x >= left && x <= left + radius && y >= bottom - radius && y <= bottom {
        // Bottom-left corner
        corner_flags |= 0b0100;
    }
    if x >= right - radius && x <= right && y >= bottom - radius && y <= bottom {
        // Bottom-right corner
        corner_flags |= 0b1000;
    }

    // Check if the pixel is within the rounded corners
    match corner_flags {
        0b0001 => is_in_circle(x, y, (left + radius, top + radius), radius),
        0b0010 => is_in_circle(x, y, (right - radius, top + radius), radius),
        0b0100 => is_in_circle(x, y, (left + radius, bottom - radius), radius),
        0b1000 => is_in_circle(x, y, (right - radius, bottom - radius), radius),
        _ => true, // Not in any of the corners, inside rectangle
    }
}

// Check if a pixel is within a circle with a given center and radius
fn is_in_circle(x: u32, y: u32, center: (u32, u32), radius: u32) -> bool {
    let dx = x as i32 - center.0 as i32;
    let dy = y as i32 - center.1 as i32;
    (dx * dx + dy * dy) <= (radius * radius) as i32
}



// Prints the given QrCode object to the console.
fn print_qr(qr: &QrCode) {
	let border: i32 = 4;
	for y in -border .. qr.size() + border {
		for x in -border .. qr.size() + border {
			let c: char = if qr.get_module(x, y) { '█' } else { ' ' };
			print!("{0}{0}", c);
		}
		println!();
	}
	println!();
}
