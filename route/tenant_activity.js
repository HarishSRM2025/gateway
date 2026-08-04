const express = require('express');
const { verify_token } = require('../middleware/verify_token');
const { activity_logs } = require('../controller/tenant_empolyee/tenant_activity');

const router = express.Router();

router.get('/logs', verify_token(), activity_logs);

module.exports = router;
