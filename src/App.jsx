import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TV from './pages/TV';
import Discover from './pages/Discover';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Settings from './pages/Settings';
import TitleDetails from './pages/TitleDetails';
import NotFound from './pages/NotFound';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<TV />} />
          <Route path="discover" element={<Discover />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="search" element={<Search />} />
          <Route path="settings" element={<Settings />} />
          <Route path="title/:id" element={<TitleDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}