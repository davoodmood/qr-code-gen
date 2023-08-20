const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "TokenMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "VoluntaryContributionWithoutMint",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getMintStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalContribution",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "mintedAddresses",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ImQuark",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setmQuark",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "salt",
        "type": "bytes"
      }
    ],
    "name": "voluntaryContributionMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voluntaryContributionWithoutMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
const mquark_abi = [
  {
    "inputs": [
      {
        "internalType": "contract ImQuarkControl",
        "name": "mQuarkControl_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AddedSlot",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BuyerIsNotOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CallerNotAuthorized",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CollectionIsNotFreeForMint",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExceedsLimit",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GivenTokenAddressNotRegistered",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidCollectionId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidContractAddress",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      }
    ],
    "name": "InvalidId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidIdAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTemplateId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTokenAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTokenId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidVariation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LengthMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "LockedNFT",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NonERC721Implementer",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotEnoughSupply",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "OperatorNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ProjectIdZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SellerGivenURIMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SellerIsNotOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UnexistingToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UnexsistingTokenMint",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UriSLotUnexist",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UsedSignature",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VerificationFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WrongMintType",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "collectionPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "totalSupply",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string[]",
        "name": "collectionUris",
        "type": "string[]"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "collectionType",
        "type": "uint8"
      }
    ],
    "name": "CollectionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "templateUri",
        "type": "string"
      }
    ],
    "name": "ExternalCollectionRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "variationId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "NFTMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "variationId",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "NFTMintedFree",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "NFTMintedWithPreUri",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      }
    ],
    "name": "ProjectSlotURIReset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "ProjectURISlotAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "updatedUri",
        "type": "string"
      }
    ],
    "name": "ProjectURIUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "reciever",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "royaltyAmount",
        "type": "uint256"
      }
    ],
    "name": "RoyaltySet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "OPERATOR_FILTER_REGISTRY",
    "outputs": [
      {
        "internalType": "contract IOperatorFilterRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "tokensContracts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "projectDefaultUris",
        "type": "string"
      }
    ],
    "name": "addBatchURISlotToNFTs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "projectIds",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "projectSlotDefaultUris",
        "type": "string[]"
      }
    ],
    "name": "addBatchURISlotsToNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "projectSlotDefaultUri",
        "type": "string"
      }
    ],
    "name": "addURISlotToNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "royaltyReciever",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "templateIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "collectionIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "collectionPrices",
            "type": "uint256[]"
          },
          {
            "internalType": "uint16[]",
            "name": "totalSupplies",
            "type": "uint16[]"
          }
        ],
        "internalType": "struct ImQuark.CreateCollectionParams",
        "name": "createParams",
        "type": "tuple"
      },
      {
        "internalType": "bytes[][]",
        "name": "signatures",
        "type": "bytes[][]"
      },
      {
        "internalType": "string[][]",
        "name": "uris",
        "type": "string[][]"
      },
      {
        "internalType": "bool[]",
        "name": "isCollectionFree",
        "type": "bool[]"
      }
    ],
    "name": "createCollections",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "royaltyReciever",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "templateIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "collectionIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "collectionPrices",
            "type": "uint256[]"
          },
          {
            "internalType": "uint16[]",
            "name": "totalSupplies",
            "type": "uint16[]"
          }
        ],
        "internalType": "struct ImQuark.CreateCollectionParams",
        "name": "createParams",
        "type": "tuple"
      },
      {
        "internalType": "bool[]",
        "name": "isCollectionFree",
        "type": "bool[]"
      }
    ],
    "name": "createCollectionsWithoutURIs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collectionAddress",
        "type": "address"
      }
    ],
    "name": "externalCollectionURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getIsFreeMinted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      }
    ],
    "name": "getProjectCollection",
    "outputs": [
      {
        "internalType": "address",
        "name": "_royaltyReceiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_collectionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minTokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxTokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "mintCount",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "collectionURIs",
        "type": "string[]"
      },
      {
        "internalType": "uint16",
        "name": "totalSupply",
        "type": "uint16"
      },
      {
        "internalType": "uint8",
        "name": "mintType",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      }
    ],
    "name": "getProjectLastCollectionId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalTokenIdVariable",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      }
    ],
    "name": "isSlotAddedForProject",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isAdded",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mQuarkControl",
    "outputs": [
      {
        "internalType": "contract ImQuarkControl",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "variationId",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "templateIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "collectionIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "variationIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint16[]",
        "name": "amounts",
        "type": "uint16[]"
      }
    ],
    "name": "mintBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "templateIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "collectionIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "variationIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint16[]",
        "name": "amounts",
        "type": "uint16[]"
      },
      {
        "internalType": "string",
        "name": "projectDefaultUri",
        "type": "string"
      }
    ],
    "name": "mintBatchWithURISlot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "variationId",
        "type": "uint256"
      }
    ],
    "name": "mintFree",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "salt",
        "type": "bytes"
      }
    ],
    "name": "mintFreeWithPreURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "salt",
        "type": "bytes"
      }
    ],
    "name": "mintWithPreURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "variationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "projectIds",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "projectSlotDefaultUris",
        "type": "string[]"
      }
    ],
    "name": "mintWithURISlots",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "templateUri",
        "type": "string"
      }
    ],
    "name": "registerExternalCollection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_salePrice",
        "type": "uint256"
      }
    ],
    "name": "royaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "royaltyPercentage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "royaltyReceiver",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_royaltyPercentage",
        "type": "uint256"
      }
    ],
    "name": "setRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      }
    ],
    "name": "tokenProjectURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address payable",
            "name": "seller",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "fromContractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "fromTokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "projectId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "slotUri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "sellPrice",
            "type": "uint256"
          }
        ],
        "internalType": "struct ImQuark.SellOrder",
        "name": "seller",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "fromContractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "fromTokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "toContractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "toTokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "projectId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "slotUri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "buyPrice",
            "type": "uint256"
          }
        ],
        "internalType": "struct ImQuark.BuyOrder",
        "name": "buyer",
        "type": "tuple"
      },
      {
        "internalType": "string",
        "name": "projectDefaultUri",
        "type": "string"
      }
    ],
    "name": "transferTokenProjectURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "templateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "unlockFreeMintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "project",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "updatedUri",
        "type": "string"
      }
    ],
    "name": "updateURISlot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// const primary_ingredients = [
//     {
//         id: 0,
//         name: "Back Tea",
//         image: "",
//         weight: 2,
//     },
//     {
//         id: 1,
//         name: "White Tea",
//         image: "",
//         weight: 2,
//     },
//     {
//         id: 2,
//         name: "Green Tea",
//         image: "",
//         weight: 2,
//     },
//     {
//         id: 3,
//         name: "Rooibos Tea",
//         image: "",
//         weight: 2,
//     },
//     {
//         id: 4,
//         name: "Oolong Tea",
//         image: "",
//         weight: 2,
//     },
//     {
//         id: 5,
//         name: "Pu-erh Tea",
//         image: "",
//         weight: 2,
//     }
// ]

// const secondary_ingredients = [
//     {
//         id: 6,
//         name: "Cinnamon",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 7,
//         name: "Bergamot",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 8,
//         name: "Jasmine",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 9,
//         name: "Star Anise",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 10,
//         name: "Mixed berries",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 11,
//         name: "Mixed fruit",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 12,
//         name: "Pineapple",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 13,
//         name: "Mint",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 14,
//         name: "Citrus zest",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 15,
//         name: "Chamomile",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 16,
//         name: "Lemongrass",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 17,
//         name: "Hibiscus",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 18,
//         name: "Ginger",
//         image: "",
//         weight: 1,
//     },
//     {
//         id: 19,
//         name: "Cardamom",
//         image: "",
//         weight: 1,
//     }
// ]

// module.exports = {
//     primary_ingredients,
//     secondary_ingredients
// }