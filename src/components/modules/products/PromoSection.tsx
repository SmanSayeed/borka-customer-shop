import PromoBanner from '../Home/promo/PromoBanner';
import PromoProductCard from '../Home/promo/PromoProductCard';

const PromoSale = () => {
  return (
    <section className='w-full max-w-7xl mx-auto mt-24 flex items-center justify-center p-4 md:p-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
        <div className='h-[500px] md:h-[600px]'>
          <PromoProductCard
            image={'/images/product-5.jpg'}
            alt='Navy blue athletic t-shirt with white trim'
          />
        </div>
        <div className='h-[500px] md:h-[600px]'>
          <PromoBanner />
        </div>
        <div className='h-[500px] md:h-[600px]'>
          <PromoProductCard
            image={'/images/product-7.jpg'}
            alt='Navy blue sleeveless athletic top'
          />
        </div>
      </div>
    </section>
  );
};

export default PromoSale;
