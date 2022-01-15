# Multiscan Client
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
![Build](https://github.com/web3-systems/multiscan-client/actions/workflows/main.yml/badge.svg)

The `@web3-systems/multiscan-client` [node module](https://www.npmjs.com/package/@web3-systems/multiscan-client) simplifies multi-Etherscan/Clone API reads.

### Supported Explorers

  - Etherscan (Ethereum)
    - Mainnet
    - Ropsten
    - Rinkeby
    - Goerli
    - Kovan
  - Polygonscan (Polygon)
    - Mainnet
    - Mumbai
  - Snowtrace (Avalanche) 
    - Mainnet
    - Fuji

# 💾 Installation

Install NPM package:

```sh
npm install @web3-systems/multiscan-client
```

```sh
yarn add @web3-systems/multiscan-client
```

Clone from Github:

```sh
git clone https://github.com/web3-systems/multiscan-client
```

# 💻 Developer Experience

The package is setup using the [TSDX zero-config CLI](https://tsdx.io/) which includes:

- Typescript
- Rollup
- Jest
- Prettier
- ESLint

# 🧾 Quickstart 

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

# Multiscan Class

### Constructors

- [constructor](#constructor)

### Properties

- [chainIdDefault](#chainiddefault)
- [clients](#clients)
- [keys](#keys)

### Methods

- [client](#client)
- [connect](#connect)
- [getAccountBalance](#getaccountbalance)
- [getAccountBalanceMulti](#getaccountbalancemulti)
- [getAccountERC20TransferEvents](#getaccounterc20transferevents)
- [getAccountERC721TransferEvents](#getaccounterc721transferevents)
- [getAccountMinedBlocks](#getaccountminedblocks)
- [getAccountTransactions](#getaccounttransactions)
- [getAccountTransactionsInternal](#getaccounttransactionsinternal)
- [getAccountTransactionsInternalByBlockRange](#getaccounttransactionsinternalbyblockrange)
- [getAccountTransactionsInternalByHash](#getaccounttransactionsinternalbyhash)
- [getBlockCountdown](#getblockcountdown)
- [getBlockDailyAvgBlockSize](#getblockdailyavgblocksize)
- [getBlockFromTimestamp](#getblockfromtimestamp)
- [getBlockReward](#getblockreward)
- [getContractAbi](#getcontractabi)
- [getContractSourceCode](#getcontractsourcecode)
- [getLogs](#getlogs)
- [getStatsTokenSupply](#getstatstokensupply)
- [getTransactionReceiptStatus](#gettransactionreceiptstatus)
- [getTransactionStatus](#gettransactionstatus)
- [setApiKey](#setapikey)
- [setApiKeyByServiceProvider](#setapikeybyserviceprovider)
- [setChainId](#setchainid)

## Constructors

### constructor

• **new MultiscanClient**(`chainId`, `apiKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `apiKey` | `string` |

#### Defined in

[MultiscanClient.ts:48](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L48)

## Properties

### chainIdDefault

• **chainIdDefault**: `number` = `1`

#### Defined in

[MultiscanClient.ts:44](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L44)

___

### clients

• `Readonly` **clients**: `Clients` = `{}`

#### Defined in

[MultiscanClient.ts:46](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L46)

___

### keys

• `Readonly` **keys**: `ApiKeys` = `{}`

#### Defined in

[MultiscanClient.ts:45](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L45)

## Methods

### client

▸ **client**(`chainId`, `apiKey`): `AxiosInstance`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `apiKey` | `string` |

#### Returns

`AxiosInstance`

#### Defined in

[MultiscanClient.ts:60](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L60)

___

### connect

▸ **connect**(`chainId`, `apiKey?`): `AxiosInstance`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `apiKey?` | `string` |

#### Returns

`AxiosInstance`

#### Defined in

[MultiscanClient.ts:65](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L65)

___

### getAccountBalance

▸ **getAccountBalance**(`address`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:96](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L96)

___

### getAccountBalanceMulti

▸ **getAccountBalanceMulti**(`addressList`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressList` | `string`[] |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:101](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L101)

___

### getAccountERC20TransferEvents

▸ **getAccountERC20TransferEvents**(`contract`, `address`, `config`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |
| `address` | `string` |
| `config` | [`BlockPagination`](../interfaces/BlockPagination.md) |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:144](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L144)

___

### getAccountERC721TransferEvents

▸ **getAccountERC721TransferEvents**(`contract`, `address`, `config`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |
| `address` | `string` |
| `config` | [`BlockPagination`](../interfaces/BlockPagination.md) |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:154](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L154)

___

### getAccountMinedBlocks

▸ **getAccountMinedBlocks**(`address`, `config`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `config` | [`AccountMinedBlocksConfig`](../interfaces/AccountMinedBlocksConfig.md) |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:164](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L164)

___

### getAccountTransactions

▸ **getAccountTransactions**(`address`, `config`, `chainId?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `config` | [`BlockPagination`](../interfaces/BlockPagination.md) |
| `chainId?` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[MultiscanClient.ts:106](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L106)

___

### getAccountTransactionsInternal

▸ **getAccountTransactionsInternal**(`address`, `config`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `config` | [`BlockPagination`](../interfaces/BlockPagination.md) |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:115](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L115)

___

### getAccountTransactionsInternalByBlockRange

▸ **getAccountTransactionsInternalByBlockRange**(`startblock`, `endblock`, `config`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `startblock` | `string` |
| `endblock` | `string` |
| `config` | [`BlockPagination`](../interfaces/BlockPagination.md) |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:129](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L129)

___

### getAccountTransactionsInternalByHash

▸ **getAccountTransactionsInternalByHash**(`txhash`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txhash` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:124](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L124)

___

### getBlockCountdown

▸ **getBlockCountdown**(`blockno`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockno` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:177](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L177)

___

### getBlockDailyAvgBlockSize

▸ **getBlockDailyAvgBlockSize**(`startdate`, `enddate`, `sort?`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `startdate` | `string` | `undefined` |
| `enddate` | `string` | `undefined` |
| `sort` | ``"asc"`` \| ``"desc"`` | `'asc'` |
| `chainId?` | `number` | `undefined` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:182](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L182)

___

### getBlockFromTimestamp

▸ **getBlockFromTimestamp**(`timestamp`, `closest`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `string` |
| `closest` | ``"before"`` \| ``"after"`` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:192](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L192)

___

### getBlockReward

▸ **getBlockReward**(`blockno`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockno` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:201](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L201)

___

### getContractAbi

▸ **getContractAbi**(`address`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:210](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L210)

___

### getContractSourceCode

▸ **getContractSourceCode**(`address`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:215](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L215)

___

### getLogs

▸ **getLogs**(`address`, `config`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `config` | `LogsGetConfig` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:224](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L224)

___

### getStatsTokenSupply

▸ **getStatsTokenSupply**(`contractaddress`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractaddress` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:233](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L233)

___

### getTransactionReceiptStatus

▸ **getTransactionReceiptStatus**(`address`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:242](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L242)

___

### getTransactionStatus

▸ **getTransactionStatus**(`address`, `chainId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainId?` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[MultiscanClient.ts:247](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L247)

___

### setApiKey

▸ **setApiKey**(`chainId`, `apiKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `apiKey` | `string` |

#### Returns

`void`

#### Defined in

[MultiscanClient.ts:77](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L77)

___

### setApiKeyByServiceProvider

▸ **setApiKeyByServiceProvider**(`serviceProvider`, `apiKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceProvider` | `string` |
| `apiKey` | `string` |

#### Returns

`void`

#### Defined in

[MultiscanClient.ts:82](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L82)

___

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`void`

#### Defined in

[MultiscanClient.ts:88](https://github.com/web3-systems/multiscan-client/blob/2869c54/src/MultiscanClient.ts#L88)
