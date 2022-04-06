import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function accountERC20Balance(
  client: AxiosInstance,
  contractaddress: string,
  address: string
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(contractaddress) || !isValidAddress(address)) {
    throw new Error('Address or Contract is Invalid');
  }
  const query = querystring.stringify({
    module: 'account',
    action: 'tokenbalance',
    contractaddress: contractaddress,
    address: address,
  });
  return queryEtherscanClient(client, query);
}
