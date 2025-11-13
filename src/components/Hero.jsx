import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ profile }) {
  const accent = profile?.accent || '#ffffff';
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/M4yE7MTeWshitQbr/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/40 to-white/90" />

      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-black"
        >
          {profile?.username || 'clockwork'}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 text-lg md:text-2xl text-neutral-700 max-w-2xl"
        >
          {profile?.role || 'Roblox UI Designer'}
        </motion.p>
        {profile?.bio && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-4 text-neutral-600 max-w-2xl"
          >
            {profile.bio}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-8 flex gap-3"
        >
          <a href="#work" className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 bg-black text-white hover:opacity-90 transition">
            View Work
          </a>
          <span className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-full border border-black/10" style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}>
            {accent}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
