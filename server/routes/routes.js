const express = require('express');

const routes = express.Router()

routes.get('/', (req,res) => {
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM reportes', (err,rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req,res) => {
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO a8 set ?',[req.body] ,(err,rows) => {
            if(err) return res.send(err)

            res.send('dato insertado');
        })
    })
})

module.exports = routes;