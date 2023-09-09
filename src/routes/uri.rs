use crate::model::metadata::{
    SignedURIResponse,
    QuarkCollectionMetadataStandard,
    Origins,
    Template,
    Project,
    Collection,
    Attribute,
    AttributeValueOnly,
};
use crate::library::hashtable::HashTable;
use dotenv::dotenv;
use serde::Deserialize;
use std::env;
use std::str::FromStr;
use pinata_sdk::{PinataApi, PinByJson};
use hex;
use ethers_signers::{Signer, LocalWallet};
use ethers::utils;
use ethers_core::abi::encode;
use ethers_core::types::{Address, U256};
use mime;
// use std::{env};
// use serde::{Deserialize};
// use std::fmt;
use derive_more::Display;
use actix_files as fs;
use actix_web::{
    get,
    post, 
    error::ResponseError,
    web::Json,
    HttpResponse,
    HttpRequest,
    http::{header::ContentType, StatusCode}
};



#[derive(Deserialize, Debug)]
pub struct SubmitIngridients {
    combination: String,
}

#[derive(Debug, Display)]
pub enum TaskError {
    SignatureFailed,
    MetadataFailed,
    NftTaken,
}

// impl fmt::Display for TaskError {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         match self {
//             TaskError::SignatureFailed => write!(f, "Signature failed"),
//             TaskError::MetadataFailed => write!(f, "Metadata failed"),
//             TaskError::NftTaken => write!(f, "NFT already taken"),
//         }
//     }
// }


impl ResponseError for TaskError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
        .insert_header(ContentType::json())
        .body(self.to_string())
    }

    fn status_code(&self) -> StatusCode {
        match self {
            TaskError::SignatureFailed => StatusCode::FAILED_DEPENDENCY,
            TaskError::MetadataFailed => StatusCode::FAILED_DEPENDENCY,
            TaskError::NftTaken => StatusCode::METHOD_NOT_ALLOWED,
        }
    }
}



#[get("/mint")]
async fn mint(_req: HttpRequest) -> actix_web::Result<fs::NamedFile> {
    let file = fs::NamedFile::open(format!("html/mint.html"))?;
    let mime_type = mime::Mime::from_str("text/html").expect("Failed to set MimeType"); ///@dev: handle error
    Ok(file.set_content_type(mime_type))
}

#[get("/")]
async fn index(_req: HttpRequest) -> actix_web::Result<fs::NamedFile> {
    let file = fs::NamedFile::open(format!("html/index.html"))?;
    let mime_type = mime::Mime::from_str("text/html").expect("Failed to set MimeType"); ///@dev: handle error
    Ok(file.set_content_type(mime_type))
}

#[get("/{filename:.*}")]
async fn files(req: HttpRequest) -> actix_web::Result<fs::NamedFile> {
    // Serve static files from the "html" directory
    let path: std::path::PathBuf = req.match_info().query("filename").parse().map_err(|_| {
        actix_web::error::ErrorBadRequest("Invalid filename parameter")
    })?;
    let file_path = format!("html/{}", path.display());
    let file = match fs::NamedFile::open(&file_path) {
        Ok(file) => file,
        Err(error) => {
            if error.kind() == std::io::ErrorKind::NotFound {
                return Err(actix_web::error::ErrorNotFound("File not found"));
            } else {
                return Err(actix_web::error::ErrorInternalServerError("Failed to read file"));
            }
        }
    };

    // Set content type based on file extension
    let extension = file
        .path()
        .extension()
        .and_then(std::ffi::OsStr::to_str)
        .ok_or_else(|| actix_web::error::ErrorInternalServerError("Failed to get file extension"))?;
    let content_type = match extension {
        "html" => "text/html",
        "css" => "text/css",
        "js" => "text/javascript",
        "ttf" => "font/ttf",
        "jpeg" | "jpg" => "image/jpeg",
        "png" => "image/png",
        "gif" => "image/gif",
        "svg" => "image/svg+xml",
        "mp4" => "video/mp4",
        _ => "application/octet-stream",
    };
    let mime_type = mime::Mime::from_str(content_type).expect("Failed to set MimeType"); ///@dev: handle error
    Ok(file.set_content_type(mime_type))
}


#[post("/uri")]
pub async fn create_uri(
    request: Json<SubmitIngridients>
) -> Result<Json<SignedURIResponse>, TaskError> {
    let combination = request.combination.clone();

     let mut hashtable: HashTable<String> = HashTable::new(365, "hashtable.bin");
     let key = hashtable.insert(combination.clone()); //@backup prev. line: combination.clone()

    let response = if key < 365 {
        let dynamic_attributes: HashTable<Attribute> = HashTable::new(365, "attributes.bin");

        let ingridients: Vec<String> = combination.split("_").map(|s| s.to_string()).collect();
        let mut attributes = Vec::new();
        for i in 0..ingridients.len() {
            let attribute = Attribute {
                trait_type: Some(String::from("ingredient")),
                value: format!("{}", ingridients[i]),
            };
            attributes.push(attribute);
        };
        attributes.push(Attribute {
            trait_type: Some(String::from("token drop")),
            value: format!("{}", String::from("true")),
        });

        if let Some(attribute) = dynamic_attributes.data[key].clone() {
            if attribute.value.len() > 0 {
                attributes.push(attribute);
            }
        }
        
        let attributes_opensea = attributes.clone();

        // create the metadata
        let name = format!("NFTea");
        let image = format!("https://ipfs.io/ipfs/QmcQrUhV9wk24PUXC72gJL1JnSvshBRZZ4E2EJYJ8643V8/{}.png", key + 1); //is this correct?=> array[i] or i ?? <<<<==== Davood =>>>>>>>>
        let description = format!("Our NFTeas are truly special blend utilising the power of mQuark , they are more than an image,  they are transformed into living, breathing pieces of art, each with its own unique flavour and personality. Infinitely upgradable through this metadata they offer true interoperability - take them anywhere!");
        let origins = Origins {
            template: Template {
                id: format!("1"),
                name: format!("mQuark Beverage"),
                image: format!("https://ipfs.io/ipfs/QmTxpSbXqB5m7PsnEzofMnVTCoyUCJy1i224t2Kv9WZoa4"),
                description: format!("This is a Beverage Template, a simple representation of beverage-typed NFT collections."),
                attributes: Some(vec![
                    AttributeValueOnly {
                        value: format!("Type"),
                    },
                    AttributeValueOnly {
                        value: format!("Temperature"),
                    },
                    AttributeValueOnly {
                        value: format!("Ingredient Type"),
                    },
                    AttributeValueOnly {
                        value: format!("Sweetness Level"),
                    },
                    AttributeValueOnly {
                        value: format!("Size"),
                    },
                    AttributeValueOnly {
                        value: format!("Milk Type"),
                    },
                    AttributeValueOnly {
                        value: format!("Effect"),
                    },
                    AttributeValueOnly {
                        value: format!("Container"),
                    },
                    AttributeValueOnly {
                        value: format!("Rarity"),
                    },
                ]),
            },
            project: Project {
                id: format!("1"),
                name: format!("Flying Fish Tea Co."),
                image: format!("ipfs://Qmc3HpEBVU1Stj47Pwui2grhS6G9UvBumNr6Z23KosL6z9"),
                description: Some(format!("https://www.flyingfishtea.co.uk/pages/about-us")),
            },
            collection: Collection {
                id: format!("1"),
                name: format!("NFTea"),
                description: Some(format!("Once upon a time, in a land where teas were kings, six unique ones lived together in harmony. Black tea, White tea, Green tea, Rooibos tea, Pu-erh tea, and Oolong tea each had their own special qualities and lived in separate tea gardens, content with their daily routines. But one day, they heard whispers of a revolutionary new world, a place where they could become more than just tea - the world of Web3.\nExcited by the prospect of becoming something truly unique, the teas decided to embark on a journey together to discover this magical land. Along the way, they gathered special ingredients to enhance their flavors and make themselves stand out from the rest.\nFinally, they arrived at the entrance to the Web3 world - a sprawling marketplace filled with opportunities and challenges. As they explored this new and exciting place, they discovered that they could use blockchain technology to create unique digital representations of themselves, each with their own special blend of ingredients.\nThe teas worked tirelessly, perfecting their digital creations and blending themselves with the finest ingredients. And soon, they were transformed into living, breathing pieces of art, each with its own unique flavor and personality.\nAs they explored the Web3 world, they encountered other digital creations and formed friendships with them. They learned that they could trade their digital representations with others and that their creations would live forever, becoming a part of Web3's rich history.\nAnd so, the six teas lived happily ever after, continuing to explore the wonders of web3 and sharing their unique creations with the world. They knew that they would never forget their journey and the lessons they had learned along the way.")),
                image: Some(format!("ipfs://QmRNP2Djjc4VPviY3T6A56pKbq9ssjzXKEu52hc9YBxmNX")),
                variations: String::from("dynamic"),
                attributes,
            },
        };

        let raw_metadata = QuarkCollectionMetadataStandard {
            name,
            image,
            description,
            origins,
            attributes: attributes_opensea,
        };

        // Load env variables
        dotenv().ok();
        let pinata_api_key = env::var("PINATA_API_KEY").expect("PINATA_API_KEY must be set in the .env file"); ///@dev: handle the error case  
        let pinata_secret_api_key = env::var("PINATA_SECRET_API_KEY").expect("PINATA_SECRET_API_KEY must be set in the .env file"); ///@dev: handle the error case  
        
        // IPFS response
        let pinata_api = match PinataApi::new(pinata_api_key, pinata_secret_api_key) {
            Ok(api) => api,
            Err(_) => {
                hashtable.delete(&combination.clone());
                return Err(TaskError::MetadataFailed);
            }
        };

        let result = pinata_api.pin_json(PinByJson::new(&raw_metadata)).await; //@dev - initially raw_metadata.clone()
        if let Ok(pinned_object) = result {
            let hash = pinned_object.ipfs_hash;
            let ipfs_uri = format!(
                "ipfs://{}", hash 
            );

            let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set in the .env file"); ///@dev: handle the error case  
            let signature = match sign_message(&private_key, &ipfs_uri).await {
                Ok(sig) => sig,
                Err(_) => {
                    hashtable.delete(&combination.clone());
                    return Err(TaskError::SignatureFailed);
                }
            };
            let signature_hex = hex::encode(signature);

            let response_data = SignedURIResponse {
                signature: signature_hex, 
                ipfs_uri,
                metadata: raw_metadata
            };

            Ok::<Json<SignedURIResponse>, TaskError>(Json(response_data))

        } else {
            hashtable.delete(&combination.clone());
            return Err(TaskError::MetadataFailed);
        }
    } else {
        return Err(TaskError::NftTaken);
    };

    response

}


async fn sign_message(hex_private_key: &str, uri: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let wallet = hex_private_key.trim_start_matches("0x").parse::<LocalWallet>().expect("wallet wasnt created"); ///@dev: handle error case
    // println!("wallet address is: {}", wallet.address());

    let verifier = "0x49dbfb94314CF76b2Fe990e9dc5E59AF7b68E4b1".parse::<Address>().expect("failed to parse verifier address");  ///@dev: handle error case
    let project_id = U256::from(1u64);
    let template_id = U256::from(1u64);
    let collection_id = U256::from(1u64);

    let hash_data = encode(&[
        ethers_core::abi::Token::Address(verifier),
        ethers_core::abi::Token::Uint(project_id),
        ethers_core::abi::Token::Uint(template_id),
        ethers_core::abi::Token::Uint(collection_id),
        ethers_core::abi::Token::String(uri.to_string()),
        ethers_core::abi::Token::Bytes(vec![1u8]),
    ]);

    let hashed_data = utils::keccak256(hash_data.as_slice());
    let signature = wallet.sign_message(hashed_data).await.expect("signing the message failed!");  ///@dev: handle error case
    let signature_hex = format!("0x{}", signature);
    hex::decode(signature_hex.trim_start_matches("0x")).map_err(|e| e.into())
}
