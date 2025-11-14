import BranchLocations from '@/components/modules/contact/BranchLocation';
import ContactUs from '@/components/modules/contact/ContactUs';
import PageBanner from '@/components/shared/PageBanner';

const ContactPage = () => {
  return (
    <div className='bg-background'>
      <PageBanner text='Contact Us'/>
      <ContactUs />
      <BranchLocations />
    </div>
  );
};

export default ContactPage;
