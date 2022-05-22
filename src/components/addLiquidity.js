
import React from 'react';
import Quantity from './Topbar/QuantityComponent';
import { Card, Button, Table, Row, Col,Nav,Tabs,Tab, Container } from 'react-bootstrap';
import "./addLiquidity.css";
import Vector from "../assets/images/Vector.png";
import Topbar from "./Topbar/topbar";
import Dbps from './Dbptop';
import { Link } from 'react-router-dom';


function AddLiquidity() {
  const defaultAccount = localStorage.getItem('address')
    console.log('somthing');
    return (
        <>
        
        <Topbar address={defaultAccount.replace(/"/g,"")} />
             
            
            <Card className='liquidity-card'>
                <div>
                    <h1 className='text-liq'>Add Liquidity</h1>
                </div>


                <Row>
                    <Col lg={3} sm={6} className="newliquidity">
                        
                        <div><h4 className="inp-amt">Amount</h4></div>
                        <div><input type="text" className="liq-inpt" placeholder='0.0' /></div>





                    </Col>

                    <Col lg={3}>
                        <div className="liq-btn">
                            <p className="ETH"><img src={Vector} alt="icon" className="dai-img"/>ETH</p>
                        </div>
                    </Col>

                    <Col lg={3} className="two ">
                        <div className="liq-btn">
                            <p className="bMC">bMC</p>
                        </div>
                    </Col>

                    <Col lg={3} className="one newliquidity">
                        <div><h4 className="inp-amt">Amount</h4></div>

                        <div><input type="text" className="liq-inpt" placeholder='0.0' /></div>
                    </Col>

                </Row>
                {/* <------- use code-----> */}
<Quantity/>

                <div className="Swap"> 
                {/* <Button variant="outlined" className="liq-btn" > */}
                    <Link to="/topbutton" style={{textDecoration : 'none'}} className="anchorliquidity">Confirm</Link>
                     {/* </Button> */}
                </div>


            </Card>
           
        </>
        
        
    );
}
export default AddLiquidity;