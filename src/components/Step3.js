import React, { useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }
  let l= Math.pow(1 + (props.values.discount), props.values.maturityTime);
  console.log("Deno --- ",l);
  let facevalue = 1
  let initial_price = (facevalue/l).toString();
  let totalSupply = props.values.amountToRaise/initial_price;
  props.handleChange('totalsuppliesss')
  // useEffect(() => {
  //   let l= Math.pow(1 + (props.values.discount), props.values.maturityTime);
  //   console.log("Deno --- ",l);
  //   let facevalue = 1
  //   let initial_price = (facevalue/l).toString();
  //   let totalSupply = props.values.amountToRaise/initial_price;
  //   props.handleChange('totalsuppliesss')
  // }, [props.currentStep]);

  return (
    <>
    <div className="my-card">
      <p><h4 className="text-start pl-1">Project Details</h4><br/>
      Give people buying your debt confidence that you can repay it. FIll out all details</p>
      <Label for="launch_dsc">Description of launch</Label>
      <input type="text"
      value={props.values.descriptionOfLaunch}
      onChange={props.handleChange('descriptionOfLaunch')}
      className="mb-3 w-100 form-box form-control" placeholder="Explain why you’re raising debt, what this will fund"/>
      {props.values.descriptionOfLaunch_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}

      <Label for="revenues">Revenues</Label>
      <input type="text" 
      value={props.values.Revenues}
      onChange={props.handleChange('Revenues')}
      className="mb-3 w-100 form-box form-control" placeholder="Link to website displaying revenues or on chain data"/>
      {props.values.Revenues_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}

      <Label for="display_link">Learn more link</Label>
      <input type="text"
      value={props.values.LearnMoreLink}
      onChange={props.handleChange('LearnMoreLink')}
      className="mb-3 w-100 form-box form-control" placeholder="Link to get more information about your project"/>
      {props.values.LearnMoreLink_erorrs ? <p style={{ color: "red" }}> This is required field</p> : <></>}

          
        </div> 
        </>
  );
};

export default Step3;