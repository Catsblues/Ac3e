const express = require("express");
const app = express ();
const PORT = 25;

app.get("/",(req, res) => {
    res.send("server");
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});