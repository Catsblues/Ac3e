
const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors');

const routes = require('./routes')

const app = express();

app.use(cors({
    origin : 'http://20.151.235.246'
}));

app.set('port', 9000)
const dbOptions = {
    host: '54.162.2.109',
    port: 3306,
    user: 'remoteUser',
    password: 'Admin@0301',
    database: 'reportes'
}


app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

app.use('/api', routes)


app.listen(app.get('port'), '0.0.0.0', ()=>{
    console.log('server running on port', app.get('port'))
})
