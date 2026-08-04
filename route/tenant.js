const express = require('express');
const { verify_token } = require('../middleware/verify_token');
const { tenantCreation, getAllTenants, deleteTenant, getTenantBySlug, updateTenant } = require('../controller/tenant/tenant');
const router = express.Router();

router.post('/create', verify_token(), tenantCreation)
router.get('/get/all', verify_token(), getAllTenants)
router.delete('/delete/:id', verify_token(), deleteTenant)
router.get('/get/:slug', getTenantBySlug);
router.put('/update/:id', verify_token(), updateTenant);

module.exports = router;
