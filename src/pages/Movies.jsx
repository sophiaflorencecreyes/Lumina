import HeroCarousel from '../components/HeroCarousel';
import TitleRow from '../components/TitleRow';
import { useApp } from '../context/AppContext';
import { TitleType } from '../models/enums';
import { STRINGS } from '../constants/strings';

export default function Movies() {
  const { catalog } = useApp();
  return (
    <>
      <HeroCarousel titles={catalog.getFeatured(TitleType.MOVIE)} />
      <TitleRow heading={STRINGS.rows.popularMovies} titles={catalog.getPopular(TitleType.MOVIE, 12)} />
    </>
  );
}