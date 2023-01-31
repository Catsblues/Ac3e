const express = require('express');

const app = express();

const PORT = 8000;

app.get("/hola",(req,res) => {
    res.send("server");
});

app.listen(PORT, () => {
    console.log('server listening');
});