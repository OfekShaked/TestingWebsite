const express = require("express");
const router = express.Router();
const controller = require("../BLL/controllers/test_controller");
const asyncHandler = require("../helpers/asyncHandler");

// Get tests from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
     try{
    const data = await controller.get_all_tests();
    if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"No tests"});
      }
     }catch(err){
         res.status(400).send(err);
     }
  })
);

// Get test by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try{
    const data = await controller.get_test_by_id(req.params.id);
  if(data!==null){
      res.status(200).send(data);}
      else{
        res.status(400).send({error:"No tests"});
      }
    }catch(err){
      res.status(400).send(err);
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
        res.status(400).send({error:"No tests"});
      }
    } catch (err) {
      res.status(400).send(err);
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
            res.status(400).send({error:"No tests"});
          }
      } catch (err) {
        res.status(400).send(err);
      }
    })
  );

module.exports = router;
