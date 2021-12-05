const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/question_controller");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_all_questions();
    res.status(200).send(data);
    }catch(err){
      res.status(400).send(err);
    }
  })
);

// Get question by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_question_by_id(req.params.id);
    res.status(200).send(data);
    }catch(err){
      res.status(400).send(err);
    }
  })
);

// Add question 
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.add_question(req.body);
      if(data!==null){
      res.status(200).send(data);
      }else{
        res.status(400).send({error:"Post format is missing/incorrect"})
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  })
);

//update a question
router.put(
  "/",
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
