export const data = {
  baseObject: {
    solidity: {
      compilers: [
        {
          version: "0.8.20",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
          },
        },
      ],
    },
  },
  otherObject: {
    networks: {
      hardhat: {
        forking: {
          url: `https://eth-mainnet.alchemyapi.io/v2/`,
        },
      },
      mainnet: {
        url: `https://eth-mainnet.alchemyapi.io/v2/`,
      },
    },
  },
  varsObject: {
    networks: {
      hardhat: {
        forking: {
          enabled: true,
        },
      },
      mainnet: {
        accounts: "deployerPrivateKey",
      },
    },
  },
};
