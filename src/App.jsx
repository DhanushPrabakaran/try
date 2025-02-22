import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/header";
import Upload from "./Pages/Upload";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/upload" element={<Upload/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
