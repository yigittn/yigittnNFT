import React from "react";
import { FiTwitter } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { SiAboutdotme } from "react-icons/si";
import { Link } from "@chakra-ui/react";

const Navbar = ({ accounts, setAccounts }) => {
  const isConneted = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <div className=" w-full h-30">
      <div className="flex justify-between m-4 p-3  gap-4 items-center">
        <div className="flex justify-center items-center gap-3">
          <Link href="https://twitter.com/ygttnn" target="_blank">
            <FiTwitter className="h-12 w-12 text-indigo-500" />
          </Link>
          <Link href="https://www.linkedin.com/in/yigittn/" target="_blank">
            <CiLinkedin className="h-12 w-12 text-indigo-500" />
          </Link>
          <Link href="http://yigittn.me/" target="_blank">
            <SiAboutdotme className="h-12 w-12 text-indigo-500" />
          </Link>
        </div>
        <span className=" rounded-lg  border-blue-500 border-2 p-2 text-white  hover:border-red-500">
          {isConneted ? (
            <div>Connected</div>
          ) : (
            <button onClick={connectAccount}>Connect Your Wallet</button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
