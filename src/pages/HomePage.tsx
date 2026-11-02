import AboutSection from '@/components/home/AboutSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import ClubCollection from '@/components/home/ClubCollection';
import FaqSection from '@/components/home/FaqSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HeroSlider from '@/components/home/HeroSlider';
import InstagramGallery from '@/components/home/InstagramGallery';
import RetroCampaign from '@/components/home/RetroCampaign';
import StoreLocation from '@/components/home/StoreLocation';
import TeamCrestStrip from '@/components/home/TeamCrestStrip';
import { BRAND } from '@/data/site';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export default function HomePage() {
  useDocumentMeta(
    `${BRAND.name} | Premium Sports Jerseys in Prabhadevi, Mumbai`,
    'Football, cricket and retro jerseys in fan and player versions. Shop online or visit our Prabhadevi store in Mumbai.',
  );

  return (
    <>
      <HeroSlider />
      <TeamCrestStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <ClubCollection />
      <RetroCampaign />
      <AboutSection />
      <StoreLocation />
      <InstagramGallery />
      <FaqSection />
    </>
  );
}
