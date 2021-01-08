import React from "react";

interface ContractInfo {
  address: string
}

function ContractInfo(props: ContractInfo) {
  return (
    <>
      <p>
        MIA Contract Address: { props.address }
      </p>
    </>
  );
}

export default ContractInfo;