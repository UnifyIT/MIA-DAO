import BN from "bn.js"
import { Web3 } from "services/web3";
import MIA_ABI from "services/web3/abis/miaERC20.json"
import { RINKEBY_MIA_TOKEN, RINKEBY_V2_MIA_TOKEN } from "services/web3/addresses";

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
    const address = await this.userAddress();
    const balanceOf = await this._contract.balanceOf(address);
    return balanceOf;
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
  
  public async sendMIAToken(address: string, amount: number){
    // address = "0x5db06acd673531218b10430ba6de9b69913ad545";
    const bigNumberAmount = new BN(amount);
    const exponent = new BN(1e6);
    console.log('bigNumberAmount', bigNumberAmount)
    console.log('exponenet', exponent)
    const sendAmount = (bigNumberAmount.mul(exponent)).toNumber();
    console.log(sendAmount)
    this._contract.transfer(address, sendAmount);
  }
  
  public async printContract () {
    const v2 = this._web3?.getContract(RINKEBY_V2_MIA_TOKEN, MIA_ABI);
    console.log('v2', v2);
  }

}

export default MIA;