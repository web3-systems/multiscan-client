import { MultiscanClient } from '../src';

const ADDRESS_MAINNET = '0x0D33612870cd9A475bBBbB7CC38fC66680dEcAC5';
const ADDRESS_RINKEBY = '0xdadcd2e9cCbb66A0B44B4CdE907c5c67Cb4a529E';

const apikey = process.env.ETHERSCAN_API_KEY || '';

describe('Contract', () => {
  let client: any;
  beforeAll(() => {
    client = new MultiscanClient(1, apikey);
  });

  describe('getContractAbi', () => {
    it('should get contract ABI on mainnet', async () => {
      const abi = await client.getContractAbi(ADDRESS_MAINNET);
      expect(abi).toBeTruthy();
    });

    it('should get contract ABI on RINKEBY', async () => {
      const abi = await client.getContractAbi(ADDRESS_RINKEBY, 4);
      expect(abi).toBeTruthy();
    });
  });

  describe('getContractSourceCode', () => {
    it('should get contract source cod on MAINNET', async () => {
      const [contractSourceCode] = await client.getContractSourceCode(
        ADDRESS_MAINNET
      );
      expect(contractSourceCode.ContractName).toEqual('DrawBeacon');
    });

    it('should get contract source cod on RINEKBY', async () => {
      const [contractSourceCode] = await client.getContractSourceCode(
        ADDRESS_RINKEBY,
        4
      );
      expect(contractSourceCode.ContractName).toEqual('DrawBeacon');
    });
  });
});
