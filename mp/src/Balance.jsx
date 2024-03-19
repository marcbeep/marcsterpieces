import React, { useState, useEffect } from 'react';

function Balance({ web3, account }) {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (web3 && account) {
        const weiBalance = await web3.eth.getBalance(account);
        const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
        setBalance(ethBalance);
      }
    };

    fetchBalance();
  }, [web3, account]);

  return (
    <div>
      <p>Your Balance: {balance} ETH</p>
    </div>
  );
}

export default Balance;
