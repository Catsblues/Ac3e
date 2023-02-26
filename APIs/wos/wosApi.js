const express = require('express');

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/", (req, res) => {
  res.send("WosApi is online!");
});

app.get('/wos', async (req, res) => {
  const apiKey = 'cc369e7fe729a62bbb01048470df4ed604027c45';
  const query = req.query.q;
  const url = `https://wos-api.clarivate.com/api/woslite/?databaseId=WOK&usrQuery=DO%3D%28${encodeURIComponent(query)}%29&count=1&firstRecord=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-ApiKey': apiKey,
      },
    });
    var data = await response.json();
  
    let numbers = data.Data[0].Source.Pages[0];
    let spl = numbers.split('-');

    console.log(data);

    console.log(data.Data[0].Keyword);
    console.log(data.Data[0].Other);

    let dataReport = {

      Title: data.Data[0].Title.Title[0],
      Authors: data.Data[0].Author.Authors,
      FirstPage: spl[0],
      LastPage: spl[1],
      Journal: data.Data[0].Source.SourceTitle[0],
      Volume: data.Data[0].Source.Volume[0],
      Year: data.Data[0].Source['Published.BiblioYear'][0],


    }
    res.json(dataReport);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

app.listen(port, '0.0.0.0',() => {
  console.log(`Server listening on port ${port}`);
});