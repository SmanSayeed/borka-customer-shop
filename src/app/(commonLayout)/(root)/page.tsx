import HomeBanner from '@/components/modules/Home/HomeBanner';
import ShopFacebook from '@/components/modules/Home/ShopFacebook';
import TrendingVideo from '@/components/modules/Home/TrendingVideos';
import AllCollection from '@/components/modules/products/AllCollection';
import NewArrivals from '@/components/modules/products/NewArrivals';
import TrendingSpecial from '@/components/modules/products/TrendingSpecial';
import HomeSection from '@/components/modules/Home/HomeSection';
import { Testimonial } from '@/components/modules/Home/Testimonial';

const RootLayout = () => {
  return (
    <div>
      {/* <HomeBanner /> */}
      <HomeBanner />
      <div className='px-4'>
      <NewArrivals />
        <HomeSection />
      <TrendingVideo />
      <Testimonial />
      <ShopFacebook />
      </div>
    </div>
  );
};

export default RootLayout;
