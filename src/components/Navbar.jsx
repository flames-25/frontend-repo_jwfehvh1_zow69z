import { Menu } from 'lucide-react';

export default function Navbar({ profile }) {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-black tracking-tight text-xl">{profile?.username || 'clockwork'}</div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <a href="#work" className="hover:text-black">Work</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#contact" className="hover:text-black">Contact</a>
          <a href="#admin" className="hover:text-black">Admin</a>
        </nav>
        <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-black/10">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
