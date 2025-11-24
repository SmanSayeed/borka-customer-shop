// import HomeBanner from '@/components/modules/Home/Banner';
import HomeBanner from '@/components/modules/Home/HomeBanner/HomeBanner';
import ShopFacebook from '@/components/modules/Home/ShopFacebook';
// import { Testimonial } from '@/components/modules/Home/Testimonial';
import TrendingVideo from '@/components/modules/Home/TrendingVideos';
import AllCollection from '@/components/modules/products/AllCollection';
import NewArrivals from '@/components/modules/products/NewArrivals';
import TrendingSpecial from '@/components/modules/products/TrendingSpecial';

const RootLayout = () => {
  return (
    <div>
      {/* <HomeBanner /> */}
      <HomeBanner />
      <NewArrivals />
      <TrendingSpecial />
      <TrendingVideo />
      <AllCollection />
      {/* <Testimonial /> */}
      <ShopFacebook />
    </div>
  );
};

export default RootLayout;
