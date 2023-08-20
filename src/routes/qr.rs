use mongodb::Client;
use chrono::Utc;
use crate::errors::CustomError;

 fn api_config() -> Scope {
    web::scope("/api")
        // Add your route configurations here
        // For example:
        // .route("/index", web::get().to(index))
}

async fn generate_qr_code(data: web::Json<String>, db: web::Data<Client>) -> Result<HttpResponse, Error> {
    let qr_code = generator::generate_qr_code(&data)?;

    let image_data = qr_code.to_svg_string(4);
    let timestamp = Utc::now();

    let coll = db.database("qrcode_tracking").collection("tracking");
    let doc = doc! {
        "data": data.0.clone(),
        "timestamp": timestamp.to_string()
    };

    if coll.insert_one(doc, None).is_err() {
        return Err(CustomError.into());
    }

    Ok(HttpResponse::Ok().body(image_data))
}