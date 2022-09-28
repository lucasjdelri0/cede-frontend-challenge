# CEDE Labs Frontend Challenge

This project is intended to solve the [frontend challenge](https://github.com/CeDe-Keyper/frontend-challenge) proposed by CEDE Labs.

The project was created with [Create React App](https://github.com/facebook/create-react-app) by [Lucas Del Rio](https://github.com/lucasjdelri0).

## Solution

### Features

Basically, you will be able to explore NFTs by typing a wallet address, contract address, or even a collection name, and you can save them to your wishlist.

Main Features:

- Explore NFTs by wallet address, contract address, or even by collection name.
- NFTs Wishlist (add/remove).

The application analyzes the input format to decide which search to perform.

The following cases may occur:

1- The input does not match an address format. The application searches for NFTs by collection name.

2- The input matches an address format.

- If a contract instance can be created with the entered address, the input will be considered as a contract address. In this case, the application searches for NFTs by contract address.

- A contract instance cannot be created with the entered address. In this case, the input is considered as an Externally Owned Account (EOA, basically a wallet), and the application searches for NFTs by wallet address.

> NOTES:
>
> In order to identify whether it is a contract address or an EOA, it will be necessary that you have [MetaMask](https://metamask.io/download/) installed and that you are connected to the Ethereum Mainnet. This way, our application will be able to obtain a Web3Provider and generate a contract instance with a minimum ABI.

### NFT API

The project uses [Moralis NFT API](https://docs.moralis.io/reference/nft-api) to fetch NFT data.

Main Endpoints

- [getWalletNFTs](https://docs.moralis.io/reference/getwalletnfts-1)
- [getContractNFTs](https://docs.moralis.io/reference/getcontractnfts-1)
- [searchNFTs](https://docs.moralis.io/reference/searchnfts-2)

See the [Moralis Swagger](https://deep-index.moralis.io/api-docs-2.1/) for more info about endpoints.

> NOTES:
>
> - Before start, you need to configure your own Moralis API Key as an env variable under the name of `REACT_APP_NFT_API`.
> - The project is using the Ethereum Mainnet as the blockchain where to fetch from.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Instructs ESLint to identify and try to fix as many issues as possible in .js, .jsx, .ts, and .tsx files.

### `yarn format:check`

Check if your files are formatted to the intended Prettier config, and get a list of the unformatted files, if any.

### `yarn format:write`

Format all your files to the intended Prettier config.

> NOTES:
>
> - Use .eslintignore and .prettierignore to ignore files that should not be analyzed and/or formatted

## Vercel Deployment

You can access a production deployment in [Vercel](https://cede-frontend-challenge.vercel.app/) for a quick testing.

## Resources

[CEDE Labs Frontend Challenge](https://github.com/CeDe-Keyper/frontend-challenge)

[Moralis API Reference](https://docs.moralis.io/reference/nft-api)

[AntDesing Docs](https://ant.design/docs/react/introduce)

[AntDesing Components](https://ant.design/components/overview/)

[ESLint Rules](https://eslint.org/docs/latest/rules/)

[Prettier Options](https://prettier.io/docs/en/options.html)
