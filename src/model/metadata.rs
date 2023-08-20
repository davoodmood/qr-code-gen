use serde::{Serialize, Deserialize};
use std::hash::{Hash, Hasher};

#[derive(Serialize, Deserialize, Debug)]
pub struct SignedURIResponse {
  pub signature: String,
  pub ipfs_uri: String,
  pub metadata: QuarkCollectionMetadataStandard,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QuarkCollectionMetadataStandard {
  pub name: String,
  pub image: String,
  pub description: String,
  pub origins: Origins,
  pub attributes: Vec<Attribute>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Origins {
  pub template: Template,
  pub project: Project,
  pub collection: Collection,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Template {
  pub id: String,
  pub name: String,
  pub image: String,
  pub description: String,
  pub attributes: Option<Vec<AttributeValueOnly>>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
  pub id: String,
  pub name: String,
  pub image: String,
  pub description: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Collection {
  pub id: String,
  pub name: String,
  pub description: Option<String>,
  pub image: Option<String>,
  pub variations: String,
  pub attributes: Vec<Attribute>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum Variations {
  Dynamic,
  Static(u32),
}

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct Attribute {
  pub trait_type: Option<String>, 
  pub value: String, 
}

impl Hash for Attribute {
  fn hash<H: Hasher>(&self, state: &mut H) {
      self.trait_type.hash(state);
      self.value.hash(state);
  }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AttributeValueOnly {
  pub value: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum DisplayType {
  BoostPercentage,
  BoostNumber,
  Number,
  Date,
}