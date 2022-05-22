import React,{ Component,useState } from "react";

import {
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import gicon from "../assets/images/greenRect.png";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import MultiStepProgressBar from "./MultiStepProgressBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Topbar from "./Topbar/topbar";
import validator from "validator";
import Web3 from 'web3';
import abi from 'erc-20-abi';
import axios from 'axios'; 
// import cors from 'cors';
// const express = require("express");
// const app = express();
// import response from "express";
class MasterForm extends Component {
  constructor(props) {
    super(props);
    


    // Set the intiial input values
    this.state = {
      currentStep: 1,
      tokenname : "",
      tokensymbol : "",
      tokentotalsupply : "",
      tokenbalance : "" ,
      token: "",
      image: "",
      amountToRaise : "",
      collateral : "",
      durationOfSaleStart : "",
      durationOfSaleEnd : "",
      collateralCurrency : "",
      collateral_address : "",
      discount : "",
      maturitydate :"",
      descriptionOfLaunch : "",
      Revenues : "",
      LearnMoreLink : "",
      token_erorrs: false,
      image_erorrs: false,
      amountToRaise_erorrs : false,
      collateral_erorrs : false,
      durationOfSaleStart_erorrs : false,
      durationOfSaleEnd_erorrs : false,
      collateralCurrency_erorrs : false,
      discount_erorrs : false,
      maturitydate_erorrs : false,
      descriptionOfLaunch_erorrs : false,
      Revenues_erorrs : false,
      LearnMoreLink_erorrs : false,
      imagevalid_erorrs: false,
      tokenvalid_erorrs: false,
      collateralvalid_erorrs: false,
      amountToRaisevalid_erorrs: false,
      discountvalid_erorrs: false,
      contractAddress:"",
      contractAbi:{},
      allcomplete : false,
      totalsuppliesss : '',
    }
    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  
// async function handleChange(input){
  handleChange = input => async(e) => {
    console.log(e,"handlechange")
    if (input === "durationOfSaleStart" || input === "durationOfSaleEnd"){
      console.log(e);
      // var date = Math.floor(e.getTime()/1000.0);
      // console.log(date);
      this.setState({
        [input]: e,
        [`${input}_erorrs`]: false,
        [`${input}valid_erorrs`]: false
      });
    }
    else if (input === "totalsuppliesss"){
      console.log(e,"totalsuppliesss");
      debugger;
      // var date = Math.floor(e.getTime()/1000.0);
      // console.log(date);
      this.setState({
        [input]: e,
      });
    }
    else if (input === "collateralCurrency"){
      console.log(e.target.value,"collateralCurrency");
      let c = e.target.value;
      let web3;
      if (this.state.collateralCurrency === ""){
              
          if (window.ethereum && window.ethereum.isMetaMask) 
          {
                web3 = new Web3(window.ethereum && window.web3.currentProvider);
                window.ethereum.request({ method: 'eth_requestAccounts'})   
                console.log(web3.eth.currentProvider)  
                const accounts = await web3.eth.getAccounts();
                let address = accounts[0];
                console.log(address,"address");
                // let tokenaddress = "0x6493E2556bDABCeec613e616AbEC5826eF4438e1";
                try{
                // let tokenContract = new web3.eth.Contract(abi, e.target.value);
                let tokenContract = new web3.eth.Contract(abi, c);
                
                try{
                let symbolss = await tokenContract.methods.symbol().call();
                let names = await tokenContract.methods.name().call()
                console.log("symbolss",symbolss)
                let decimals = await tokenContract.methods.decimals().call()
                console.log("decimal",decimals);
                this.setState({
                  ["collateralDecimal"]:decimals,
                  ["collateralName"]:names,
                  [input]: symbolss,
                  ["collateralAddress"]:c,
                  [`${input}_erorrs`]: false,
                  [`${input}valid_erorrs`]: false
                });                       
                }catch(e){
                  console.log(e)
                  this.setState({
                    [`${input}_erorrs`] : true
                  })
                }    
                
              }catch(e){
                this.setState({
                  [`${input}_erorrs`] : true
                })
              }
              
        } else 
            {
            console.log('Need to install MetaMask');
            }
          }
      else{
        this.setState({
          [input]: '',
        });
      }
    }
    else if (input === "token"){
      console.log(e,"token");
              this.setState({
                [input]: e.target.value,
                [`${input}_erorrs`]: false,
                [`${input}valid_erorrs`]: false
              });              
                
                let web3;
              
                if (window.ethereum && window.ethereum.isMetaMask) 
                {
                      web3 = new Web3(window.ethereum && window.web3.currentProvider);
                      window.ethereum.request({ method: 'eth_requestAccounts'})   
                      console.log(web3.eth.currentProvider)  
                      const accounts = await web3.eth.getAccounts();
                      let address = accounts[0];
                      console.log(address);
                      // let tokenaddress = "0x6493E2556bDABCeec613e616AbEC5826eF4438e1";
                      try{
                      let tokenContract = new web3.eth.Contract(abi, e.target.value);
                     
                      try{
                      let names = await tokenContract.methods.name().call()
                      let symbol = await tokenContract.methods.symbol().call();
                      let totalsupply = await tokenContract.methods.totalSupply().call();
                      let balance = await tokenContract.methods.balanceOf(e.target.value).call()
                      console.log(names,"tokname-");
                      console.log(symbol);
                      console.log(totalsupply); 
                      this.setState({
                        tokenname : names,
                        tokensymbol : symbol,
                        tokentotalsupply : totalsupply,
                        tokenbalance : balance 
                      });                       
                     }catch(e){
                        console.log(e)
                        this.setState({
                          tokenvalid_erorrs : true
                        })
                      }    
                      
                    }catch(e){
                      this.setState({
                        tokenvalid_erorrs : true
                      })
                    }
                    
              } else 
                  {
                  console.log('Need to install MetaMask');
                 }         

         
    }
    else if (input === "collateral"){
      if (e.target.value>= 25 && e.target.value<= 100){        
        this.setState({
          [input]: e.target.value,
          [`${input}_erorrs`]: false,
          [`${input}valid_erorrs`]: false
        });             
      }
      else{
        this.setState({
          [input]: e.target.value,
          [`${input}_erorrs`]: true,
          [`${input}valid_erorrs`]: true
        });  
      }
                     
    }
    else{
    this.setState({
      [input]: e.target.value,
      [`${input}_erorrs`]: false,
      [`${input}valid_erorrs`]: false
    });
  }

  }

  handleChange2 = input => {
    this.setState({
      [`${input}_erorrs`]: true
    });
  }

  handleChange3 = () => {
    this.setState({
      allcomplete: true,
    });
    console.log("me");
  }

  handleCallback = (e1,e2) => {
    // this.setState({
    //   [input]: e,
    //   [`${input}_erorrs`]: false,
    //   [`${input}valid_erorrs`]: false
    // });
    if (e1 === "contractAddress"){
        this.setState({
          [e1]: e2,
        });         
    }
  
    else{
    this.setState({
      [e1]: e2,
    });
  }
  }
  

  async _next() {
    let currentStep = this.state.currentStep;

    if (currentStep === 1){
      if (validator.isEmpty(this.state.token) || validator.isEmpty(this.state.image)){
        if (validator.isEmpty(this.state.token)){
          this.handleChange2('token');
        }
        if (validator.isEmpty(this.state.image)){
          this.handleChange2('image');
        }
      }
      else{
        if (validator.isURL(this.state.image) && validator.isAlphanumeric(this.state.token)){
              this.setState({
                currentStep: 2 
              });
            }
        else {
        if (!(validator.isURL(this.state.image))){
              this.handleChange2('imagevalid');
        }
        if (!(validator.isAlphanumeric(this.state.token))){
              this.handleChange2('tokenvalid');
          }
        }
    }
    }

    if (currentStep === 2){
      if (validator.isEmpty(this.state.amountToRaise) || validator.isEmpty(this.state.collateral)  || validator.isEmpty(this.state.discount) 
      )
      {
        if (validator.isEmpty(this.state.amountToRaise)){
          this.handleChange2('amountToRaise');
        }
        if (validator.isEmpty(this.state.collateral)){
          this.handleChange2('collateral');
        }
        if (validator.isDate(this.state.durationOfSaleStart)){
          this.handleChange2('durationOfSaleStart');
        }
        if (validator.isDate(this.state.durationOfSaleEnd)){
          this.handleChange2('durationOfSaleEnd');
        }
        if (validator.isEmpty(this.state.discount)){
          this.handleChange2('discount');
        }
        try{
        if (validator.isEmpty(this.state.maturitydate)){
          this.handleChange2('maturitydate');
        }
        }
        catch{
          console.log()
        }
        try{
        if (validator.isEmpty(this.state.collateralCurrency)){
          this.handleChange2('collateralCurrency');
        }
        }
        catch{
          console.log()
        }
      }
      else{
          if (this.state.collateral < 25 || this.state.collateral > 100){
            this.handleChange2('collateralvalid');
          }
          if (this.state.discount < 0 || this.state.discount > 100){
            this.handleChange2('discountvalid');
          }
          if  (this.state.amountToRaise < 0){
            this.handleChange2('amountToRaisevalid');
          }
          else{         
          let discount_rate = Number(this.state.discount)/100
          let l= Math.pow((1 + Number(discount_rate)), Number(this.state.maturitydate));
          console.log("Deno --- ",l);
          
          let facevalue = 1
          let initial_price =  (facevalue/l).toString();
          let totalSupply = Number(this.state.amountToRaise)/initial_price;
          console.log("---Total Supply---",Math.round(totalSupply));
          // props.handleChange('totalsuppliesss')
          this.setState({
            currentStep: 3 ,
            totalsuppliesss : Math.round(totalSupply)
          });
        }
      }
  }
    if (currentStep === 3){

      if (validator.isEmpty(this.state.descriptionOfLaunch) || validator.isEmpty(this.state.Revenues) || validator.isEmpty(this.state.LearnMoreLink))
      {
        if (validator.isEmpty(this.state.descriptionOfLaunch)){
          this.handleChange2('descriptionOfLaunch');
        }
        if (validator.isEmpty(this.state.Revenues)){
          this.handleChange2('Revenues');
        }
        if (validator.isEmpty(this.state.LearnMoreLink)){
          this.handleChange2('LearnMoreLink');
        }
      }
      else{
        this.setState({
          currentStep: 4
        });
      }
      
    }
    if (currentStep === 4 ){
        // console.log(this.state.token_erorrs,"Error found")
        // currentStep = currentStep >= 4 ? 5 : currentStep + 1;
        // const apiCall = async() =>{
      // if (this.state.allcomplete){  
          let url = "http://45.138.27.8:3001/api/bond/";
          let data = {
                "mainToken": this.state.token,
                "tokenImage":this.state.image,
                "tokenname":this.state.tokenname,
                "tokensymbol":this.state.tokensymbol,
                "amountToRaise": this.state.amountToRaise,
                "collateralPercent": this.state.collateral,
                "durationOfSaleStart":this.state.durationOfSaleStart,
                "durationOfSaleEnd":this.state.durationOfSaleEnd,
                "collateralCurrency": this.state.collateralCurrency,
                "collateralAddress":this.state.collateralAddress,
                "collateralDecimal":this.state.collateralDecimal,
                "collateralName":this.state.collateralName,
                "discount":this.state.discount,
                "maturityTime":this.state.maturitydate,
                "descriptionOfLaunch":this.state.descriptionOfLaunch,
                "Revenues":this.state.Revenues,
                "LearnMoreLink":this.state.LearnMoreLink,
                "contractAddress":this.state.contractAddress,
                "contractAbi":this.state.contractAbi
            }
          console.log("masterdata -------------------------------------------------",data)
          let headers = {  "Content-Type": "application/json"};
          let res = await axios.post(url,data ,{headers});
          // .then((res) =>{
            console.log(res,"resss");
        this.setState({
          currentStep: 5
        });
        console.log("mision complt")
      }}
    // }
  
  

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left continue-btn" onClick={this._prev}>
          Previous
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    
    // If the current step is not 3, then render the "next" button
    if (currentStep < 5) {
      return (
        <Button color="primary float-right continue-btn" onClick={this._next}>
          Continue
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep >= 3) {
      return <Button color="primary float-right continue-btn" onClick={this._next} disabled={!this.state.allcomplete}>Submit</Button>;
    }
    // ...else render nothing
    return null;
  }

  render() {
    const defaultAccount = localStorage.getItem('address')
    const { currentStep } = this.state;
    const { token,image,amountToRaise,collateral, durationOfSaleStart,durationOfSaleEnd,collateralCurrency,collateralName,collateralDecimal,collateralAddress,discount,maturitydate,descriptionOfLaunch,Revenues,LearnMoreLink,token_erorrs,image_erorrs,amountToRaise_erorrs,collateral_erorrs, durationOfSaleStart_erorrs,durationOfSaleEnd_erorrs,collateralCurrency_erorrs,discount_erorrs,maturitydate_erorrs,descriptionOfLaunch_erorrs,Revenues_erorrs,LearnMoreLink_erorrs , imagevalid_erorrs ,tokenvalid_erorrs ,collateralvalid_erorrs,amountToRaisevalid_erorrs,discountvalid_erorrs,contractAddress,contractAbi,tokenname,tokensymbol ,tokentotalsupply,allcomplete , mainToken ,totalsuppliesss} = this.state;
    // const {  } = this.erorrs;
    const values = { token,image,amountToRaise,collateral, durationOfSaleStart,durationOfSaleEnd,collateralCurrency,collateralName,collateralDecimal,collateralAddress,discount,maturitydate,descriptionOfLaunch,Revenues,LearnMoreLink,token_erorrs,image_erorrs,amountToRaise_erorrs,collateral_erorrs, durationOfSaleStart_erorrs,durationOfSaleEnd_erorrs,collateralCurrency_erorrs,discount_erorrs,maturitydate_erorrs,descriptionOfLaunch_erorrs,Revenues_erorrs,LearnMoreLink_erorrs,imagevalid_erorrs ,tokenvalid_erorrs, collateralvalid_erorrs,amountToRaisevalid_erorrs,discountvalid_erorrs,contractAddress,contractAbi,tokenname,tokensymbol,tokentotalsupply,allcomplete , mainToken,totalsuppliesss}
    // const [infoAbi, SetinfoAbi] = useState({});
	  // const [infoContract, SetinfoContract] = useState('');
    // const erorrs = {  }
    // console.log(values)
    // const {infoabi} = this.state.infoabi;
    // const {infocontract} = this.state.infocontract;
    return (
    
      <> 
      
        <Topbar address={defaultAccount.replace(/"/g,"")} />
        <Row className="justify-content-center">
          <Col lg={9}>
          <Form onSubmit={this.handleSubmit} className="mt-5 masform">
          <MultiStepProgressBar currentStep={this.state.currentStep} />
          {
            this.state.currentStep < 5 ? 
            <Card className="form-one mt-4">
              {/* <CardHeader>Create an Account</CardHeader> */}
              <CardBody className="masterformcard">
                <CardTitle>
                </CardTitle>
                <CardText />
                <Step1
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  values = {values}
               
                />
                <Step2
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  values = {values}
                />

                <Step3
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  values = {values}
                />

                <Step4
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange3}
                  values={values}
                  parentCallback={this.handleCallback}
                  // infoabi = {this.state.infoabi}
                  // infocontract = {this.state.infocontract}
                  address={defaultAccount}
                />
                {
                  this.state.currentStep < 4 ?
                  <>
                  {this.nextButton} </>
                  :
                    <>{this.submitButton}</>
                    
                }
                  
              </CardBody>

            </Card>
            : <Card className="form-one mt-4 step5-card">
            <Step5
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  values={values}
                  // email={this.state.password}
                />
                </Card>
          }

          
        
          </Form>  
          </Col>
          <Col lg={3}>
          { this.state.currentStep < 2 ? 
          
            <Card className="validate-box-1">
            <div className="card-div-1"><div><img src={gicon} alt="icon" className="tk-img"/>Token info validated</div></div>
              <div className="card-div-1">
              <div>Token name: {this.state.tokenname}</div>
              <div>Token ticker: {this.state.tokensymbol}</div>
              <div>Total supply: {this.state.tokentotalsupply}</div>
              <div>Balance: {this.state.tokenbalance}</div>
              </div>
            </Card>
          
    : ""}
    </Col>
        </Row>
      </>
    );
  }
}

export default MasterForm;