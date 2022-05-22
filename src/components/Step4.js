import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
// import { toast } from 'react-toastify';
import { FormGroup, Label, Input, Button } from "reactstrap";
// import detectEthereumProvider from "@metamask/detect-provider";
import loadinggif from "../../src/assets/images/loader.gif";
var CircularJSON = require("circular-json");

const Step4 = (props) => {
  const [errormsg, setErrormsg] = useState(false);
  const [sccucesmsg, setSccucesmsg] = useState(false);
  const [depositerrormsg, setDepositerrorsmsg] = useState(false);
  const [Depositsccucesmsg, setDepositSccucesmsg] = useState(false);
  const [ScheduleErrormsg, setScheduleErrormsg] = useState(false);
  const [Schedulesccucesmsg, setScheduleSccucesmsg] = useState(false);
  const [Mintsccucesmsg, setMintSccucesmsg] = useState(false);
  const [MintErrormsg, setMintErrormsg] = useState(false);
  const [amountmsg, setAmountmsg] = useState(false);
  const [IsApproveloader, SetApproveLoader] = useState(false);
  const [IsMintloader, SetMintLoader] = useState(false);
  const [IsDepositloader, SetDepositLoader] = useState(false);
  const [IsScheduleloader, SetScheduleLoader] = useState(false);
  // const [IsLoader, setIsLoader] = useState(false);
  const [IsLoader, setIsLoader] = useState(true); // main 
  const [IsApproveBtn, setIsApproveBtn] = useState(true); // for main
  // const [IsApproveBtn, setIsApproveBtn] = useState(false); // for testing purpose
  const [IsMintBtn, SetMintBtn] = useState(false);  // for main
  // const [IsMintBtn, SetMintBtn] = useState(true); // you just need to uncomment this for testing purpose and comment false mintbutton
  const [IsDepositBtn, SetDepositBtn] = useState(false);
  const [IsScheduleBtn, SetScheduleBtn] = useState(false);
  //   const [infoAbi, SetinfoAbi] = useState({ fgh: "fgh" });
  //   const [infoContract, SetinfoContract] = useState("78954ertyujv74");
  const [infoAbi, SetinfoAbi] = useState([]);
  const [infoContract, SetinfoContract] = useState([]);
  const [byteCode, SetbyteCode] = useState('');
  const [Totalsupplies, setTotalsupplies] = useState('');

  console.log(props.values, "propssssssstep4");
  console.log(props, "propssep4");

  let bytecode;

  //====================== Deploy Function =================
  const DeployCall = async () => {
    let web3;
    setErrormsg(false);
    setSccucesmsg(false);
    SetApproveLoader(true);
    if (window.ethereum && window.ethereum.isMetaMask) {
      // await window.web3.currentProvider.enable();
      web3 = new Web3(window.ethereum && window.web3.currentProvider);
      console.log("WEB3.......", typeof web3);

      const name = "b" + props.values.tokenname;
      const symbol = "b" + props.values.tokensymbol;
      console.log(name, "     ", symbol);
      let arg_data = [name, symbol];

      // try {
      const accounts = await web3.eth.getAccounts();
      console.log("Here is my deploy script account", accounts[0]);
      console.log("arg_data", arg_data);
      console.log("infoAbi", infoAbi);

      // SetMintBtn(true);
      // setSccucesmsg(true);
      // setIsApproveBtn(false);
      // console.log("0x6493E2556bDABCeec613e616AbEC5826eF4438e1",byteCode);
      const result = await new web3.eth.Contract(infoAbi)
        .deploy({
          data: byteCode,
          // data: '0x' + bytecode,
          arguments: [name, symbol]
          // arguments:["b"+"Debttokenname","b"+"DebttokenSymbol"]
        })
        .send({ from: accounts[0], gas: '3000000' })
        .on("transactionHash", function (hash) {
          console.log(hash, "hashtransaction here ");

          // SetMintBtn(true);
          // SetDepositBtn(false);
        })
        .on('error', function (error) {
          // console.log('error: ', error) 
          SetApproveLoader(false);
          setErrormsg(true);
          console.log("Error in Deployment ", error);
          SetMintBtn(false);
          setIsApproveBtn(true);
          // setIsLoader(true);
        })
        .on('tx_speedup', (info) => {
          const { oldTx, newTx, nonce, from } = info.data;
          console.log(`Tx ${oldTx} with nonce ${nonce} from ${from} was sped up, the new hash is ${newTx}`)
        })
        .then(function (newContract) {

          const contractDeployedAddress = newContract.options.address;
          console.log('address:', contractDeployedAddress)
          console.log("GHJKJJJ");
          setSccucesmsg(true);
          SetApproveLoader(false);
          SetDepositBtn(false);
          SetinfoContract(contractDeployedAddress);
          SetMintBtn(true);
          setIsApproveBtn(false);

          console.log("SIcccsdsdsd")
          props.parentCallback("contractAddress", contractDeployedAddress);

        })

      // console.log("result",result);
      // let contractDeployedAddress = result.options.address;

    } else {
      console.log("Please install Metamask");
      setErrormsg(false);
      setIsApproveBtn(true);
    }

  }

  // const get_token_ids = async (symbol,names) => {

  // }
  //======================deploye script======================
  const apiCall = async () => {
    let web3;
    if (window.ethereum && window.ethereum.isMetaMask) {
      await window.web3.currentProvider.enable();
      web3 = new Web3(window.ethereum && window.web3.currentProvider);
      console.log("WEB3.......", typeof web3);
    } else {
      console.log("Please install Metamask");
    }


    // window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log("PROPS>VALUES>TOKENAME", "b" + props.values.tokenname);


    props.parentCallback("contractAbi", "b");
    props.parentCallback("contractAddress", "a");
    let url = "http://45.138.27.8:3001/api/bond/deploy_token";
    // let url = "http://localhost:3001/api/bond/deploy_token";
    let headers = { "Content-Type": "application/json" };
    let res = await axios.post(url, { headers });
    // .then((res) =>{
    console.log(res, "resss");

    bytecode = res.data[0];
    let abi = res.data[1];
    console.log(bytecode, "bytecode");
    console.log(abi, "abi");
    console.log(abi, "abi2222");
    // setinfocontract(a)
    // setinfoabi(b)

    SetbyteCode(bytecode);
    SetinfoAbi(abi);
    console.log('avi', abi)
    setIsLoader(false);
    props.parentCallback("contractAbi", abi);


  };



  useEffect(() => {
    if (props.currentStep !== 4) {
      return null;
    } else {
      console.log("this is Step 4");
      apiCall();

    }

    // depositCollateral();
    // schedulesale();
    // transact();
    // minttoken();
    //   }, []);
  }, [props.currentStep]);



  //==========================================================

  //====================bond contract - ABI and Contract Address====
  // let abi = [
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "_dbpowner",
  //         type: "address",
  //       },
  //     ],
  //     stateMutability: "nonpayable",
  //     type: "constructor",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "_lender",
  //         type: "address",
  //       },
  //       {
  //         internalType: "address",
  //         name: "_lendtoken",
  //         type: "address",
  //       },
  //       {
  //         internalType: "string",
  //         name: "_urlImage",
  //         type: "string",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "_amountToRaise",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "_collateral",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "_startdateofSale",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "_enddateofSale",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "string",
  //         name: "_collateralCurrency",
  //         type: "string",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "_startDiscountToZeroCoupn",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "_maturityDate",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "LendertokenhereorFundLoan",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "_lender",
  //         type: "address",
  //       },
  //     ],
  //     name: "Schedulesale",
  //     outputs: [
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "dbpowner",
  //     outputs: [
  //       {
  //         internalType: "address",
  //         name: "",
  //         type: "address",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "lender",
  //         type: "address",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "colletralamount",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "depositeColletral",
  //     outputs: [],
  //     stateMutability: "payable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "_lender",
  //         type: "address",
  //       },
  //     ],
  //     name: "getlendertoken",
  //     outputs: [
  //       {
  //         internalType: "address",
  //         name: "",
  //         type: "address",
  //       },
  //       {
  //         internalType: "string",
  //         name: "",
  //         type: "string",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "string",
  //         name: "",
  //         type: "string",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "_lender",
  //         type: "address",
  //       },
  //       {
  //         internalType: "string",
  //         name: "_descriptionOFLaunch",
  //         type: "string",
  //       },
  //       {
  //         internalType: "string",
  //         name: "_revenues",
  //         type: "string",
  //       },
  //       {
  //         internalType: "string",
  //         name: "_LearnMoreLink",
  //         type: "string",
  //       },
  //     ],
  //     name: "lenderDescription",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "lendersIds",
  //     outputs: [
  //       {
  //         internalType: "address",
  //         name: "",
  //         type: "address",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  // ];
  let colletral_contractaddress = "0x47F29bBAA96E0f153119a728d9eD4F33d02416d7";
  //====================bond contract - ABI and Contract Address End ====

  let mini_abi = [
    // transfer
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"

    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }
  ];

  let contractAddress = props.values.collateralAddress;
  let collateralCurrency = props.values.collateralCurrency;
  let collateralName = props.values.collateralName;

  // for deposite colletral
  const depositCollateral = async () => {
    // let colletralprice;
    // try {
      
    setAmountmsg(false);
    SetDepositLoader(true);
    setDepositSccucesmsg(false);
    setDepositerrorsmsg(false)
    let web3;


    if (window.ethereum && window.ethereum.isMetaMask) {
      // console.log('MetaMask Here!');
      web3 = new Web3(window.ethereum && window.web3.currentProvider);
      window.ethereum.request({ method: "eth_requestAccounts" });
      console.log(web3.eth.currentProvider);
      const accounts = await web3.eth.getAccounts();
      let dacc = accounts[0];
      console.log(dacc, "here");

      //===============================
      // get balance of user

      const tokenInst = new web3.eth.Contract(mini_abi, contractAddress);
      var balance = await tokenInst.methods.balanceOf(dacc).call()
      // var balance = await web3.eth.getBalance(dacc);
      // var wallet = web3.eth.toWei(balance, 'ether');
      // console.log(wallet);
      //===============================


      console.log("colletralSymbol", collateralCurrency);
      // console.log("colletralprice-----------",colletralprice,props.values);
      let exchangeRate;
      // let value = await get_token_ids(collateralCurrency,collateralName)


      // get_token_ids(collateralCurrency,collateralName).then((value) => {
      // debugger
      await axios.get(`https://api.coingecko.com/api/v3/coins/list`)
        .then((res) => {
          console.log("List of Token", res);
          const token_list = res.data;
          console.log("Names", collateralName);
          let fin_item;
          let token_ids = token_list.map((item) => {
            if (item.symbol === collateralCurrency.toLowerCase() && (item.name).toUpperCase() === collateralName.toUpperCase()) {
              console.log("Get id", item.id)
              // debugger
              fin_item = item;

            }
          });

          // });
          console.log("CALL APIn", fin_item);

          if (fin_item) {
            let ids_ = fin_item.id;
            console.log("Data ids", ids_);


            // let headers = { "Content-Type": "application/json","Access-Control-Allow-Origin": "*"};
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids_}&vs_currencies=usd`)
              .then((res) => {

                let colletralprice = parseInt((props.values.amountToRaise * props.values.collateral) / 100);
                console.log("RESSSSS-----NEW---------", res.data);
                console.log(ids_,colletralprice)
                exchangeRate = res.data[ids_]['usd'];
                console.log("res[0].current_price", res.data[ids_]['usd']);
                console.log("exchangeRate",exchangeRate);
                colletralprice = (parseInt(colletralprice) * (exchangeRate));
                console.log("colletralprice", colletralprice);

                console.log("Final Colletral Price In Wei", colletralprice, props.values);
                console.log("Available Balance", balance);
                const decimal_val = Math.pow(10, Number(props.values.collateralDecimal));
                // console.log("decimal_val",decimal_val)
                colletralprice = parseInt(colletralprice * decimal_val)
                // console.log("colletralprice",colletralprice)
                if (Number(balance) >= Number(colletralprice)) {

                  let contract = new web3.eth.Contract(mini_abi, contractAddress);

                  contract.methods
                    .transfer(colletral_contractaddress, String(colletralprice))
                    .send({ from: dacc, gas: "1420000", gasPrice: "17780000000" })
                    .on("transactionHash", function (hash) {
                      console.log(hash, "hashtransaction here ");

                    })
                    .then(function () {
                      console.log("GHJKJJJ");
                      setDepositSccucesmsg(true);
                      SetDepositBtn(false);
                      SetScheduleBtn(true);
                      SetDepositLoader(false);
                    })
                    .catch((e) => {
                      console.log("EROOR --- ", e);
                      setDepositerrorsmsg(true);
                      SetDepositLoader(false);

                    })

                }
                else {
                  console.log("Insufficient amount");
                  SetDepositLoader(false);
                  setAmountmsg(true);
                }


              })
              .catch((error) => {
                console.log("Error: Non Active Token, ", error);
              });
          }
        });

    } else {
      setDepositerrorsmsg(true);
      console.log("Need to install MetaMask");
      SetDepositLoader(false);
    }

  };

  // for shedule sale using contract
  const schedulesale = async () => {
    // try {
    SetScheduleLoader(true);
    setScheduleSccucesmsg(false);
    setScheduleErrormsg(false);

    if ((props.values.durationOfSaleStart, props.values.durationOfSaleEnd)) {
      setScheduleSccucesmsg(true);
      SetScheduleBtn(false);
      props.handleChange();
      SetScheduleLoader(false);


    } else {
      setScheduleErrormsg(true);
      SetScheduleLoader(false);

      console.log("Need to install MetaMask");
    }
    // }
    // catch {
    // 	setScheduleErrormsg(true);
    // }
  };

  //================================================here is debt code ========================

  let debt_abi = infoAbi;
  let debt_contractaddress = infoContract;
  
  const minttoken = async () => {
    SetMintLoader(true);
    setMintSccucesmsg(false);
    setMintErrormsg(false);
    let web3;

    if (window.ethereum && window.ethereum.isMetaMask) {
      // console.log('MetaMask Here!');
      web3 = new Web3(window.ethereum && window.web3.currentProvider);
      window.ethereum.request({ method: "eth_requestAccounts" });
      console.log(web3.eth.currentProvider);
      const accounts = await web3.eth.getAccounts();
      let macc = accounts[0];
      console.log(macc, "here");

      console.log("props.values.amountToRaise", props.values.amountToRaise);
      console.log("props.values.discount", props.values.discount);
      console.log("props.values.maturityTime", props.values.maturitydate);

      let discount_rate = Number(props.values.discount) / 100
      console.log("Dicount Rate", discount_rate);
      let l = Math.pow(1 + Number(discount_rate), Number(props.values.maturitydate));
      console.log("Deno --- ", l);
      let facevalue = 1
      let initial_price = (facevalue / l).toString();
      let totalSupply = Number(props.values.amountToRaise) / initial_price;
      let contract = new web3.eth.Contract(debt_abi, debt_contractaddress);
      console.log("totalSupply-----", Math.round(totalSupply));
      console.log("props.values.totalsuppliesss", props.values.totalsuppliesss);
      await contract.methods
        .mint(
          macc,
          // props.values.amountToRaise
          props.values.totalsuppliesss
        )
        .send({ from: macc, gas: "310000", gasPrice: "24500000000" })
        .on("transactionHash", function (hash) {
          console.log(hash, "hashtransaction here ");
          setTimeout(() => {
            console.log('you can see me after 2 seconds');
            setMintSccucesmsg(true);
            SetMintBtn(false);
            SetDepositBtn(true);
            SetMintLoader(false);
          }, 60000);
          // setMintSccucesmsg(true);
          // SetMintBtn(false);
          // SetDepositBtn(true);
          // SetMintLoader(false);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt, "confirm here");
          //  setMintSccucesmsg(true);
        })
        .on("receipt", function (receipt) {
          console.log(receipt, "reciept here");
        })
        // .on('tx_speedup', (info) => {
        //   console.log("-----------------------------------------",info)
        //   const { oldTx, newTx, nonce, from } = info.data;
        //   console.log(`Tx ${oldTx} with nonce ${nonce} from ${from} was sped up, the new hash is ${newTx}`)
        // })
        .then(function () {
          // const contractDeployedAddress = newContract.options.address;  
          // console.log('address:', contractDeployedAddress)
          console.log("Mint Proccess");
          setMintSccucesmsg(true);
          SetMintBtn(false);
          SetDepositBtn(true);
          SetMintLoader(false);


        })
        .catch((e) => {
          if (e.code === 4001) {
            //user rejected the transaction
            setMintErrormsg(true);
            //  console.log("User reject confirmation")
          }
        });
      // setMintSccucesmsg(true);
    } else {
      setMintErrormsg(true);
      console.log("Need to install MetaMask");
    }
    // }
    // catch {
    // 	setDepositerrorsmsg(true);
    // }
  };

  return (
    <>
      {props.currentStep == 4 &&
        (!IsLoader ? (
          // { info > 0 && (
          <div className="my-card my-card2">
            <p>
              <h4 className="text-start pl-1">Sign Transactions</h4>
              <br />
              Now that your bond configuration is ready to go, you need to
              deploy it to the network by signing the following transactions
            </p>
            {errormsg ? (
              <p style={{ color: "red" }}>
                User Denied Request or Need to install MetaMask
              </p>
            ) : (
              <></>
            )}
            {sccucesmsg ? <p style={{ color: "green" }}>Approved Successfully</p> : <></>}
            <Label for="approve_interatcions">Approve interatcions</Label>
            {IsApproveloader ? <div className="img-btn">
              <img
                src={loadinggif}
                alt="Happy Emoticons"
                className="demoimg"
              /></div> : <>
              <Button
                variant="primary"
                onClick={DeployCall}
                className="continue-btn"
                disabled={!IsApproveBtn}
              >
                Approve
              </Button>{" "}
            </>}
            <Label for="tokens">Mint {props.values.totalsuppliesss} of b{props.values.tokenname}</Label>
            {/* {sccucesmsg ?<> */}
            {MintErrormsg ? (
              <p style={{ color: "red" }}>Not Minted or User Denied Request </p>
            ) : (
              <></>
            )}
            {Mintsccucesmsg ? (
              <p style={{ color: "green" }}>Minted Successfully</p>
            ) : (
              <></>
            )}
            {IsMintloader ? <div className="img-btn">
              <img
                src={loadinggif}
                alt="Happy Emoticons"
                className="demoimg"
              /></div> : <>
              <Button
                variant="primary"
                onClick={minttoken}
                className="continue-btn"
                disabled={!IsMintBtn}
              >
                Mint
              </Button>{" "}
            </>}
            <Label for="deposit_collateral">Deposited Collateral</Label>
            {amountmsg ? (
              <p style={{ color: "red" }}>Insufficient Amount </p>
            ) : (
              <></>
            )}
            {depositerrormsg ? (
              <p style={{ color: "red" }}>User Denied Request </p>
            ) : (
              <></>
            )}
            {Depositsccucesmsg ? (
              <p style={{ color: "green" }}>Successfully Deposited</p>
            ) : (
              <></>
            )}
            {IsDepositloader ? <div className="img-btn">
              <img
                src={loadinggif}
                alt="Happy Emoticons"
                className="demoimg"
              /></div> : <>
              <Button
                variant="primary"
                onClick={depositCollateral}
                className="continue-btn"
                disabled={!IsDepositBtn}
              >
                Deposit
              </Button>{" "}
            </>}
            <Label for="schedule_sale">Schedule sale</Label>

            {ScheduleErrormsg ? (
              <p style={{ color: "red" }}>Not Scheduled</p>
            ) : (
              <></>
            )}
            {Schedulesccucesmsg ? (
              <p style={{ color: "green" }}>
                Date Scheduled from{" "}
                {new Date(props.values.durationOfSaleStart).toString()} to{" "}
                {new Date(props.values.durationOfSaleEnd).toString()}{" "}
              </p>
            ) : (
              <></>
            )}
            {IsScheduleloader ? <div className="img-btn">
              <img
                src={loadinggif}
                alt="Happy Emoticons"
                className="demoimg"
              /></div> : <>
              <Button
                variant="primary"
                onClick={schedulesale}
                className="continue-btn"
                disabled={!IsScheduleBtn}
              >
                Schedule
              </Button>{" "}
            </>}
          </div>
        ) : (
          <div className="text-center">
            <img src={loadinggif} alt="Happy Emoticons" className="demoimg" />
            <p style={{ 'textAlign': "center" }}>Creating Debt Token......</p>
          </div>
        ))}
    </>
  );
};

export default Step4;
