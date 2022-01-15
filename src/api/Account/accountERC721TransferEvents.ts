import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';
import { BlockPagination } from '../../types';

export function accountERC721TransferEvents(
  client: AxiosInstance,
  contract: string,
  address: string,
  config: BlockPagination
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(contract) || !isValidAddress(address)) {
    throw new Error('Address or Contract is Invalid');
  }
  const query = querystring.stringify({
    module: 'account',
    action: 'tokentx',
    contractaddress: contract,
    address,
    startblock: config.startblock || 0,
    endblock: config.endblock || 99999999,
    sort: config.sort || 'asc',
    page: config.page || 1,
    offset: config.offset || 10,
  });
  return queryEtherscanClient(client, query);
}
