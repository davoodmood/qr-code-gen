use rand::prelude::*;
use crate::model::metadata::Attribute;

pub fn populate_attributes(vec: &mut Vec<Attribute>) -> Vec<Attribute> {
    let mut rng = rand::thread_rng();
    
    for i in 0..200 {
        let attribute = Attribute {
            trait_type: Some("Flying Fish Tea Discount".to_string()),
            value: "20%".to_string(),
        };
        vec[i] = attribute;
    }
    for i in 200..220 {
        let attribute = Attribute {
            trait_type: Some("Audit One Discount".to_string()),
            value: "10%".to_string(),
        };
        vec[i] = attribute;
    }
    for i in 220..320 {
        let attribute = Attribute {
            trait_type: Some("soonami Event Priority List".to_string()),
            value: "true".to_string(),
        };
        vec[i] = attribute;
    }
    for i in 320..356 {
        let attribute = Attribute {
            trait_type: Some("".to_string()),
            value: "".to_string(),
        };
        vec[i] = attribute;
    }
    
    vec.shuffle(&mut rng);
    vec.to_vec()
}


