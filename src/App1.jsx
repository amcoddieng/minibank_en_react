// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import App from"./App"
function App1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/agent/dashboard" element={<App/>} />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App1;
