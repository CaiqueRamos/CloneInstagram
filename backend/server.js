const bodyParser = require('body-parser')
const router = require('./router')
const express =  require('express')

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
port = 3030;

app.use(router)

app.listen(port, ()=>{
    console.log("Funcionando corretamente na porta ", port)
});