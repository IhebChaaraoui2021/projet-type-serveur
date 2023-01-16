var express = require('express');
var router = express.Router();

var auth_controller = require('../controllers/auth-controller');
//const requireAuth = require('../middleware/requireAuth');
/* const requireLogin = require('../middleware/requireLogin');
*/
/** signin */
router.post('/api/signup', auth_controller.add_user)
router.post('/api/login', auth_controller.signin)
router.post('/api/upload', auth_controller.signin)
module.exports = router;