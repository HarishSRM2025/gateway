const express = require('express');
const { verify_token } = require('../middleware/verify_token');

const {
    employee_create,
    employee_edit,
    employee_list,
    employee_delete,
    employee_by_id
} = require('../controller/tenant_empolyee/tenant_employee');

const router = express.Router();

router.post('/create', verify_token(['TENANT_ADMIN', 'MANAGER']), employee_create);
router.get('/list', verify_token(), employee_list);
router.put('/edit/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), employee_edit);
router.delete('/delete/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), employee_delete);
router.get('/:id', verify_token(), employee_by_id);

module.exports = router;