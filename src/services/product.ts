import envConfig from '@/config/envConfig';

const { baseUrl } = envConfig();

export const getAllProducts = async () => {
    try {
        const res = await fetch(`${baseUrl}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = res.json();

        return result;
    } catch (error: any) {
        throw Error(error);
    }
}