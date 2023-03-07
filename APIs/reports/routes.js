
const express = require('express');
const routes = express.Router();
const cors = require('cors');
//A1

//Gets
routes.get('/a1', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1saved', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1 WHERE complete = "saved"', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
            })
        })
    })

routes.get('/a1researcher/:researcher', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1 WHERE researcher = ?', [req.params.researcher],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1name/:name', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1 WHERE name = ?', [req.params.name],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1title/:title', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1 WHERE title = ?', [req.params.title],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1thesisStatus/:thesis_status', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1 WHERE thesis_Status = ?', [req.params.thesis_status],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1academicDegree/:academic_degree', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE academic_degree = ?', [req.params.academic_degree],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1save/:borrador', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE borrador = ?', [req.params.borrador],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a1/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a1 WHERE id = ?', [req.params.id],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

//Post
routes.post('/a1/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO a1 set ?', [req.body], (err)=>{
            if(err) return res.send(err)
        })
    })
})

//Delete
routes.delete('/a1/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM a1 WHERE id = ?', [req.params.id], (err)=>{
            if(err) return res.send(err)  
        })
    })
})

//Put
routes.put('/a1/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE a1 set ? WHERE id = ?', [req.body, req.params.id], (err)=>{
            if(err) return res.send(err)  
        })
    })
})





//A8

//Gets
routes.get('/a8', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a8saved', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE borrador = "saved"', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
            })
        })
    })
routes.get('/a8researcher/:researcher', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE researcher = ?', [req.params.researcher],(err, rows)=>{
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
routes.get('/a8title/:title', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE title = ?', [req.params.title],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a8thesisStatus/:thesis_status', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE thesis_Status = ?', [req.params.thesis_status],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/a8academicDegree/:academic_degree', (req, res)=>{
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
routes.get('/a8/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM a8 WHERE id = ?', [req.params.id],(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

//Post
routes.post('/a8/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO a8 set ?', [req.body], (err)=>{
            if(err) return res.send(err)
        })
    })
})

//Delete
routes.delete('/a8/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM a8 WHERE id = ?', [req.params.id], (err)=>{
            if(err) return res.send(err)  
        })
    })
})

//Put
routes.put('/a8/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE a8 set ? WHERE id = ?', [req.body, req.params.id], (err)=>{
            if(err) return res.send(err)  
        })
    })
})



//Investigadores

//Get
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

//Post
routes.post('/investigadores', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO investigadores set ?', [req.body], (err, rows)=>{
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

routes.put('/investigadores/changepass/:name', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE investigadores set ? WHERE name = ?', [req.body, req.params.name], (err, rows)=>{
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



module.exports = routes
