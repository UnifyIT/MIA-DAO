import MIA_TOKEN_V0 from "services/web3/abis/MIATokenV0.json";
import MIA_TOKEN_V1 from "services/web3/abis/MIATokenV1.json";
import MIA_TOKEN_ADMIN from "services/web3/abis/MIATokenProxyAdmin.json"
import MIA_TOKEN_PROXY from "services/web3/abis/MIATokenProxy.json"


const MIA_TOKEN_V0_ABI = MIA_TOKEN_V0.abi;

const MIA_TOKEN_V1_ABI = MIA_TOKEN_V1.abi

const MIA_TOKEN_ADMIN_ABI = MIA_TOKEN_ADMIN.abi

const MIA_TOKEN_PROXY_ABI = MIA_TOKEN_PROXY.abi

export {
  MIA_TOKEN_V0_ABI,
  MIA_TOKEN_V1_ABI,
  MIA_TOKEN_ADMIN_ABI,
  MIA_TOKEN_PROXY_ABI,
}