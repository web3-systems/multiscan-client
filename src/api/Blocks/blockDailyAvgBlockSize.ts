import { AxiosInstance } from 'axios';
import querystring from 'query-string';
import { queryEtherscanClient, isClientConnected } from '../../utils';

export function blockDailyAvgBlockSize(
  client: AxiosInstance,
  startdate: string,
  enddate: string,
  sort: 'asc' | 'desc' = 'asc'
) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected');
  }
  const query = querystring.stringify({
    module: 'block',
    action: 'dailyavgblocksize',
    startdate: startdate,
    enddate: enddate,
    sort: sort,
  });
  return queryEtherscanClient(client, query);
}
