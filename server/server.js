const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes/routes')

const app = express()
app.set('port', process.env.PORT || 3000)

const dbOptions = {
    host: 'localhost' ,
    port:3306,
    user: 'root',
    password: 'Admin@0301',
    database: 'reportes'
}
app.use(myconn(mysql, dbOptions,'single'))


app.get('/',(req,res)=>{
    res.send('hola');
})
app.use('/api',routes)

app.listen(app.get('port'), () => {
    console.log('server running on', app.get('port'))
})