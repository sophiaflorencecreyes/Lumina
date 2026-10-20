import { createContext, useContext, useState } from 'react';
import { catalog } from '../services/catalog';
import { UserSettings } from '../models/UserSettings';
import { SearchHistory } from '../models/SearchHistory';
import { ListManager } from '../services/ListManager';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(() => UserSettings.load());
  const [history, setHistory] = useState(() => SearchHistory.load());
  const [lists, setLists] = useState(() => ListManager.load(catalog));

  const updateSetting = (key, value) => {
    const next = settings.clone();
    next.update(key, value);
    next.save();
    setSettings(next);
  };

  const addSearchTerm = (term) => {
    if (!settings.recentSearches) return;
    const next = history.clone();
    next.add(term);
    next.save();
    setHistory(next);
  };

  const clearSearchHistory = () => {
    const next = history.clone();
    next.clear();
    next.save();
    setHistory(next);
  };

  const commitLists = (mutate) => {
    const next = lists.clone();
    const result = mutate(next);
    next.save();
    setLists(next);
    return result;
  };

  const createList = (name) => commitLists((m) => m.createList(name));
  const removeFromList = (listId, titleId) => commitLists((m) => m.removeFromList(listId, titleId));
  const isSaved = (titleId) => lists.isSaved(titleId);

  // --- NEW FUNCTIONS ---
  const renameList = (listId, newName) => commitLists((m) => m.renameList(listId, newName));
  const deleteList = (listId) => commitLists((m) => m.deleteList(listId));
  // ---------------------

  // Add to the default list, or remove from every list if already saved.
  const toggleSaved = (title) =>
    commitLists((m) => {
      if (m.isSaved(title.id)) m.removeEverywhere(title.id);
      else m.addToList(m.getDefaultList().id, title);
    });

  const value = {
    catalog,
    settings,
    updateSetting,
    history,
    addSearchTerm,
    clearSearchHistory,
    lists,
    createList,
    removeFromList,
    renameList, // <-- Added
    deleteList, // <-- Added
    isSaved,
    toggleSaved,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}