import React, { useState } from "react";

import { MIA } from "services/web3";
// import BN from "bn.js"
type BigNumberish = number
type BytesLike = Buffer

export type TransactionRequest = {
    to?: string,
    from?: string,
    nonce?: BigNumberish,

    gasLimit?: BigNumberish,
    gasPrice?: BigNumberish,

    data?: BytesLike,
    value?: BigNumberish,
    chainId?: number
}
function Transfer(props: any){
  const [sendAddress, setSendAddress] = useState<string>("0x5db06acd673531218b10430ba6de9b69913ad545");
  const [sendAmount, setSendAmount] = useState<number>(1);
  
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const mia = await MIA.getInstance();
    await mia?.sendMIAToken(sendAddress, sendAmount);
  }
  
  const onAddressChange = (event: any) => {
    console.log('onAddressChange event.target.value', event.target.value);
    const { value } = event.target;
    setSendAddress(value);
  }
  
  const onAmountChange = (event: any) => {
    console.log('onAmountChange event', event.target.value);
    const { value } = event.target;
    setSendAmount(value);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
          <input placeholder="Address to transfer" type="text" onChange={onAddressChange}/>
          <input placeholder="Amount to transfer" type="number" onChange={onAmountChange}/>
          <button disabled={!(sendAddress.length > 42 && sendAddress.slice(0,2) === "0x") && false}>Transfer</button>
      </form>
      <p>Transfer {sendAmount} MIA Token to { sendAddress }</p>
    </>
  )
}

export default Transfer;