import { MultiscanClient } from '../src';

const ADDRESS_TEST = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
const apikey = process.env.ETHERSCAN_API_KEY || '';

describe('Account', () => {
  let client: any;
  beforeAll(() => {
    client = new MultiscanClient(1, apikey);
  });

  describe('getAccountBalance', () => {
    it('should get account balance for TEST address on mainnet', async () => {
      const balance = await client.getAccountBalance(ADDRESS_TEST);
      expect(balance.toString()).not.toEqual('0');
    });
    it('should get account balance for TEST address on rinkeby', async () => {
      const balance = await client.getAccountBalance(ADDRESS_TEST, 4);
      expect(balance.toString()).not.toEqual('0');
    });
  });

  describe('getAccountTransactions', () => {
    it('should get account balance for TEST address on mainnet', async () => {
      const transactions = await client.getAccountTransactions(
        ADDRESS_TEST,
        {}
      );
      expect(transactions.length).not.toEqual('0');
    });

    it('should get account balance for TEST address on rinkeby', async () => {
      const transactions = await client.getAccountTransactions(
        ADDRESS_TEST,
        {},
        4
      );
      expect(transactions.toString()).not.toEqual('0');
    });
  });
});
