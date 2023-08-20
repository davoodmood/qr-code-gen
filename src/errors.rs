use actix_web::error::ResponseError;
use std::fmt;

#[derive(Debug)]
pub struct CustomError;

impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Custom error")
    }
}

impl ResponseError for CustomError {}