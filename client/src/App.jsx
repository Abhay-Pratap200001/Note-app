import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { api } from "./api"; // Make sure to import api

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // checking user loggin 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/profile");
        setCurrentUser(res.data);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster />

      <div className="min-h-screen bg-slate-300">
        <Routes>
          {/* signup Page */}
          <Route path="/signup" element={ currentUser? (<Navigate to="/dashboard" replace/>) : (<Signup setCurrentUser={setCurrentUser}/>)}/>

          {/* login Page */}
          <Route path="/signin" element={currentUser ? (<Navigate to="/dashboard" replace />) : (<Signin setCurrentUser={setCurrentUser} />)}/>

          {/* dashboard (Protected) */}
          <Route path="/dashboard" element={ currentUser ? ( <Dashboard setCurrentUser={setCurrentUser} />) : (<Navigate to="/signin" replace />)}/>

          {/* default Route */}
          <Route path="*" element={ <Navigate to={currentUser ? "/dashboard" : "/signin"} replace />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;