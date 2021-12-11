const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/user_report_controller");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger")

// Get test report from by email
router.get(
  "/:email",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_user_tests_by_email(req.params.email);
    res.status(200).send(data);
    }catch(err){
      res.status(400).send(err);
      logger.error(err);
    }
  })
);



module.exports = router;
