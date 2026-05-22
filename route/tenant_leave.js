const express = require('express');
const { verify_token } = require('../middleware/verify_token');

const {
    leave_list,
    leave_detail,
    leave_create,
    leave_update,
    leave_delete
} = require('../controller/tenant_empolyee/tenant_leave');

const router = express.Router();

router.get('/requests', verify_token(), leave_list);
router.post('/requests', verify_token(), leave_create);
router.get('/requests/:id', verify_token(), leave_detail);
router.patch('/requests/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), leave_update);
router.delete('/requests/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), leave_delete);

module.exports = router;
