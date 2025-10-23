import Features from '@/components/modules/Home/Features'
import Gallery from '@/components/modules/Home/Gallery'
import Reviews from '@/components/modules/Home/Reviews'
import AllCollection from '@/components/modules/products/AllCollection'
import NewArrivals from '@/components/modules/products/NewArrivals'

const RootLayout = () => {
  return (
    <div>
      <NewArrivals />
      Trending Now
      Festive Special
      <AllCollection />
      Watch and Shop
      <Reviews />
      Services
      <Gallery />
      <Features />
    </div>
  )
}

export default RootLayout