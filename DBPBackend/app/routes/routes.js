module.exports = app => {
  const bond = require("../controllers/controller.js");
  const contract = require("../controllers/deployContract.js");


  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", bond.create);

  // Retrieve all Tutorials
  router.get("/", bond.findAll);

   // Retrieve a single Tutorial with id
   router.get("/:id", bond.findOne);

   // Update a Tutorial with id
   router.put("/:id", bond.update);
 
   // Delete a Tutorial with id
   router.delete("/:id", bond.delete);
 
   // Create a new Tutorial
   router.delete("/", bond.deleteAll);
   
  // Deploy Contract
  router.post("/deploy_token", contract.deployContract);


  app.use("/api/bond", router);
};
