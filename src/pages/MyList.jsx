import { useState } from 'react';
import TitleCard from '../components/TitleCard';
import { useApp } from '../context/AppContext';
import { STRINGS } from '../constants/strings';
import { Edit2, Trash2, Check, X } from 'lucide-react'; // Added icons

export default function MyList() {
  const { lists, createList, removeFromList, renameList, deleteList } = useApp();
  
  const [activeId, setActiveId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  
  // New states for editing/renaming
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const active = lists.getList(activeId) ?? lists.getDefaultList();
  const isDefaultList = active.id === 'default'; // Prevent deleting the main list

  const handleCreate = (e) => {
    e.preventDefault();
    const list = createList(newName);
    if (list) setActiveId(list.id);
    setNewName('');
    setCreating(false);
  };

  const handleRename = (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    if (renameList) {
      renameList(active.id, editName);
    }
    setEditing(false);
    setEditName('');
  };

  const handleDelete = () => {
    if (isDefaultList) return;
    if (window.confirm(`Are you sure you want to delete "${active.name}"?`)) {
      if (deleteList) {
        deleteList(active.id);
        setActiveId(null); // Go back to default list
      }
    }
  };

  return (
    <div className="px-4 pb-16 pt-28 sm:px-8 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        
        {/* Left Side: Title & Edit/Create Buttons */}
        <div className="flex flex-wrap items-end gap-4">
          {editing ? (
            <form onSubmit={handleRename} className="flex items-center gap-2">
              <input
                autoFocus
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="rounded-full bg-surface-alt px-4 py-2 text-3xl font-extrabold text-white focus:outline-2 focus:outline-accent"
              />
              <button type="submit" className="text-teal-pill hover:text-white p-2">
                <Check size={24} />
              </button>
              <button type="button" onClick={() => setEditing(false)} className="text-red-400 hover:text-white p-2">
                <X size={24} />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-extrabold sm:text-6xl">{active.name}</h1>
              
              {/* Rename Button */}
              <button
                onClick={() => { setEditing(true); setEditName(active.name); }}
                className="text-muted hover:text-white transition"
                title="Rename List"
              >
                <Edit2 size={20} />
              </button>

              {/* Delete Button (Only show if not default list) */}
              {!isDefaultList && (
                <button
                  onClick={handleDelete}
                  className="text-muted hover:text-red-500 transition"
                  title="Delete List"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          )}

          {!creating && !editing && (
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="pb-2 text-xl font-bold text-muted transition hover:text-accent"
            >
              {STRINGS.myList.newList}
            </button>
          )}
        </div>

        {/* Right Side: Dropdown to switch lists */}
        {lists.lists.length > 1 && (
          <select
            value={active.id}
            onChange={(e) => setActiveId(e.target.value)}
            aria-label={STRINGS.myList.choose}
            className="rounded-full bg-surface-alt px-4 py-2 font-bold text-white outline-none border border-white/10"
          >
            {lists.lists.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Create New List Form */}
      {creating && (
        <form onSubmit={handleCreate} className="mt-4 flex flex-wrap gap-2">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={STRINGS.myList.namePlaceholder}
            aria-label={STRINGS.myList.namePlaceholder}
            className="rounded-full bg-surface-alt px-4 py-2 text-white placeholder:text-muted focus:outline-2 focus:outline-accent"
          />
          <button type="submit" className="rounded-full bg-accent px-5 py-2 font-bold text-bg hover:bg-teal-pill transition">
            {STRINGS.myList.create}
          </button>
          <button
            type="button"
            onClick={() => { setCreating(false); setNewName(''); }}
            className="rounded-full bg-surface-alt px-5 py-2 font-bold hover:bg-white/10 transition"
          >
            {STRINGS.myList.cancel}
          </button>
        </form>
      )}

      <p className="mt-3 text-lg font-bold text-muted">{STRINGS.listCount(active.count())}</p>

      {active.count() === 0 ? (
        <p className="mt-12 text-lg font-bold text-muted">{STRINGS.myList.emptyText}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {active.items.map((t) => (
            <TitleCard key={t.id} title={t} onRemove={() => removeFromList(active.id, t.id)} />
          ))}
        </div>
      )}
    </div>
  );
}