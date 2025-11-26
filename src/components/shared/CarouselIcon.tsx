import { CarouselNext, CarouselPrevious } from '../ui/carousel';

const CarouselIcon = () => {
    return (
        <div>
            <CarouselPrevious
  className="
    absolute top-1/2 -translate-y-1/2 left-2 z-50
    bg-primary/60 text-black 
    md:static md:translate-y-0
  "
/>
<CarouselNext
  className="
    absolute top-1/2 -translate-y-1/2 right-2 z-50
    bg-primary/60 text-black
    md:static md:translate-y-0
  "
/>
        </div>
    );
};

export default CarouselIcon;