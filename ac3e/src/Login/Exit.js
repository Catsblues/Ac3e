import React from "react";

const Exit = () => {
    localStorage.clear();
    window.location.href = "/";
}

export default Exit;