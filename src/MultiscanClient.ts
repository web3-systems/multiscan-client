import { AxiosInstance } from 'axios';
import {
  getEtherscanClient,
  getChainIdApiService,
  isValidApiService,
} from './utils';
import { AccountMinedBlocksConfig, BlockPagination } from './types';
import {
  accountBalance,
  accountBalanceMulti,
  accountBlocksMined,
  accountERC20TransferEvents,
  accountERC721TransferEvents,
  accountTransactionInternalList,
  accountTransactionInternalListByBlockRange,
  accountTransactionInternalListByHash,
  accountTransactionList,
} from './api/Account';
import {
  blockCountdown,
  blockDailyAvgBlockSize,
  blockFromTimestamp,
  blockReward,
} from './api/Blocks';
import { contractGetAbi, contractGetSourceCode } from './api/Contract';
import { logsGet, LogsGetConfig } from './api/Logs';
import { statsTokenSupply } from './api/Stats';
import {
  transactionReceiptStatus,
  transactionStatus,
} from './api/Transactions';

import { VALID_SERVICE_PROVIDERS } from './utils/constants';

interface Clients {
  [key: string]: AxiosInstance;
}

interface ApiKeys {
  [key: string]: string;
}

class MultiscanClient {
  chainIdDefault: number = 1;
  readonly keys: ApiKeys = {};
  readonly clients: Clients = {};

  constructor(chainId?: number, apiKey?: string) {
    if(chainId != null && apiKey != null) {
      this.connect(chainId, apiKey);
      const service = getChainIdApiService(chainId);
      this.keys[service] = apiKey;
      this.chainIdDefault = chainId;
      return this;
    }
    return this;
  }

  // ==========================================
  // Core
  // ==========================================

  public client(chainId: number, apiKey: string) {
    this.clients[chainId] = getEtherscanClient(chainId, 5000, apiKey);
    return this.clients[chainId];
  }

  public connect(chainId: number, apiKey?: string) {
    const service = getChainIdApiService(chainId);
    if (apiKey) this.setApiKey(chainId, apiKey);
    if (this.clients[chainId]) {
      return this.clients[chainId];
    } else if (apiKey || this.keys[service]) {
      return this.client(chainId, apiKey || this.keys[service]);
    } else {
      throw new Error(`Chainscan Client for chainId ${chainId} unavailable`);
    }
  }

  public getExplorer(chainId?: number) {
    this.connect(chainId || this.chainIdDefault);
  }

  public setApiKey(chainId: number, apiKey: string) {
    const service = getChainIdApiService(chainId);
    this.keys[service] = apiKey;
  }

  public setApiKeyByServiceProvider(serviceProvider: string, apiKey: string) {
    if (!isValidApiService(serviceProvider, VALID_SERVICE_PROVIDERS))
      throw new Error(`Invalid API service provider ${serviceProvider}`);
    this.keys[serviceProvider] = apiKey;
  }

  public setChainId(chainId: number) {
    this.chainIdDefault = chainId;
  }

  // ==========================================
  // Account
  // ==========================================

  async getAccountBalance(address: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountBalance(client, address);
  }

  async getAccountBalanceMulti(addressList: Array<string>, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountBalanceMulti(client, addressList);
  }

  async getAccountTransactions(
    address: string,
    config: BlockPagination,
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountTransactionList(client, address, config);
  }

  async getAccountTransactionsInternal(
    address: string,
    config: BlockPagination,
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountTransactionInternalList(client, address, config);
  }

  async getAccountTransactionsInternalByHash(txhash: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountTransactionInternalListByHash(client, txhash);
  }

  async getAccountTransactionsInternalByBlockRange(
    startblock: string,
    endblock: string,
    config: BlockPagination,
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountTransactionInternalListByBlockRange(
      client,
      startblock,
      endblock,
      config
    );
  }

  async getAccountERC20TransferEvents(
    contract: string,
    address: string,
    config: BlockPagination,
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountERC20TransferEvents(client, contract, address, config);
  }

  async getAccountERC721TransferEvents(
    contract: string,
    address: string,
    config: BlockPagination,
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountERC721TransferEvents(client, contract, address, config);
  }

  async getAccountMinedBlocks(
    address: string,
    config: AccountMinedBlocksConfig,
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return accountBlocksMined(client, address, config);
  }

  // ==========================================
  // Block
  // ==========================================

  async getBlockCountdown(blockno: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return blockCountdown(client, blockno);
  }

  async getBlockDailyAvgBlockSize(
    startdate: string,
    enddate: string,
    sort: 'asc' | 'desc' = 'asc',
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return blockDailyAvgBlockSize(client, startdate, enddate, sort);
  }

  async getBlockFromTimestamp(
    timestamp: string,
    closest: 'before' | 'after',
    chainId?: number
  ) {
    const client = this.connect(chainId || this.chainIdDefault);
    return blockFromTimestamp(client, timestamp, closest);
  }

  async getBlockReward(blockno: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return blockReward(client, blockno);
  }

  // ==========================================
  // Contract
  // ==========================================

  async getContractAbi(address: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return contractGetAbi(client, address);
  }

  async getContractSourceCode(address: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return contractGetSourceCode(client, address);
  }

  // ==========================================
  // Logs
  // ==========================================

  async getLogs(address: string, config: LogsGetConfig, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return logsGet(client, address, config);
  }

  // ==========================================
  // Stats
  // ==========================================

  async getStatsTokenSupply(contractaddress: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return statsTokenSupply(client, contractaddress);
  }

  // ==========================================
  // Transaction
  // ==========================================

  async getTransactionReceiptStatus(address: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return transactionReceiptStatus(client, address);
  }

  async getTransactionStatus(address: string, chainId?: number) {
    const client = this.connect(chainId || this.chainIdDefault);
    return transactionStatus(client, address);
  }
}

export default MultiscanClient;
