import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Music from '@/pages/Music';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

export default function App() {
  return (
    <>
      <Helmet 
        defaultTitle="Chris Productions | Official Music" 
        titleTemplate="%s | Chris Productions"
      >
        <meta name="description" content="Official website of Chris Productions. Listen to the latest tracks, see tour dates, and buy merch." />
      </Helmet>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<div className="text-white p-10">404: Page Not Found</div>} />
      </Routes>
    </>
  );
}