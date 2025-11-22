export default function config() {
  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    cart_key: 'cart',
    cart_expiry_time: Date.now() + 24 * 60 * 60 * 1000
  };
}
