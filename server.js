require('dotenv').config(); 
const express = require("express");
const { verify_token } = require("./middleware/verify_token");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/tenant/user', require('./route/tenant_user'))
app.use('/user', require('./route/user'))
app.use('/tenant', require('./route/tenant'))
app.use('/tenant/employee', require('./route/tenant_employee'))
app.use('/tenant/attendance', require('./route/tenant_attendance'))
app.use('/tenant/salary', require('./route/tenant_salary'))

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on ${process.env.SERVER_PORT}`));