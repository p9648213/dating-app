import { Router, Route, Routes } from "@solidjs/router";
import { Toaster } from "solid-toast";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TestError from "./pages/TestError";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/errors" element={<TestError />}></Route>
        <Route path="/server-error" element={<ServerError />}></Route>
        <Route path="**" element={<NotFound />}></Route>
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
