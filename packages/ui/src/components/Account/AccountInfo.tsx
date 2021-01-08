import React from "react";

import { thousandsSeparator } from "utils";

interface AccountInfo {
  balance: number
  address: string
}

function AccountInfo(props: AccountInfo) {
  return (
    <>
      <p>
        Address: { props.address }
      </p>
      <p>
        Balance: { thousandsSeparator(props.balance) }
      </p>
    </>
  );
}

export default AccountInfo;