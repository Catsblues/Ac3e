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


routes.get('/a8name/:name', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8 WHERE name = ?', [req.params.name],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/a8status/:thesis_status', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8 WHERE thesis_Status = ?', [req.params.thesis_status],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/a8title/:title', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8 WHERE title = ?', [req.params.title],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/a8degree/:academic_degree', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8 WHERE academic_degree = ?', [req.params.academic_degree],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/a8save/:borrador', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM a8 WHERE borrador = ?', [req.params.borrador],(err, rows)=>{
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


routes.get('/name/:name', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores WHERE name = ?', [req.params.name],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/type/:type', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores WHERE type = ?', [req.params.type],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/mail/:mail', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores WHERE mail = ?', [req.params.mail],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/line/:line', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores WHERE line = ?', [req.params.line],(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/institution/:institution', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM investigadores WHERE institution = ?', [req.params.institution],(err, rows)=>{
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