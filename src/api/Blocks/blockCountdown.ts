import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function blockCountdown(client: AxiosInstance, blockno: string) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(blockno)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'block',
    action: 'getblockcountdown',
    blockno: blockno,
  });
  return queryEtherscanClient(client, query);
}
