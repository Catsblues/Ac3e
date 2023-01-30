const express = require("express");
const app = express ();
const PORT = 8000;

app.get("/",(req, res) => {
    res.send("server");
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});