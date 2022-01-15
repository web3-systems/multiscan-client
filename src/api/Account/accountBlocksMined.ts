import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';
import { AccountMinedBlocksConfig } from '../../types';

export function accountBlocksMined(
  client: AxiosInstance,
  address: string,
  config: AccountMinedBlocksConfig
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(address)) {
    throw new Error('Address or Contract is Invalid');
  }
  const query = querystring.stringify({
    action: 'getminedblocks',
    address,
    blocktype: config.blocktype || 'blocks',
    page: config.page || 1,
    offset: config.offset || 10,
  });
  return queryEtherscanClient(client, query);
}
