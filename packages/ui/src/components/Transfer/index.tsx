import React, { useState } from "react";
import { Typography, TextField, Button } from '@material-ui/core';

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
  
  const printContract = async () => {
    const mia = await MIA.getInstance();
    await mia?.printContract();
  }
  
  return (
    <>
      <form onSubmit={onSubmit}>
          <TextField label="Address to transfer" variant="outlined" placeholder="Address" type="text" onChange={onAddressChange}/>
          <TextField label="Amount to transfer" variant="outlined" placeholder="Amount" type="number" onChange={onAmountChange}/>
          <div>
            <br></br>
            <Button color= "primary" variant="contained" disabled={!(sendAddress.length > 42 && sendAddress.slice(0,2) === "0x") && false}>Transfer</Button>
          </div>
      </form>
      <br></br>
      <Button color= "primary" variant="contained" onClick={printContract}>Print Contract</Button>
      <Typography variant="caption">Transfer {sendAmount} MIA Token to { sendAddress }</Typography>
    </>
  )
}

export default Transfer;
