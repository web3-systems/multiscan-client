import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export interface LogsGetConfig {
  fromBlock?: number;
  toBlock?: number;
  topics?: Array<any>; // @TODO: add topics support to query
}

export function logsGet(
  client: AxiosInstance,
  address: string,
  config: LogsGetConfig
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(address)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'logs',
    action: 'getLogs',
    address: address,
    fromBlock: config.fromBlock,
    toBlock: config.toBlock,
  });
  return queryEtherscanClient(client, query);
}
