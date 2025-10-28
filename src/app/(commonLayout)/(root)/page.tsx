import HomeBanner from '@/components/modules/Home/Banner'
import Gallery from '@/components/modules/Home/Gallery'
import Reviews from '@/components/modules/Home/Reviews'
import AllCollection from '@/components/modules/products/AllCollection'
import FestiveSpecial from '@/components/modules/products/FestiveSpecial'
import NewArrivals from '@/components/modules/products/NewArrivals'

const RootLayout = () => {
  return (
    <div>
      <HomeBanner />
      <NewArrivals />
      <FestiveSpecial />
      <AllCollection />
      <Reviews />
      <Gallery />
    </div>
  )
}

export default RootLayout