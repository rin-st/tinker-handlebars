  const baseObject =
  {"solidity":{"compilers":[{"version":"0.8.20","settings":{"optimizer":{"enabled":true,"runs":200}}}]}}; const stringValues =
  {"networks":{"hardhat":{"forking":{"url":"https://eth-mainnet.alchemyapi.io/v2/"}},"mainnet":{"url":"https://eth-mainnet.alchemyapi.io/v2/"}}}

  const variablesObject =
  {"networks": {"hardhat": {"forking": {"enabled": true}}, "mainnet": {"accounts": deployerPrivateKey}}}

  const result =
  {
  "solidity": {
    "compilers": [
      {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          }
        }
      }
    ]
  },
  "networks": {
    "hardhat": {
      "forking": {
        "url": "https://eth-mainnet.alchemyapi.io/v2/",
        "enabled": true
      }
    },
    "mainnet": {
      "url": "https://eth-mainnet.alchemyapi.io/v2/",
      "accounts": deployerPrivateKey
    }
  }
}
