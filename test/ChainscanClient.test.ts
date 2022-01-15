import { MultiscanClient } from '../src';

const apikey = process.env.ETHERSCAN_API_KEY || '';

describe('MultiscanClient', () => {
  describe('success', () => {
    it('should succeed to create a MultiscanClient for Etherscan Mainnet', () => {
      let client = new MultiscanClient(1, apikey);
      expect(client.clients[1]).toBeTruthy();
    });

    it('should succeed to create a MultiscanClient for Polygonscan Mainnet', () => {
      let client = new MultiscanClient(137, apikey);
      expect(client.clients[137]).toBeTruthy();
    });

    it('should succeed to create multiple MultiscanClient for 1+ networks', () => {
      let client = new MultiscanClient(1, apikey);
      client.connect(4, apikey);
      expect(client.clients[1]).toBeTruthy();
      expect(client.clients[4]).toBeTruthy();
    });

    it('should succeed to default Chain ID', () => {
      let client = new MultiscanClient(1, apikey);
      client.setChainId(4);
      expect(client.chainIdDefault).toBe(4);
    });

    it('should succeed to set Service API key', () => {
      let client = new MultiscanClient(1, apikey);
      client.setApiKey(137, apikey);
      expect(client.keys.polygonscan).toBe(apikey);
    });
  });

  describe('failure', () => {
    it('Invalid Chaind Id', async () => {
      const createMultiscanClient = () => {
        return new MultiscanClient(420, apikey);
      };
      expect(createMultiscanClient).toThrowError('Invalid Chain Id: 420');
    });
  });
});
