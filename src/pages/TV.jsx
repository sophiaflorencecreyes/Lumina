import HeroCarousel from '../components/HeroCarousel';
import TitleRow from '../components/TitleRow';
import { useApp } from '../context/AppContext';
import { TitleType } from '../models/enums';
import { STRINGS } from '../constants/strings';

export default function TV() {
  const { catalog } = useApp();
  return (
    <>
      <HeroCarousel titles={catalog.getFeatured(TitleType.SERIES)} />
      <TitleRow heading={STRINGS.rows.popularShows} titles={catalog.getPopular(TitleType.SERIES, 12)} />
    </>
  );
}