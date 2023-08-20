use qrcodegen::{QrCode, QrCodeEcc};

pub fn generate_qr_code(data: &str) -> Result<QrCode, qrcodegen::QrCodeEcc> {
    QrCode::encode_text(data, QrCodeEcc::Medium)
}