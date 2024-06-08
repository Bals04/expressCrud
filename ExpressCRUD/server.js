const express = require("express");
const dotenv = require('dotenv');
const path = require('path');//IMPORT THIS TO USE THE "PATH" module
const app = express();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));//NEEDED TO USE THE SCRIPTS IN THE SCRIPTS FOLDER
app.use(express.static(path.join(__dirname, 'views')));//NEEDED TO CATER OR RENDER .HTML FILES


const userRouter = require('./routes/users');
app.use('/users', userRouter);

const server_port = process.env.SERVER_PORT || 3000;
app.listen(server_port, () => {
    console.log("APP RUNNING ON PORT " + server_port);
});
