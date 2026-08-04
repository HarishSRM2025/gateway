const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), override: true });
process.env.AUTH_API ||= "https://auth-service-bay-ten.vercel.app";
process.env.EMP_API ||= "https://employee-info-dsey.onrender.com";
process.env.SALARY_API ||= "https://employee-salary-z0ak.onrender.com";
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
app.use('/tenant/leave', require('./route/tenant_leave'))
app.use('/tenant/salary', require('./route/tenant_salary'))
app.use('/tenant/activities', require('./route/tenant_activity'))

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "gateway",
    authApiConfigured: Boolean(process.env.AUTH_API),
  });
});

if (require.main === module) {
  const port = process.env.PORT || process.env.SERVER_PORT || 4000;
  app.listen(port, '0.0.0.0', () => console.log(`Server running on ${port}`));
}

module.exports = app;
