const express = require('express')
const routes = express.Router()
const multer = require('multer');
const path = require('path');

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../respaldos'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('respaldo')


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.get('/investigadores', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/investigadores', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO investigadores set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

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

            
        })
    })
})






routes.get('/investigadores/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores WHERE id = ?', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.put('/investigadores/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE investigadores set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            
        })
    })
})

routes.delete('/investigadores/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM investigadores WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            
        })
    })
})


routes.delete('/investigadores/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM investigadores WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            
        })
    })
})


routes.post('/respaldo/post', fileUpload,(req, res)=>{
    console.log(req.files)
})

module.exports = routes