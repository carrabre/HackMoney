import React, { useState } from "react";
import { Label, Input, Row} from "reactstrap";
import { Form } from "react-bootstrap";
import './Step1.css';
import DateTimePicker from 'react-datetime-picker';
import { Dropdown, Selection } from 'react-dropdown-now';
import { MenuItem ,TextField } from "@material-ui/core";
import hug from "../../src/assets/images/hug.png";
import Vector from "../../src/assets/images/vectorblue.png";
import Usdc from "../../src/assets/images/usdc.png";
import  Usdt from "../../src/assets/images/usdt.png";
import Dai from "../../src/assets/images/dai.png";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
const options = [
  { value: 'DAI', label: 'DAI' },
  { value: 'HUG', label: 'HUG' },
  { value: 'ETH', label: 'ETH' },
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' }
]
// DAI address : 0x6b175474e89094c44da98b954eedeac495271d0f
// USDC : 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
// USDT : 0xdac17f958d2ee523a2206206994597c13d831ec7
// 
const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }
  
  

  return (
  
    <>
      <div className="my-card">
        <p><h4 className="text-start pl-1">Auction information</h4><br />
          Set your initial discount rate the given.</p>

        
        <Label for="raise_amt">Amount to Raise</Label>
        <Input type="number"
        value={props.values.amountToRaise}
        onChange={props.handleChange('amountToRaise')}
        className="mb-3 w-100 form-box form-control" placeholder='e.g. $100' min="0"/>
        {props.values.amountToRaise_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}
        {props.values.amountToRaisevalid_erorrs ? <p style={{ color: "red" }}>Amount to raise must be greater than 0</p> : <></>}

        <Label for="collateral">Collateral</Label>
        <p>minimum of 25% collateral, though the more collateralized, the more attractive the offering.</p>
        <Input type="number"
        value={props.values.collateral}
        onChange={props.handleChange('collateral')}
        className="mb-3 w-100 form-box form-control" placeholder="e.g. 30" min="25" max="100"/>
        {props.values.collateral_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}
        {props.values.collateralvalid_erorrs ? <p style={{ color: "red" }}>Collateral must lies in between 25 and 100</p> : <></>}


        <Label for="duration_sale">Duration of Sale</Label>
        <div className="row">
            <DateTimePicker
              className="col-5 float-right form-box form-control"
              onChange={props.handleChange('durationOfSaleStart')}
              value={props.values.durationOfSaleStart}
            />
          <DateTimePicker
              className="col-5 float-right form-box form-control"
              onChange={props.handleChange('durationOfSaleEnd')}
              value={props.values.durationOfSaleEnd}
            />
        </div>
        {props.values.durationOfSaleEnd_erorrs || props.values.durationOfSaleStart_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}

        <Label for="collateral_currency">Collateral Currency</Label>
        
       
        {/* <CreatableSelect options={options} className="new123" onChange={props.handleChange('collateralCurrency')} />
        
        {props.values.collateralCurrency_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>} */}

        {/* <Label for="collateralCurrency">Starting discount to Zero Coupon bond</Label> */}
        <Input type="text" 
        value={props.values.collateralCurrency}
        onChange={props.handleChange('collateralCurrency')}
        className="mb-3 w-100 form-box form-control" placeholder="Collateral Currency Address"/>

        <Label for="discount">Starting discount to Zero Coupon bond</Label>
        <Input type="number" 
        value={props.values.discount}
        onChange={props.handleChange('discount')}
        className="mb-3 w-100 form-box form-control" placeholder="10%" min="0" max="100"/>
        {props.values.discount_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}
        {props.values.discountvalid_erorrs ? <p style={{ color: "red" }}>Discount must lies in between 0 and 100</p> : <></>}

        <Label for="maturity">Maturity Date</Label>
        <div className="rado_btn">
          <Row>
          <form class="boxed">
            <input type="radio" id="1yrs"
            value={props.values.maturitydate}
            onChange={props.handleChange('maturitydate')}
            name="skills" value="1" />
            <label for="1yrs">1yr</label>

            <input type="radio"
            value={props.values.maturitydate}
            onChange={props.handleChange('maturitydate')}
            id="2yrs" name="skills" value="2"/>
            <label for="2yrs">2yr</label>
            
            <input type="radio"
            value={props.values.maturitydate}
            onChange={props.handleChange('maturitydate')}
            id="3yrs" name="skills" value="3"/>
            <label for="3yrs">3yr</label>
            
            <input type="radio" 
            value={props.values.maturitydate}
            onChange={props.handleChange('maturitydate')}
            id="5yrs" name="skills" value="5"/>
            <label for="5yrs">5yr</label>

            <input type="radio" 
            value={props.values.maturitydate}
            onChange={props.handleChange('maturitydate')}
            id="10yrs" name="skills" value="10"/>
            <label for="10yrs">10yr</label>

            </form>

          </Row>
          {props.values.maturitydate_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}
        </div>


      </div>

    </>
  );
};

export default Step2;














// $(".js-example-tags").select2({
//   tags: true
// });
