import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PortfolioGrid from './components/PortfolioGrid';
import AdminPanel from './components/AdminPanel';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [profile, setProfile] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(`${API}/api/portfolio`);
      const data = await res.json();
      setProfile(data);
    } catch (e) {
      // Fallback seed if backend not available
      setProfile({ username: 'clockwork', role: 'Roblox UI Designer', projects: [], accent: '#ffffff', monochrome: true });
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <PortfolioGrid items={profile?.projects || []} />

      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight">About</h3>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            I design clean, performant Roblox interfaces that feel effortless to use. From in-game shops and HUDs to
            onboarding flows and settings, I bring motion and clarity together for a premium feel.
          </p>
        </div>
      </section>

      <AdminPanel onSaved={setProfile} />

      <footer id="contact" className="py-12 border-t border-black/5">
        <div className="container mx-auto px-6 text-sm text-neutral-600">
          © {new Date().getFullYear()} clockwork — Designed with care.
        </div>
      </footer>
    </div>
  );
}

export default App
