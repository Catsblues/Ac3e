const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8 WHERE id = ?', [req.params.id],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})



routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO a8 set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM a8 WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE a8 set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('book updated!')
        })
    })
})

module.exports = routes