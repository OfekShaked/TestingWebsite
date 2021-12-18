const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/test_controller");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger")

// Get tests from json
router.get(
  "/all/:topicId",
  asyncHandler(async (req, res) => {
     try{
    const data = await controller.get_all_tests(req.params.topicId);
    if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"No tests"});
      }
     }catch(err){
         res.status(400).send(err);
         logger.error(err);
     }
  })
);

// Get test by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_test_by_id_with_correct(req.params.id);
  if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"No test"});
      }
    }catch(err){
      res.status(400).send(err);
      logger.error(err);
    }
  })
);

// Get test names by topic id
router.get(
  "/names/:topicid",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_all_test_names(req.params.topicid);
  if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"No test"});
      }
    }catch(err){
      res.status(400).send(err);
      logger.error(err);
    }
  })
);

//get test by id without is correct
router.get(
  "/tested/:id",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_test_by_id_without_correct(req.params.id);
  if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"No test"});
      }
    }catch(err){
      res.status(400).send(err);
      logger.error(err);
    }
  })
);

// Add test to the list in json
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.add_test(req.body);
      if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"Cant add test"});
      }
    } catch (err) {
      res.status(400).send(err);
      logger.error(err);
    }
  })
);
//update test
router.put(
    "/",
    asyncHandler(async (req, res) => {
      try {
        const data = await controller.update_test(req.body);
        if(data!==null){
          res.status(200).send(data);}
          else{
            res.status(400).send({error:"Cant update test"});
          }
      } catch (err) {
        res.status(400).send(err);
        logger.error(err);
      }
    })
  );

module.exports = router;
