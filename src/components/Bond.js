import React, { useState, useEffect } from "react";
import Topbar from "./Topbar/topbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Card, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
// import { Container } from "react-bootstrap";
import "./Bond.css";
import { Container } from "react-bootstrap";
import axios from 'axios';
import Vector from "../assets/images/Vector.png"
import icn from "../assets/images/jalebi.png"
import gicon from "../assets/images/greenRect.png"
import daicon from "../assets/images/DAI-logo.png"
import { Link } from 'react-router-dom';


function Bonds( ) {
  console.log("Bonds");
  // let x = 1/(1+5)**2
  //  console.log(x,"x");
  // let y = 1/(1+5)^2
  // console.log(y,"y");
  const defaultAccount = localStorage.getItem('address');
  const [repo, setData] = useState([]);

  let data = {
    "mainToken": "mainToken" ,
    "tokenImage": "tokenImage",
    "tokenname":"tokenname",
    "tokensymbol": "this.state.tokensymbol",
    "amountToRaise": "this.state.amountToRaise",
    "collateralPercent": "this.state.collateral",
    "durationOfSaleStart":"this.state.durationOfSaleStart",
    "durationOfSaleEnd":"this.state.durationOfSaleEnd",
    "collateralCurrency": "this.state.collateralCurrency",
    "discount":"this.state.discount",
    "maturityTime":"this.state.maturitydate",
    "descriptionOfLaunch":"this.state.descriptionOfLaunch",
    "Revenues":"this.state.Revenues",
    "LearnMoreLink":"this.state.LearnMoreLink",
    "contractAddress":"this.state.contractAddress",
    "contractAbi":"this.state.contractAbi"
  } 

  
  //============= this function is used for getting Api data.===============
  const apiCall = async() =>{        
    let url = "http://45.138.27.8:3001/api/bond/";
    let headers = {  "Content-Type": "application/json"};
    let res = await axios.get(url,{headers});
      console.log(res,"resss");
      if(res){
        let myRepo;
        myRepo = res.data;
        console.log(res,'resss');
        setData(myRepo);
      }    
    }
  
  //=============this function is used for price logic data====================
  const discountprice = (amountToRaise,discount,maturityTime) =>{
    // firstly we do overall data 
    console.log("amountToRaise",amountToRaise);
    console.log("discount",discount);
    console.log("maturityTime",maturityTime);

    // "https://ropsten.etherscan.io/token/"+contractAddress

    // let Equations = (1+discount)^maturityTime * (amountToRaise);
    // console.log(Equations);
    let facevalue = 1; // by default it take 1$
    // let p =facevalue*((discount)/100);
    // console.log(p,"price");
    discount = discount/100;
    let l= Math.pow(1 + (discount), maturityTime);
    console.log("Deno --- ",l);

    let initial_price = (facevalue/l).toString();
    console.log(initial_price);
    // let initial_price = (facevalue/(1+(discount))**maturityTime).toString();
    // return(Number(initial_price.slice(0, (initial_price.indexOf("."))+3)));
    return(Number(initial_price).toFixed(4));
    }
    
    useEffect(() => {
      apiCall();
    }, []);

  //=====this function is used for getting to show end and begin day through start and end schedul date =======
    const end_begin_time = (startDate, endDate) => {
      console.log(startDate,endDate);
      let current_date = new Date();
      let starts = new Date(startDate)
      if(current_date >= starts){
        // const date1 =new Date(startDate);//current date
        const date1 = new Date(); 
        const date2 = new Date(endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // console.log(diffTime + " milliseconds");
        console.log(" Ends in " + diffDays + " days");
        return " Ends in " + diffDays + " days";
      }
      else{
        const date1 = new Date(); //current date
        const date2 = new Date(startDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // console.log(diffTime + " milliseconds");
        console.log(" Begin in " + diffDays + " days");
        return " Begin in " + diffDays + " days";
      }
    }
    console.log("repo",repo)
  return (
    <>
       <Topbar address={defaultAccount.replace(/"/g,"")} />
        
      <Container>
        <Row className="justify-content-center">
          <Col lg={9} sm={9}>
            <Form className="mt-5 ">
              <Card className="form-one mt-4">
                <div className="bond-card">
                  <Row>
                    <Col lg={6} sm={6}>
                      <div className="vw_bond" >View Bond Sales</div>
                    </Col>
                    <Col lg={6} sm={6}>
                      <div className="Bond2">
                        {/* <Button color="primary float-right continue-btn" >Create Bond</Button> */}
                      {/* <a href="/form" className="form-btn">Create Bond</a> */}
                      <Link to="/form" className="form-btn">Create Bond</Link>
                      
                      </div>
                      
                    </Col>
                  </Row>
                </div>
                <div className="warning-div">
                  <div className="warningup-text">
                    <Row>
                      <Col lg={1}  sm={1}><FontAwesomeIcon icon={faExclamationCircle} /></Col>
                      <Col lg={11} sm={11} className="warning_head">
                        <h1>Warning</h1>
                        <p>
                          The auctions in this list are indexed directly from the blockchain and do not represent an endorsement by the Hug platform or the Hug community. Please note that participating in any of these auctions is a high-risk endeavor and that the value of the tokens that you've received in exchange for contributing to such an auction might go to 0. Hug is not liable for any losses incurred by using our platform.
                        </p>
                      </Col>
                    </Row>
                  </div>

                </div>
                <div className="table-div">
                  <div className="table-head">
                    <Table size="sm">
                      <thead className="boder-wap">
                        <tr>
                          <th>Token</th>
                          <th>Network</th>
                          <th>Status</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="bagraund-wap">
                      {
                      repo.map((item)=>(
                        // console.log("durationOfSaleEnd",new Date(item.durationOfSaleEnd),new Date())

                        new Date(item.durationOfSaleEnd) >= new Date() && 
                        <tr key = { item.contractAddress } className="main-box">
                          
                          <td className="firstbox"><a href={`https://ropsten.etherscan.io/token/${item.contractAddress}`} style={{textDecoration : 'none' , color : 'black'}} target={'_blank'}><img src={item.tokenImage} alt="icon" className="ic-img2 ic-img3"/>b{item.tokensymbol}
                          </a></td>
                          
                          <td className="text-center"><img src={Vector} alt="" className="ic-img"/></td>
                          <td><img src={gicon} alt="icon" className="ic-img2"/>{end_begin_time(item.durationOfSaleStart,item.durationOfSaleEnd)}</td>
                          {/* <td><img src={gicon} alt="icon" className="ic-img2"/>date</td> */}
                          <td><img src={daicon} alt="icon" className="ic-img2"/>{discountprice(item.amountToRaise,item.discount,item.maturityTime)}</td>
                          
                          <td className="buy lastbox"><a href="#" className="buy-button">buy</a></td>
                        </tr>
                        ))}             
                      </tbody>
                      {/* <tbody className="bagraund-wap">
                        <tr>
                          <td><img src={icn} alt="icon" className="ic-img2"/>dMC</td>
                          <td className="text-center"><img src={vector} alt="icon" className="ic-img"/></td>
                          <td><img src={gicon} alt="icon" className="ic-img2"/>Ends in 4.7 days</td>
                          <td><img src={daicon} alt="icon" className="ic-img2"/>0.27</td>
                          <td className="buy"><a href="#" className="buy-button">buy</a></td>
                        </tr>
                      </tbody> */}
                      {/* <tbody className="bagraund-wap">
                        <tr>
                          <td><img src={icn} alt="icon" className="ic-img2"/>dMC</td>
                          <td className="text-center"><img src={vector} alt="icon" className="ic-img"/></td>
                          <td><img src={gicon} alt="icon" className="ic-img2"/>Begins in 2.7 days</td>
                          <td><img src={daicon} alt="icon" className="ic-img2"/>0.27</td>
                          <td className="buy"><a href="#" className="buy-button">buy</a></td>
                        </tr>
                      </tbody> */}
                    </Table>
                  </div>

                </div>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Bonds;

