const db = require("../models");
const bondModel = db.bondModels;

// Create and Save a new bondModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body.mainToken) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a bondModel
  // res.send(req.body)
  const bond = new bondModel({
          tokenname:req.body.tokenname,
          tokensymbol:req.body.tokensymbol,
          mainToken: req.body.mainToken,
          tokenImage: req.body.tokenImage,
          amountToRaise: req.body.amountToRaise,
          collateralPercent: req.body.collateralPercent,
          durationOfSaleStart: req.body.durationOfSaleStart,
          durationOfSaleEnd: req.body.durationOfSaleEnd,
          collateralCurrency: req.body.collateralCurrency,
          discount: req.body.discount,
          maturityTime: req.body.maturityTime,
          descriptionOfLaunch: req.body.descriptionOfLaunch,
          Revenues: req.body.Revenues,
          LearnMoreLink: req.body.LearnMoreLink,
          contractAddress: req.body.contractAddress,
          contractAbi: req.body.contractAbi

  });

  console.log("bond",bond)
  // Save bondModel in the database
  bond
    .save(bond)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the bondModel."
      });
    });
};

// Retrieve all bondModels from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  bondModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bonds."
      });
    });
};

// Find a single bondModel with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  bondModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found bondModel with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving bondModel with id=" + id });
    });
};

// Update a bondModel by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  console.log("id",id)
  bondModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update bondModel with id=${id}. Maybe bondModel was not found!`
        });
      } else res.send({ message: "bondModel was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating bondModel with id=" + id
      });
    });
};

// Delete a bondModel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  bondModel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete bondModel with id=${id}. Maybe bondModel was not found!`
        });
      } else {
        res.send({
          message: "bondModel was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete bondModel with id=" + id
      });
    });
};

// Delete all bondModels from the database.
exports.deleteAll = (req, res) => {
  bondModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} bondModels were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bonds."
      });
    });
};

// Find all published bondModels
// exports.findAllPublished = (req, res) => {
//   bondModel.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving bonds."
//       });
//     });
// };
