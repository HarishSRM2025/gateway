const express = require('express')
const { verify_token } = require('../middleware/verify_token')
const { signup, signin, changePassword, getUsersByTenant, updateUserRole } = require('../controller/tenant_user/tenant_user')
const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/change-password', changePassword)
router.get('/tenant/:tenant_id', getUsersByTenant)
router.put('/role/:id', updateUserRole)

module.exports = router;
