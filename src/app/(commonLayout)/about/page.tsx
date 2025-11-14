import PageBanner from '@/components/shared/PageBanner';
import AboutUs from '@/components/modules/about/AboutUs';
import ShippingProcess from '@/components/modules/about/ShippingProcess';
import FAQ from '@/components/modules/about/FAQ';
import ShopFacebook from '@/components/modules/Home/ShopFacebook';

const AboutPage = () => {
  return (
    <div>
      <PageBanner />
      <AboutUs />
      <ShippingProcess />
      <FAQ />
      <ShopFacebook />
    </div>
  );
};

export default AboutPage;
