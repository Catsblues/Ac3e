const express = require("express");
const app = express ();
const PORT = 111;

app.get("/",(req, res) => {
    res.send("server");
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});