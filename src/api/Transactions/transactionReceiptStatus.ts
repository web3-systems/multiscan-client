import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { isValidAddress } from '../../utils';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function transactionReceiptStatus(
  client: AxiosInstance,
  txhash: string
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  if (!isValidAddress(txhash)) throw new Error('Address Invalid');
  const query = querystring.stringify({
    module: 'transaction',
    action: 'gettxreceiptstatus',
    txhash: txhash,
  });
  return queryEtherscanClient(client, query);
}
