const express = require('express');
const { verify_token } = require('../middleware/verify_token');
const {
    task_list,
    task_create,
    task_update,
    task_delete
} = require('../controller/tenant_empolyee/tenant_task');

const router = express.Router();

router.get('/', verify_token(), task_list);
router.post('/', verify_token(), task_create);
router.patch('/:id', verify_token(), task_update);
router.delete('/:id', verify_token(), task_delete);

module.exports = router;
