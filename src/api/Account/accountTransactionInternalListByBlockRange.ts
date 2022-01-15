import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { queryEtherscanClient, isClientConnected } from '../../utils';
import { BlockPagination } from '../../types';

export function accountTransactionInternalListByBlockRange(
  client: AxiosInstance,
  startblock: string,
  endblock: string,
  config: BlockPagination
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  const query = querystring.stringify({
    module: 'account',
    action: 'txlistinternal',
    startblock: startblock || 0,
    endblock: endblock || 99999999,
    page: config.page || 1,
    offset: config.offset || 10,
    sort: config.sort || 'asc',
  });
  return queryEtherscanClient(client, query);
}
