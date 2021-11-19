const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/test_controller");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/tests",
  asyncHandler(async (req, res) => {
     try{
    const data = await controller.get_all_tests();
    res.status(200).send(data);
     }catch(err){
         res.status(400).send(err);
     }
  })
);

// Add question to the list in json
router.post(
  "/tests",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.add_test(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);
router.put(
    "/tests",
    asyncHandler(async (req, res) => {
      try {
        const data = await controller.update_test(req.body);
        res.status(200).send(data);
      } catch (err) {
        res.status(400).send(err);
      }
    })
  );

module.exports = router;
