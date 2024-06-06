mod routes;
mod qr_code;
mod errors;

use mongodb::{options::ClientOptions, Client};
use routes::qr::api_config;
use actix_web::{HttpResponse, web::Data};
use actix_web::{web, http, HttpServer, App, middleware::{DefaultHeaders, Logger}};
use actix_cors::Cors;

#[actix_web::main] //@spike - TODO: actix_rt vs actix_web::main
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let mut client_options = ClientOptions::parse("mongodb://localhost:27017")
        .await
        .expect("Failed to parse MongoDB options");

    client_options.app_name = Some("QR Code Tracking".to_string());
    let client = Client::with_options(client_options).expect("Failed to create MongoDB client");

    HttpServer::new(move || {
        let logger = Logger::default();
        App::new()
        .app_data(Data::new(client.clone()))
        .configure(api_config())
        .wrap(logger)
        .wrap(DefaultHeaders::new().add(("Access-Control-Allow-Origin", "*")))
        .wrap(Cors::default()
        .allow_any_origin()
        .allowed_methods(vec!["POST", "GET", "OPTIONS"])
        .allowed_headers(vec![
            http::header::AUTHORIZATION,
            http::header::ACCEPT,
            http::header::CONTENT_TYPE,
        ])
        .allowed_header(http::header::CONTENT_TYPE)
        .max_age(3600)
        .supports_credentials())
        .route("/health_check", web::get().to(|| HttpResponse::Ok()))
    })
    .bind(("127.0.0.1", 4000))?
    .run()
    .await
}
