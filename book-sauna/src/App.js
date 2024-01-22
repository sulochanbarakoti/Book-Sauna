import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import Main from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/home" element={<Main></Main>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
