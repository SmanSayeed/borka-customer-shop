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
      Customer Review
      Services
      Gallery
    </div>
  )
}

export default RootLayout