import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Causes from './pages/Causes';
import Events from './pages/Events';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Volunteer from './pages/Volunteer';
import EventDetails from './pages/EventDetails';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ScrollToTop from './components/ScrollToTop';
import './styles/index.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/causes" element={<Causes />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
          <LanguageSwitcher />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
