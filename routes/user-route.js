var express = require('express');
var router = express.Router();
const { upload } = require("../utils/saveImg");

const path = require('path');
var auth_controller = require('../controllers/auth-controller');
//const requireAuth = require('../middleware/requireAuth');
/* const requireLogin = require('../middleware/requireLogin');
*/


/** signin */
router.post('/api/signup', auth_controller.add_user)
router.post('/api/login', auth_controller.signin)
router.post("/upload",upload.single('file'), auth_controller.uploadImage);

module.exports = router;