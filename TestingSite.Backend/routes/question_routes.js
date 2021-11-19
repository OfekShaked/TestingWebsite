const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/question_controller");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/questions",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_all_questions();
    res.status(200).send(data);
    }catch(err){
      res.status(400).send(err);
    }
  })
);

// Add question 
router.post(
  "/questions",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.add_question(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

router.put(
  "/questions",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.update_question(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

module.exports = router;
