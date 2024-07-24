import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { axiosInstance } from "../api/apiConfig";
import Web3 from "web3";

export default function Home() {
  const { user } = useAuth();
  const getUser = useUser();

  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      console.log("fetching bal for ", walletAddress);
      //   return;
      const web3 = new Web3(
        Web3.givenProvider ||
          `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
      );
      const balanceInWei = await web3.eth.getBalance(walletAddress);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
      console.log(balanceInEth);
      setBalance(balanceInEth);
    };

    if (walletAddress) {
      getBalance();
    }
  }, [walletAddress]);

  useEffect(() => {
    setWalletAddress(user.wallet_address);
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mt-3">
      <h2>
        <div className="row">
          <div className="mb-12">
            {user?.email !== undefined && balance === null && "Loading"}
            {user?.email !== undefined && balance && (
              <>
                <p>Wallet address :{walletAddress}</p>
                <p>Balance :{balance}</p>
              </>
            )}
            {user?.email === undefined && "Please login first"}
          </div>
        </div>
      </h2>
    </div>
  );
}
