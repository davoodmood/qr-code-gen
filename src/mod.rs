pub mod qr_code {
    pub use self::generator::generate_qr_code;
    pub mod generator;
    pub mod extractor;
}