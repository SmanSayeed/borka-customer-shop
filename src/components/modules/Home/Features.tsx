import { Truck, RefreshCcw, CreditCard, Headphones } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Orders Over $120',
    },
    {
      icon: RefreshCcw,
      title: 'Get Refund',
      description: 'Within 30 Days Returns',
    },
    {
      icon: CreditCard,
      title: 'Safe Payment',
      description: '100% Secure Payment',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Feel Free To Call Us',
    },
  ];

  return (
        <section className='mt-20 bg-secondary px-6 lg:px-0'>
          <div className='container mx-auto pt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 bg-white/2 rounded-2xl p-8 lg:divide-x divide-white/10'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center gap-4 lg:px-8 first:lg:pl-0 last:lg:pr-0'
                >
                  <div className='shrink-0 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center'>
                    <feature.icon
                      className='w-8 h-8 text-primary'
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-white mb-1'>
                      {feature.title}
                    </h4>
                    <p className='text-sm text-white/70'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
};

export default Features;
