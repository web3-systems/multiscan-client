import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function accountBalance(client: AxiosInstance, address: string) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(address)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'account',
    action: 'balance',
    address,
    tag: 'latest',
  });
  return queryEtherscanClient(client, query);
}
