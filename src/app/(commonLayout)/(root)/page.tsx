import HomeSection from '@/components/modules/Home/HomeSection';
import ShopFacebook from '@/components/modules/Home/ShopFacebook';
import { Testimonial } from '@/components/modules/Home/Testimonial';
import TrendingVideo from '@/components/modules/Home/TrendingVideos';

const RootLayout = () => {
  return (
    <div>
      <HomeSection />
      <TrendingVideo />
      <Testimonial />
      <ShopFacebook />
    </div>
  );
};

export default RootLayout;
