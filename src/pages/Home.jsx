import HeroCarousel from '../components/HeroCarousel';
import TitleRow from '../components/TitleRow';
import { useApp } from '../context/AppContext';
import { STRINGS } from '../constants/strings';

export default function Home() {
  const { catalog } = useApp();
  return (
    <>
      <HeroCarousel titles={catalog.getFeatured()} />
      <TitleRow heading={STRINGS.rows.trending} titles={catalog.getTrending(10)} />
    </>
  );
}