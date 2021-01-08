
import { Web3 } from "services/web3";
import MIA_ABI from "services/web3/abis/miaERC20.json"
import { RINKEBY_MIA_TOKEN } from "services/web3/addresses";

const provider = (window as any).ethereum

class MIA {
  private static _instance: MIA | undefined
  private _web3: Web3 | undefined
  private _contract: any;
  private constructor() {
    
  }
  
  private async initialize() {
    const web3 = new Web3({ provider });
    await provider.enable()
    const networkId = await web3.getNetwork();
    if(networkId === 0x4 || networkId == 4) {
      const contract = web3.getContract(RINKEBY_MIA_TOKEN, MIA_ABI);
      this._web3 = web3
      this._contract = contract
    } else {
      alert("SWITCH METAMASK NETWORK TO RINKEBY");
    }
  }
  
  public async contractAddress () {
    return await this._contract.address;
  }
  
  public async userAddress() {
    return this._web3?.getAddress();
  }
  
  public async userBalance() {
    const address = await this.userAddress()
    const balanceOf = await this._contract.balanceOf(address);
    // divide it by 1e6 since token has only 6 decimals for now.
    return balanceOf.div(1e6)
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

}

export default MIA;