


const getForDOI = async() => {
    var va;
    const DOI = '10.1080/00207179.2014.924630';
    await fetch('http://localhost:5000/wos?q='+ DOI)
    .then(res => res.json())
    .then(res => console.log(res))}

getForDOI();