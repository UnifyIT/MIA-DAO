import React, { useState } from "react";
import { Typography, TextField, Button } from '@material-ui/core';

import { MIA } from "services/web3";

const agentAddress = "0x32085406ee42a06d2a284f5adf020053c81111a3";

function TransferOwnership(props: any){
  const [newOwner, setNewOwner] = useState<string>(agentAddress);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const mia = await MIA.getInstance();
    await mia?.transferOwnershipOfProxyAdmin(newOwner);
  }

  const onAddressChange = (event: any) => {
    console.log('onAddressChange event.target.value', event.target.value);
    const { value } = event.target;
    setNewOwner(value);
  }
  
  return (
    <>
      <form onSubmit={onSubmit}>
          <TextField label="new owner address" variant="outlined" placeholder="New Owner Address" type="text" onChange={onAddressChange} value={newOwner}/>
          <div>
            <br></br>
            <Button color= "primary" variant="contained" disabled={!(newOwner.length === 42 && newOwner.slice(0,2) === "0x")} type="submit">Transfer Ownership</Button>
          </div>
      </form>
      <br></br>
      <Typography variant="caption">Transfer to New Owner: { newOwner }</Typography>
    </>
  )
}

export default TransferOwnership;
