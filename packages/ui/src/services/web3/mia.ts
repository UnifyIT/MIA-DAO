import { Web3 } from "services/web3";

import { 
  // MIA_TOKEN_V0_ABI,
  MIA_TOKEN_V1_ABI,
  // MIA_TOKEN_ADMIN_ABI,
  MIA_TOKEN_ADMIN_ABI,
  MIA_TOKEN_PROXY_ABI,
} from "services/web3/abis"
import { 
  // RINKEBY_MIA_TOKEN_V0,
  // RINKEBY_MIA_TOKEN_V1,
  RINKEBY_MIA_TOKEN_PROXY,
  // RINKEBY_MIA_PROXY_ADMIN
  RINKEBY_MIA_PROXY_ADMIN,
} from "services/web3/addresses";

const provider = (window as any).ethereum

class MIA {
  private static _instance: MIA | undefined
  private _web3: Web3 | undefined
  private _contractAdmin: any;
  private _contractProxy: any;
  private _contractProxyV1: any;
  private constructor() {
    
  }
  
  private async initialize() {
    const web3 = new Web3({ provider });
    await provider.enable()
    const networkId = web3.getNetwork();
    if(networkId === 0x4 || networkId === 4) {            
      const contractAdmin = web3.getContract(RINKEBY_MIA_PROXY_ADMIN, MIA_TOKEN_ADMIN_ABI);
      const contractProxy = web3.getContract(RINKEBY_MIA_TOKEN_PROXY, MIA_TOKEN_PROXY_ABI);
      const contractProxyV1 = web3.getContract(RINKEBY_MIA_TOKEN_PROXY, MIA_TOKEN_V1_ABI);
      this._web3 = web3;
      this._contractProxy = contractProxy;
      this._contractAdmin = contractAdmin;
      this._contractProxyV1 = contractProxyV1;
    } else {
      alert("SWITCH METAMASK NETWORK TO RINKEBY");
    }
  }
  
  public async contractAddress () {
    return await this._contractProxy.address;
  }
  
  public async userAddress() {
    return this._web3?.getAddress();
  }
  
  public async userBalance() {
    
  }

  public static async getInstance() {
    if (!this._instance) {
      try {
        const instance = new MIA();
        await instance.initialize();
        this._instance = instance;
      } catch (error) {
        console.log('error in getInstance()', error);
      }
    }
    return this._instance;
  }
  
  public async sendMIAToken(address: string, amount: number) {

  }
  
  public async printContract () {    
    try {
      
    } catch (error) {
      console.log("Error Minting v0 token", error);
    }
  }
  
  public async transferOwnershipOfProxyAdmin(newOwner: string) {
    console.log("transferOwnershipOfProxyAdmin");
    console.log(await this._contractAdmin);
    await this._contractAdmin.transferOwnership(newOwner);
    try {
      
    } catch (error) {
      console.log("Error transfer ownership of admin", error);
    }
  }
  
  public async burn(amount: number) {
    console.log("burn");
    await this._contractProxyV1.burn(amount);
    try {
      
    } catch (error) {
      console.log("Error Burn v1 token", error);
    }
  }
  
  

}

export default MIA;