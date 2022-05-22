module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      tokenname:String,
      tokensymbol:String,
      mainToken:String,
      tokenImage:String,
      amountToRaise:String,
      collateralPercent:String,
      durationOfSaleStart:String,
      durationOfSaleEnd:String,
      collateralCurrency:String,
      discount:String,
      maturityTime:String,
      descriptionOfLaunch:String,
      Revenues:String,
      LearnMoreLink:String,
      contractAddress:String,
      contractAbi:Object
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const bondModel = mongoose.model("Bond_Col", schema);
  return bondModel;
};
