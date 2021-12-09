const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/test_taken_controller");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger")


// Add test to the list in json
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.add_test_taken(req.body);
      if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"Cant add test taken"});
      }
    } catch (err) {
      res.status(400).send(err);
      logger.error(err);
    }
  })
);

module.exports = router;
