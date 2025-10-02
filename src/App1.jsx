// App1.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";
import AutoLogout from "./components/hook/autoDeconnecte";

function App1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/agent/dashboard"
          element={
            <PrivateRoute>
              <AutoLogout>
                <App />
              </AutoLogout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App1;
