import CheckoutDetails from '@/components/modules/checkout/CheckoutDetails';
import PageBanner from '@/components/shared/PageBanner';

const Checkout = () => {
  return (
    <div>
      <PageBanner
        heading='Checkout'
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <CheckoutDetails />
    </div>
  );
};

export default Checkout;
