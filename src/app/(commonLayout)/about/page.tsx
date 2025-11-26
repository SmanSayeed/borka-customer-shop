import AboutUs from '@/components/modules/about/AboutUs';
import FAQ from '@/components/modules/about/FAQ';
import ShippingProcess from '@/components/modules/about/ShippingProcess';
import ShopFacebook from '@/components/modules/Home/ShopFacebook';
import PageBanner from '@/components/shared/PageBanner';

const AboutPage = () => {
  return (
    <div>
      <PageBanner 
        heading='About Us' 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' }
        ]} 
      />
      <AboutUs />
      <ShippingProcess />
      <FAQ />
      <ShopFacebook />
    </div>
  );
};

export default AboutPage;
