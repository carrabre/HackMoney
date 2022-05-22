import React from "react";
import { 
  // FormGroup, Label, Input,
   Button } from "reactstrap";
import emot from "../assets/images/emot.png";
import { TwitterShareButton } from 'react-twitter-embed';

const Step5 = props => {
  console.log(props, 'myprops')
  if (props.currentStep !==5) {
    return null;
  }

  const opentwitter = () => {
    let src = `http://twitter.com/share?text=Say hello to our new bond b${props.values.tokenname} token  to raise amount of $ ${props.values.amountToRaise}. \nTo Know more:- &url=https://www.tabnine.com/code/javascript/classes/react-share/TwitterShareButton&hashtags=BTc,ETH,nft,nftcreator,nftgallery,nftinvert,nftproject,nfttoken,nfttokengallery`;
    window.open(src, "_blank");
   }

  return (
    <>
      <img src={emot} alt="Happy Emoticons" className="emot-img"/>
      <div className="Centerstep5">
      <Button color="primary step5-btn" onClick={opentwitter}>Share Launch on Twitter</Button>
      </div>
    </>
  );
};

export default Step5;
