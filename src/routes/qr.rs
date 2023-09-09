use actix_web::{web, HttpResponse};
use mongodb::{Client, bson::doc};
use chrono::Utc;
use qrcodegen::QrCode;
use crate::errors::CustomError;
use crate::qr_code::generator;

pub(crate) fn api_config() -> impl FnOnce(&mut web::ServiceConfig) {
    move |cfg: &mut web::ServiceConfig| {
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


async fn generate_qr_code(data: web::Json<String>, db: web::Data<Client>) -> Result<HttpResponse, CustomError> {
    let qr_code_content = match generator::generate_qr_code(&data) {
        Ok(qr_code_content) => qr_code_content,
        Err(_) => return Err(CustomError.into()), // Handle the error and convert it to CustomError
    };

    let image_data = to_svg_string(&qr_code_content, 4);
    let timestamp = Utc::now();

    let coll = db.database("qrcode_tracking").collection("tracking");
    let doc = doc! {
        "data": data.0.clone(),
        "timestamp": timestamp.to_string()
    };

    let insert_result = coll.insert_one(doc, None).await;
    
    match insert_result {
        Ok(_) => Ok(HttpResponse::Ok().body(image_data)),
        Err(_) => Err(CustomError.into()),
    }


    // Ok(HttpResponse::Ok().body(image_data))
}


/*---- Utilities ----*/

// Returns a string of SVG code for an image depicting
// the given QR Code, with the given number of border modules.
// The string always uses Unix newlines (\n), regardless of the platform.
fn to_svg_string(qr: &QrCode, border: i32) -> String {
	assert!(border >= 0, "Border must be non-negative");
	let mut result = String::new();
	result += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	result += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
	let dimension = qr.size().checked_add(border.checked_mul(2).unwrap()).unwrap(); //@dev: handle the unwraps gracefully
	result += &format!(
		"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 {0} {0}\" stroke=\"none\">\n", dimension);
	result += "\t<rect width=\"100%\" height=\"100%\" fill=\"#FFFFFF\"/>\n";
	result += "\t<path d=\"";
	for y in 0 .. qr.size() {
		for x in 0 .. qr.size() {
			if qr.get_module(x, y) {
				if x != 0 || y != 0 {
					result += " ";
				}
				result += &format!("M{},{}h1v1h-1z", x + border, y + border);
			}
		}
	}
	result += "\" fill=\"#000000\"/>\n";
	result += "</svg>\n";
	result
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