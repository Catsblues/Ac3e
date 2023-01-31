const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes/routes')

const app = express()
app.set('port', process.env.PORT || 9000)

const dbOptions = {
    host: '3.22.99.91' ,
    port:3306,
    user: 'remoteUser',
    password: 'Admin@0301',
    database: 'investigadores'
}
app.use(myconn(mysql, dbOptions,'single'))


app.get('/',(req,res)=>{
    res.send('hola');
})
app.use('/api',routes)

app.listen(9000, () => {
    console.log('server running on', app.get('port'))
})