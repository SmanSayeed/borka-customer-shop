export default const config = {
  env: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    queryCacheTime:
      1000 * 60 * (Number(process.env.NEXT_QUERY_CACHE_TIME) || 20), // 20 minutes
  },
};
