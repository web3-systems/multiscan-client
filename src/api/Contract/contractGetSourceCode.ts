import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function contractGetSourceCode(client: AxiosInstance, address: string) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(address)) {
    throw new Error(`Address Invalid: ${address}`);
  }
  const query = querystring.stringify({
    module: 'contract',
    action: 'getsourcecode',
    address: address,
  });
  return queryEtherscanClient(client, query);
}
