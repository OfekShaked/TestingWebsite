const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/test_report_controller");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger")

// Get test report from by id
router.get(
  "/:test_id",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_test_report_by_id(req.params.test_id);
    res.status(200).send(data);
    }catch(err){
      res.status(400).send(err);
      logger.error(err);
    }
  })
);

// Get test report from by id and date range
router.get(
  "/:test_id/:start_date/:end_date",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_test_report_by_date(req.params.test_id,req.params.start_date,req.params.end_date);
    res.status(200).send(data);
    }catch(err){
      res.status(400).send(err);
      logger.error(err);
    }
  })
);


module.exports = router;
