import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function statsTokenSupply(
  client: AxiosInstance,
  contractaddress: string
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(contractaddress)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'stats',
    action: 'tokensupply',
    contractaddress: contractaddress,
  });
  return queryEtherscanClient(client, query);
}
