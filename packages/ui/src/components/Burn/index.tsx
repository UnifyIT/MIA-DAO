import React, { useState } from "react";
import { Typography, TextField, Button } from '@material-ui/core';

import { MIA } from "services/web3";

function Burn(props: any){
  // const [sendAddress, setSendAddress] = useState<string>("0x5db06acd673531218b10430ba6de9b69913ad545");
  const [burnAmount, setBurnAmount] = useState<number>(1500*1000);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const mia = await MIA.getInstance();
    await mia?.burn(burnAmount);
  }


  const onAmountChange = (event: any) => {
    console.log('Burn onAmountChange event', event.target.value);
    const { value } = event.target;
    setBurnAmount(value);
  }
  
  
  return (
    <>
      <form onSubmit={onSubmit}>
          <TextField label="Amount to burn" variant="outlined" placeholder="Amount" type="number" onChange={onAmountChange} value={burnAmount}/>
          <div>
            <br></br>
            <Button color= "primary" variant="contained" type="submit">Burn</Button>
          </div>
      </form>
      <br></br>
      <Typography variant="caption">Burn {burnAmount} of MIA Token</Typography>
    </>
  )
}

export default Burn;