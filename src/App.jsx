import { Routes, Route, NavLink } from 'react-router-dom';
import About from './pages/About';
import Projects from './pages/Projects';
import Random from './pages/Random';
import Connect from './pages/Connect';
import BlogPost from './pages/BlogPost';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Random', path: '/random' },
  { name: 'Connect', path: '/connect' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Rahul Hari</div>
      <div className="navbar__links">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/random" element={<Random />} />
          <Route path="/random/:slug" element={<BlogPost />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="*" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
