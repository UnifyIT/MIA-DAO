import React from "react";
import { Typography } from '@material-ui/core';

interface ContractInfo {
  address: string
}

function ContractInfo(props: ContractInfo) {
  return (
    <>
      <p>
        <Typography variant="caption">
          MIA Contract Address: { props.address }
        </Typography>
      </p>
    </>
  );
}

export default ContractInfo;
