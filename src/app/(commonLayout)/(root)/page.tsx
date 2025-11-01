import HomeBanner from '@/components/modules/Home/Banner';
import Services from '@/components/modules/Home/Services';
import ShopFacebook from '@/components/modules/Home/ShopFacebook';
import { Testimonial } from '@/components/modules/Home/Testimonial';
import TrendingVideo from '@/components/modules/Home/TrendingVideos';
import AllCollection from '@/components/modules/products/AllCollection';
import TrendingSpecial from '@/components/modules/products/TrendingSpecial';
import NewArrivals from '@/components/modules/products/NewArrivals';

const RootLayout = () => {
  return (
    <div>
      <HomeBanner />
      <Services />
      <NewArrivals />
      <TrendingSpecial />
      <TrendingVideo />
      <AllCollection />
      <Testimonial />
      <ShopFacebook />
    </div>
  );
};

export default RootLayout;
