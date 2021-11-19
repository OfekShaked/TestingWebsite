const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/organization_controller");
const asyncHandler = require("../helpers/asyncHandler");

router.get(
    "/organizations",
    asyncHandler(async (req, res) => {
    try{
      const data = await controller.get_all_organizations();
      res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
    })
  );

module.exports = router;
