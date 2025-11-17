import CountdownTimer from '@/components/modules/Home/promo/CountdownTimer';
import { Button } from '@/components/ui/button';

const PromoBanner = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 13);
  targetDate.setMinutes(targetDate.getMinutes() + 8);

  return (
    <div className='relative overflow-hidden rounded-2xl h-full'>
      <div className='absolute inset-0 bg-linear-to-br from-[#957739] to-[#dfd8a9]' />

      <div className='relative h-full flex flex-col items-center justify-center p-8 md:p-12 text-center'>
        <p className='text-white/90 text-sm md:text-base uppercase tracking-wider mb-4'>
          Don't miss out...
        </p>

        <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
          Today's Big Deals
        </h2>

        <p className='text-white/95 text-base md:text-lg mb-8'>
          Sale up to 75% all items. Hurry Up!
        </p>

        <div className='mb-10 px-10'>
          <CountdownTimer targetDate={targetDate} />
        </div>

        <Button 
          size='lg'
          className='bg-white hover:bg-white/90 text-foreground rounded-full px-12 py-6 text-base font-medium shadow-xl transition-all hover:scale-105'
        >
          Shop Sale
        </Button>
      </div>
    </div>
  );
};

export default PromoBanner;