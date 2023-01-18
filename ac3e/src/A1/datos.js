import React from "react";


const datos = (c) =>{
    if(c===0){
        localStorage.setItem("data",JSON.stringify([{"autor" : ["Rojas,A"],
        "title" : "Novel Insights on the Stabilizing Solution to the Continuous Time Algebraic Riccati Equation",
        "journal" : "International Journal of Control",
        "doi" : "10.1080/00207179.2014.924630" ,
        "volume" : 87 ,
        "firstPage" : 2412 ,
        "lastPage" : 2419 ,
        "yearPublished": 2014 ,
        "comment" : "",
        "uploadDay" : "17-01-2023",
        "complete" : true} , 
                        
        {"autor" : ["Rojas,A", "Lotero, F"],
        "title" : "Signal-to-Noise Ratio Limited Output Feedback Control Subject to Channel Input Quantization",
        "journal" : "IEEE Transactions On Automatic Control",
        "doi" : "10.1109/TAC.2014.2327452" ,
        "volume" : 60 ,
        "firstPage" : 475 ,
        "lastPage" : 479 ,
        "yearPublished": 2015 ,
        "comment" : "",
        "uploadDay" : "14-01-2023" ,
        "complete" : true},

        {"autor" : ["Campos-Delgado, D", "Rojas, A" , "Luna-Rivera, J" , "Gutierrez, C"],
        "title" : "Event-triggered feedback for power allocation in wireless networks",
        "journal" : "IET Control Theory & Applications",
        "doi" : "10.1049/iet-cta.2014.1266" ,
        "volume" : 9,
        "firstPage" : 2066 ,
        "lastPage" : 2074 ,
        "yearPublished": 2020 ,
        "comment" : "",
        "uploadDay" : "10-01-2023" ,
        "complete" : true}]));
    }
}

export default datos;