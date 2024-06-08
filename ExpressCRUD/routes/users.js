const express = require("express");
const router = express.Router();
const path = require('path');
const controller = require('../controllers/userController');
const { getNotes, getNotebyID, create, deleteByID, updateByID } = require('../model/database');


router.get("/", controller.get);

router.get("/load", controller.load);

router.get("/new", controller.new)

router.get("/update", controller.update);

router.post('/', controller.post);

router.delete('/:id', controller.delete);

router.put('/:id', controller.put);

module.exports = router;
