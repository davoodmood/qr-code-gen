pub fn extract_data(data: &str) -> Result<serde_json::Value, serde_json::Error> {
    serde_json::from_str(data)
}