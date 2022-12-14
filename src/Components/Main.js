import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import yigittnNFT from "../YigittnNFT.json";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa";

// ethers allows us to interact with the blockchain
// BigNumber allows us to work with large numbers
// YigittnNFT.json is the ABI of our smart contract

const yigittnNFTAddress = "0xE796444800E1AcA0df0f1C4416057BB7193D378C";

const Main = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConneted = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // provider is the connection to the blockchain
      const signer = provider.getSigner(); // signer is the account that is connected to the blockchain
      const contract = new ethers.Contract(
        yigittnNFTAddress,
        yigittnNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.01 * mintAmount).toString()),
        }); // transaction is the mint function that we are calling
        await response.wait(); // wait for the transaction to be mined
        console.log("response: ", response);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return; // we don't want to mint less than 1 at a time
    setMintAmount((prevState) => prevState - 1); // setMintAmount allows us to change the mintAmount
  }; // handleDecrement allows us to decrement the mintAmount

  function handleIncrement() {
    if (mintAmount >= 5) return; // we don't want to mint more than 10 at a time
    setMintAmount((prevState) => prevState + 1); // setMintAmount allows us to change the mintAmount
  } // handleIncrement allows us to increment the mintAmount

  return (
    <div>
      <h2 className="mt-10 text-2xl font-bold">YigittnNFT</h2>
      <p className="text-2xl mt-6 font-bold">
        This project for educational purposes only. Thank you in advance for the
        feedback.
      </p>
      <span>
        {isConneted ? (
          <div>
            <div>
              <button className="mt-20 mr-5 h-6 w-2" onClick={handleDecrement}>
                <FaMinus />
              </button>
              <span className=" text-3xl">{mintAmount}</span>
              <button className="mt-20  ml-4 h-6 w-2" onClick={handleIncrement}>
                <GoPlus />
              </button>
            </div>
            <button
              className="mt-12 border-gray-500 p-2 rounded-lg hover:border-red-400  text-white border-4"
              onClick={handleMint}
            >
              MINT
            </button>
          </div>
        ) : (
          <div className="mt-20 text-xl">CONNECT YOUR WALLET FOR MINT</div>
        )}
      </span>
    </div>
  );
};

export default Main;
