
import { Web3 } from "services/web3";
import MIA_ABI from "services/web3/abis/miaERC20.json"
import { RINKEBY_MIA_TOKEN } from "services/web3/addresses";

const provider = (window as any).ethereum

class MIA {
  private static _instance: MIA | undefined
  private _web3: Web3 | undefined
  private constructor() {
    
  }
  
  private async initialize() {
    const web3 = new Web3({ provider });
    await provider.enable()
    this._web3 = web3
    this.test_contract();
  }
  
  public async test_contract() {
    try {
      const contract = this._web3?.getContract(RINKEBY_MIA_TOKEN, MIA_ABI);
      const balanceOf = await contract?.balanceOf("0x44A814f80c14977481b47C613CD020df6ea3D25D")
      console.log("contract", contract);
      console.log("balanceOf", balanceOf);
    } catch (error) {
      console.log('error in contract()', error);
    }
  }

  public static getInstance() {
    if (!this._instance) {
      try {
        const instance = new MIA();
        instance.initialize();
        this._instance = instance;
      } catch (error) {
        console.log('error in getInstance()', error);
      }
    }
    return this._instance;
  }

}

export default MIA;