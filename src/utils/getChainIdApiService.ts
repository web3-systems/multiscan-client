import { CHAINID_SERVICE_MAP, VALID_CHAIN_IDS } from './constants';
import isValidChainIdApiUrl from './isValidChainIdApiUrl';

export function getChainIdApiService(chainId: number) {
  if (!isValidChainIdApiUrl(chainId, VALID_CHAIN_IDS)) {
    throw new Error(`Invalid Chain Id: ${chainId}`);
  }
  return CHAINID_SERVICE_MAP[chainId];
}

export default getChainIdApiService;
