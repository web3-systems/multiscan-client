import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function blockFromTimestamp(
  client: AxiosInstance,
  timestamp: string,
  closest: 'before' | 'after' = 'after'
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(timestamp)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'block',
    action: 'getblocknobytime',
    timestamp: timestamp,
    closest: closest,
  });
  return queryEtherscanClient(client, query);
}
