const express = require('express');
const { verify_token } = require('../middleware/verify_token');
const { tenant_stats } = require('../controller/tenant_empolyee/tenant_stats');

const router = express.Router();

router.get('/', verify_token(), tenant_stats);

module.exports = router;
