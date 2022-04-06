import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidTransactionHash } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function accountTransactionInternalListByHash(
  client: AxiosInstance,
  txhash: string
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidTransactionHash(txhash)) {
    throw new Error('Transaction Hash Invalid');
  }
  const query = querystring.stringify({
    module: 'account',
    action: 'txlistinternal',
    txhash,
  });
  return queryEtherscanClient(client, query);
}
