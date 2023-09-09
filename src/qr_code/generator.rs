use qrcodegen::{QrCode, QrCodeEcc};

pub fn generate_qr_code(data: &str) -> Result<QrCode, qrcodegen::QrCodeEcc> {
    match QrCode::encode_text(data, QrCodeEcc::Medium) {
        Ok(qr_code) => Ok(qr_code),
        Err(DataTooLong) => Err(QrCodeEcc::Medium),
        Err(_) => Err(QrCodeEcc::Low), 
    }
}
