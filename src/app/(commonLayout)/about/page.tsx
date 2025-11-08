import CoreValues from '@/components/modules/about/coreValues';
import MedigoGallery from '@/components/modules/about/Gallery';
import MedicalExperts from '@/components/modules/about/ExpertDoctors';
import PopularBrands from '@/components/modules/home/PopularBrands';
import WorkProcess from '@/components/modules/home/WorkProcess';
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
