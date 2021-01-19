import React from "react";
import { Typography, Button } from '@material-ui/core';

import { thousandsSeparator } from "utils";

interface AccountInfo {
  balance: number
  address: string
}

function AccountInfo(props: AccountInfo) {
  return (
    <>
      <p>
        <Typography variant="caption">
          Address: { props.address }
        </Typography>
      </p>
      <p>
      <Button variant="outlined">
        <Typography variant="caption">Balance: { thousandsSeparator(props.balance) } MIA</Typography>
      </Button>
      </p>
    </>
  );
}

export default AccountInfo;
