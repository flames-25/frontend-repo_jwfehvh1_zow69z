import { motion } from 'framer-motion';

export default function PortfolioGrid({ items = [] }) {
  const card = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="work" className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black">Featured Work</h2>
          <p className="text-neutral-600 mt-2">Interfaces crafted for clarity, speed and delight.</p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((p, idx) => (
            <motion.a
              variants={card}
              key={idx}
              href={p.link || '#'}
              target={p.link ? '_blank' : '_self'}
              className="group relative rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm hover:shadow-xl transition-shadow"
            >
              {p.cover ? (
                <img src={p.cover} alt={p.title} className="w-full h-56 object-cover" />
              ) : (
                <div className="w-full h-56 bg-neutral-100" />
              )}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">{p.title}</h3>
                  <span className="text-xs uppercase tracking-wider text-neutral-500">{(p.tags||[])[0] || 'UI'}</span>
                </div>
                {p.subtitle && <p className="text-neutral-600 mt-1">{p.subtitle}</p>}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
