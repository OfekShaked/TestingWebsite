const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/topic_controller");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger")

router.get(
    "/",
    asyncHandler(async (req, res) => {
    try{
      const data = await controller.get_all_topics();
      res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
        logger.error(err);
    }
    })
  );

module.exports = router;
