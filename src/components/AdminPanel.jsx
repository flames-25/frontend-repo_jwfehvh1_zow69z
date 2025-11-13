import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AdminPanel({ onSaved }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/api/portfolio`).then(r => r.json()).then(setData).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, []);

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  const save = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/portfolio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          role: data.role,
          avatar_url: data.avatar_url,
          bio: data.bio,
          accent: data.accent,
          monochrome: data.monochrome,
          socials: data.socials,
          projects: data.projects,
        })
      });
      const out = await res.json();
      setData(out);
      onSaved?.(out);
    } catch (e) {
      setError('Save failed');
    } finally {
      setLoading(false);
    }
  };

  const addProject = () => update('projects', [...(data.projects||[]), { title: 'New Project', subtitle: 'Subtitle', description: '', cover: '', tags: ['UI'] }]);
  const removeProject = (idx) => update('projects', data.projects.filter((_, i) => i !== idx));

  if (loading) return <section id="admin" className="py-16"><div className="container mx-auto px-6">Loading...</div></section>;
  if (error) return <section id="admin" className="py-16"><div className="container mx-auto px-6 text-red-500">{error}</div></section>;
  if (!data) return null;

  return (
    <section id="admin" className="py-24 border-t border-black/5 bg-white">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-bold">Admin Controls</h3>
        <p className="text-neutral-600 mb-6">Make live edits to your portfolio.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-neutral-600">Username</label>
              <input value={data.username || ''} onChange={e => update('username', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Role</label>
              <input value={data.role || ''} onChange={e => update('role', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Avatar URL</label>
              <input value={data.avatar_url || ''} onChange={e => update('avatar_url', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Accent Color</label>
              <input value={data.accent || ''} onChange={e => update('accent', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div className="flex items-center gap-3">
              <input id="mono" type="checkbox" checked={!!data.monochrome} onChange={e => update('monochrome', e.target.checked)} />
              <label htmlFor="mono" className="text-sm">Monochrome (Black/White + Accent)</label>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Bio</label>
              <textarea value={data.bio || ''} onChange={e => update('bio', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 h-24" />
            </div>
            <button onClick={save} className="inline-flex items-center px-4 py-2 rounded-md bg-black text-white">Save Changes</button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Projects</h4>
              <button onClick={addProject} className="px-3 py-1.5 rounded-md border">Add</button>
            </div>
            <div className="space-y-4">
              {(data.projects||[]).map((p, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <input value={p.title} onChange={e => {
                      const copy = [...data.projects];
                      copy[idx] = { ...copy[idx], title: e.target.value };
                      update('projects', copy);
                    }} className="font-semibold text-black" />
                    <button onClick={() => removeProject(idx)} className="text-red-500">Remove</button>
                  </div>
                  <input placeholder="Subtitle" value={p.subtitle||''} onChange={e => {
                    const copy = [...data.projects];
                    copy[idx] = { ...copy[idx], subtitle: e.target.value };
                    update('projects', copy);
                  }} className="mt-2 w-full border rounded-md px-3 py-1.5" />
                  <input placeholder="Cover URL" value={p.cover||''} onChange={e => {
                    const copy = [...data.projects];
                    copy[idx] = { ...copy[idx], cover: e.target.value };
                    update('projects', copy);
                  }} className="mt-2 w-full border rounded-md px-3 py-1.5" />
                  <input placeholder="Tags (comma)" value={(p.tags||[]).join(', ')} onChange={e => {
                    const copy = [...data.projects];
                    copy[idx] = { ...copy[idx], tags: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) };
                    update('projects', copy);
                  }} className="mt-2 w-full border rounded-md px-3 py-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
