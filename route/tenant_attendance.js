const express = require('express');
const { verify_token } = require('../middleware/verify_token');
const {
    attendance_list,
    attendance_detail,
    attendance_checkin,
    attendance_checkout
} = require('../controller/tenant_empolyee/tenant_attendance');

const router = express.Router();

router.get('/', verify_token(), attendance_list);
router.get('/:id', verify_token(), attendance_detail);
router.post('/checkin', verify_token(), attendance_checkin);
router.post('/checkout', verify_token(), attendance_checkout);

module.exports = router;
