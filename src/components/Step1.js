import React from "react";
import { event } from "jquery";
import { Label} from "reactstrap";
import "./Step1.css"; 
import '../index.css';



const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;

  }


  return (
    <>
    
    <div className="my-card">
      <p><h4 className="text-start pl-1">Bonded Token Information</h4><br/>
      Enter the ERC-20 token contract address and a URL of the logo for the auctioned token.</p>
      <Label for="bonded_token">Bonded Token</Label>
      <input type="text" autoComplete="off"
      value={props.values.token}
      onChange={props.handleChange('token')}
      label="Bonded Token" name="token" id="token" className="mb-3 w-100 form-box form-control" placeholder="0xEC213F83defB583af3A000B1c0ada660b1902A0F"/> 
      {props.values.token_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}
      {props.values.tokenvalid_erorrs ? <p style={{ color: "red" }}>Please provide valid token</p> : <></>}
      
      <Label for="bonded_token">Project Image URL    {props.values.image === "" ? <></>: <img
        src={props.values.image}
        className="demoimg" 
      /> }</Label>
      
      
      <input type="url" name="image" autoComplete="off" pattern="https?://.+(jpg | png)"
      value={props.values.image}
      onChange={props.handleChange('image')} 
      id="id" label="Project Image URL" className="mb-3 w-100 form-box form-control" placeholder="https://presearch.io/static/media/Presearch_Logo.3dacaada.jpg"/>
      {props.values.image_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}
      {props.values.imagevalid_erorrs ? <p style={{ color: "red" }}>Please provide Valid Image Url</p> : <></>}

      <p>Make sure url ends in “.jpeg”, “.jpg” or “.png”</p>
      {/* {props.errors.image ? <p> This is required field</p> : <></>} */}
     </div> 
   
    </>
  );
};

export default Step1;
