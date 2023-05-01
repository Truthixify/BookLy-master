import Footer from "./components/footer/Footer";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from "./pages/profile/Profile";
import BookForm from "./pages/bookForm/BookForm";
import Settings from "./pages/settings/Settings";
import BookPage from "./pages/bookPage/BookPage";
import NotFound from "./pages/notFound/NotFound";


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/user/:id/publish" element={<BookForm />} />
          <Route path="book/:id" element={<BookPage />} />
          <Route path="book/:id" element={<BookPage />} />
          <Route path="/user/:id/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
