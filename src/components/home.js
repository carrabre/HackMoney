import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';
import Topbar from "./Topbar/topbar";
import Bonds from "../components/Bond";
import './Topbar/topbar.css';
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";
import homeloader from "../../src/assets/images/homeloader.gif";

// import MasterForm from ".";
const getLocalItems =()=>{
  let defaultAccount =localStorage.getItem('defaultAccount');
 
  // console.log(defaultAccount,'hy')
  // console.log(getLocalItems,'ram')
}
function Home(props) {
  // localStorage.setItem('adddress', 'defaultaddress');
  // const [item,setItem]=useState(getLocalItems);

  // here is a functionality of connect wallet
  // const [navigate,useNavigate]=useState(null);
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(getLocalItems); // set account address for this 
  const [userBalance, setUserBalance] = useState(null); // set balance of any address 
  const [ connButtonText, setConnButtonText] = useState('CONNECT WALLET'); // connet wallet through this 


  const connectWalletHandler = () => {
    if(window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {accountChangedHandler(result[0]);
        setTimeout(() => {
          navigate('/bonds');
        }, 1000);

      
        
      // console.log(result[0],"correct");
      
      })
       
    }else { // for install wallet first then connect to this site 
      setErrorMessage("Install Metamask");
    }
  }

  const accountChangedHandler = (newAccount) => { // functioanlity  to change  address or switch to another account 
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  }
  const getUserBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance',params:[address,'latest']})
    .then(balance => {
      setUserBalance(ethers.utils.formatEther(balance));
    })
  }
  window.ethereum.on('accountsChanged', accountChangedHandler);

  
  // console.log("hey");
  // add data to localStorage
useEffect(()=>{
  localStorage.setItem('address',JSON.stringify(defaultAccount))
 

},
[defaultAccount]);

  
  return (
    
    <>
    {/* <img
          src={homeloader}
          alt="Happy Emoticons"
          className="demoimg" 
          /> */}
    
      <Container className="Check">
      
      
        {""}

        <Topbar address={defaultAccount} />
     
          
        
        <div className="wallet-btn-div">
      
          <Button onClick={connectWalletHandler} variant="outlined" className="connct-wallet-btn">
            {connButtonText}
          </Button>
          {/* <div>{defaultAccount}</div>
          <div>{userBalance}</div> */}
        </div>
        {/* <MasterForm/> */}
      </Container>
    </>
  );
}

export default Home;

