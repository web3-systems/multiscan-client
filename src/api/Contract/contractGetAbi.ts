import { AxiosInstance } from 'axios';
import querystring from 'query-string';

import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export async function contractGetAbi(client: AxiosInstance, address: string) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(address)) {
    throw new Error(`Address Invalid: ${address}`);
  }
  const query = querystring.stringify({
    module: 'contract',
    action: 'getabi',
    address: address,
  });

  return await queryEtherscanClient(client, query);
}
