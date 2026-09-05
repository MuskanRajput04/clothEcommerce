import Hero from "../components/home/Hero";
import {
  UspStrip,
  CategoryMosaic,
  CuratedTabs,
  EditorialBanner,
  SplitCollections,
  CraftPillars,
  OccasionRail,
  Testimonials,
  Lookbook,
  Bestsellers,
  Showcase3D,
  ClosingBand,
} from "../components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <UspStrip />
      <CategoryMosaic />
      <CuratedTabs />
      <EditorialBanner />
      <Bestsellers />
      <Showcase3D />
      <SplitCollections />
      <CraftPillars />
      <OccasionRail />
      <Testimonials />
      <Lookbook />
      <ClosingBand />
    </>
  );
}
