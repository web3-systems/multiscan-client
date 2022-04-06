import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { BlockPagination } from '../../types';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function accountTransactionList(
  client: AxiosInstance,
  address: string,
  config: BlockPagination
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(address)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'account',
    action: 'txlist',
    address,
    startblock: config.startblock || 0,
    endblock: config.endblock || 99999999,
    sort: config.sort || 'asc',
    page: config.page || 1,
    offset: config.offset || 1000,
  });
  return queryEtherscanClient(client, query);
}
