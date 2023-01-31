const express = require('express')

const app = express()

var Routs = require('./routes/routes')

app.use(Routs)

app.listen(3000, () => {
    console.log('server running on', 'http://localhost:' + 3000)
})