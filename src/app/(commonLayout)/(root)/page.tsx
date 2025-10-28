import HomeBanner from '@/components/modules/Home/Banner'
import Gallery from '@/components/modules/Home/Gallery'
import Services from '@/components/modules/Home/Services'
import { Testimonial } from '@/components/modules/Home/Testimonial'
import TrendingVideo from '@/components/modules/Home/TrendingVideos'
import AllCollection from '@/components/modules/products/AllCollection'
import FestiveSpecial from '@/components/modules/products/FestiveSpecial'
import NewArrivals from '@/components/modules/products/NewArrivals'

const RootLayout = () => {
  return (
    <div>
      <HomeBanner />
      <Services />
      <NewArrivals />
      <FestiveSpecial />
      <TrendingVideo />
      <AllCollection />
      {/* <Reviews /> */}
      <Testimonial />
      <Gallery />
    </div>
  )
}

export default RootLayout