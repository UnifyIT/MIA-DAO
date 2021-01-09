import React, { useState, useEffect } from 'react';

import {
  AccountInfo, 
  ContractInfo, 
  Transfer,

} from "components";

import MIA from "services/web3/mia";

function Home() {
  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [miaContractAddress, setMiaContractAddress] = useState<string>("");

  const componentDidMount = () => {
    getMia();
  }

  const getMia = async () => {
    const mia: any = await MIA.getInstance();
    const address = await mia.userAddress();
    const contractAddress = await mia.contractAddress();
    let balance = await mia.userBalance();
    balance = balance.div(1e6).toNumber();
    setAddress(address);
    setBalance(balance);
    setMiaContractAddress(contractAddress);
  }

  useEffect(componentDidMount, []);

  return (
    <div className="Home">
        <p>
          MIA TOKEN TESTER UI
        </p>
        <ContractInfo address={miaContractAddress} />
        <AccountInfo balance={balance} address={address}/>
        <Transfer />
    </div>
  );
}

export default Home;
