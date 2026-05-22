const express = require('express');
const { verify_token } = require('../middleware/verify_token');

const {
    salary_calculate,
    salary_list,
    salary_pay,
    salary_cancel,
    salary_delete
} = require('../controller/tenant_salary/tenant_salary');

const router = express.Router();

router.post('/calculate', verify_token(['TENANT_ADMIN', 'MANAGER']), salary_calculate);
router.get('/list', verify_token(), salary_list);
router.put('/pay/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), salary_pay);
router.put('/cancel/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), salary_cancel);
router.delete('/delete/:id', verify_token(['TENANT_ADMIN', 'MANAGER']), salary_delete);

module.exports = router;
