# Multichain Database

![CI](https://github.com/web3-systems/multiscan-client/actions/workflows/main.yml/badge.svg)
![TS](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
[![Version](https://img.shields.io/npm/v/@web3-systems/multiscan-client.svg)](https://npmjs.org/package/@web3-systems/multiscan-client)
[![Downloads/week](https://img.shields.io/npm/dw/@web3-systems/multiscan-client.svg)](https://npmjs.org/package/@web3-systems/multiscan-client)

### 💾 Installation

```sh
npm install @web3-systems/multiscan-client
```

```sh
yarn add @web3-systems/multiscan-client
```

```sh
git clone https://github.com/web3-systems/multiscan-client
```

### 🏎️ &nbsp;Quickstart

The `multiscan-client` library is built to support multiple Etherscan/Clonescan service API endpoints. Developers can connect to Etherscan, Polygonscan and Avalanche with a single instance.

The `MultiscanClient` class wraps the Etherscan API.

Updating function signatures with `chainId` to specify a target API endpoint.

**Example**

`provider.getAccountBalance('0x000.0000')` 

is now... 

`multiprovider.getAccountBalance('0x000.0000', 1);`

The function signature (*as you can see*) now consumes `chainId` in the last argument position.

**Default Parameters**

A new `MultiscanClient` can be initialized with `defaultChainId` and `apikey`.

## Shared API Keys w/ Multiple Chain IDs
ChainId supported by a single API endpoint provider (e.x. 1,3,4,5) share an API key. In other words, if you connect to Etherscan Mainnet (chainId: 1) the Etherecan Rinkeby (chainId: 4) is also automatically available.

To connect to a new service API provider a new API key must be supplied to the client instance - along with a chainId or provider name.

## Initialize

Chain IDs are mapped to service provider(s).

If chainId `1,2,3,4,5,42` is passed Etherscan is the default client.

If chainId `137,8001` is passed Polygonscan is the default client.  

If chainId `43114,43114` is passed Snowtrace is the default client.


```ts
import { MultiscanClient } from '@web3-systems/multiscan-client';

const client = new MultiscanClient(1, 'etherscan-apikey');
```

## Multiple Connections

```ts
import { MultiscanClient } from '@web3-systems/multiscan-client';

let client: MultiscanClient;

// Set API key and default client for all Etherscan API endpoints: 1,2,3,4,5
client = new MultiscanClient(1, 'etherscan-apikey');

// Sets API key for all Polygoncanscan API endpoints: 137, 80001
client.setApiKey(137, 'polygonscan-apikey');

// Get Account Balance from default MultiscanClient
const balanceEthereum = await client.getAccountBalance('0x000...000');

// Get Account Balance using optional chainId parameter
const balancePolygon = await client.getAccountBalance('0x000...000', 137);
const balanceMumbai = await client.getAccountBalance('0x000...000', 80001);
```

### 📖 &nbsp;Overview

Coming soon...

### 🧩 &nbsp;Examples
Coming soon...

### 💻 &nbsp;Developer Experience

The package is setup using the [TSDX zero-config CLI](https://tsdx.io/) which includes:

- Typescript
- Rollup
- Jest
- Prettier
- ESLint
