// import BN from "bn.js"
import { Web3 } from "services/web3";
// import MIA_ABI from "services/web3/abis/miaERC20.json";
import { MIA_ABI, MIA_TOKEN_PROXY_ABI, MIA_TOKEN_V0_ABI } from "services/web3/abis"
import { 
  // RINKEBY_MIA_TOKEN, 
  RINKEBY_V2_MIA_TOKEN, 
  RINKEBY_MIA_TOKEN_PROXY 
} from "services/web3/addresses";

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
    if(networkId === 0x4 || networkId === 4) {            
      // const contractV0 = web3.getContract(RINKEBY_MIA_TOKEN, MIA_ABI);
      // console.log()
      const contract = web3.getContract(RINKEBY_MIA_TOKEN_PROXY, MIA_TOKEN_PROXY_ABI);
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
    // const address = await this.userAddress();
    // const balanceOf = await this._contract.balanceOf(address);
    // return balanceOf;
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
    // address = "0x5db06acd673531218b10430ba6de9b69913ad545";
    // const bigNumberAmount = new BN(amount);
    // const exponent = new BN(1e6);
    // console.log('bigNumberAmount', bigNumberAmount)
    // console.log('exponenet', exponent)
    // const sendAmount = (bigNumberAmount.mul(exponent)).toNumber();
    // console.log(sendAmount)
    // this._contract.transfer(address, sendAmount);
  }
  
  public async printContract () {
    const address = await this.userAddress();
    const v0 = this._web3?.getContract("0x47695A7098CbF5D7ef224191575BD7e989843989", MIA_TOKEN_V0_ABI)
    const v2 = this._web3?.getContract(RINKEBY_V2_MIA_TOKEN, MIA_ABI);
    console.log('v0', v0)
    console.log("v0.owner()", await v0?.owner());
    
    console.log(await v0?.owner() === "0x44A814f80c14977481b47C613CD020df6ea3D25D" )
    console.log(address)
    console.log(await v0?.owner() === address)
    // console.log('v2', v2);
    // console.log("0x47695A7098CbF5D7ef224191575BD7e989843989");
    
    try {
      const mint = await v0?.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", 6);
    } catch (error) {
      console.log("Error Minting v0 token", error);
    }
  }

}

export default MIA;