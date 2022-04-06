import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function accountBalanceMulti(
  client: AxiosInstance,
  addressList: Array<string>
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  for (let index = 0; index < addressList.length; index++) {
    if (!isValidAddress(addressList[index]))
      throw new Error(`Address Invalid: ${addressList[index]}`);
  }
  const query = querystring.stringify({
    module: 'account',
    action: 'balancemulti',
    address: addressList.join(','),
    tag: 'latest',
  });
  return queryEtherscanClient(client, query);
}
