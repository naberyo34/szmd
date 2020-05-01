import axios from 'axios';

interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: {};
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: 'https://szmd.microcms.io/api/v1/',
  timeout: 1000,
  headers: {
    // 環境変数で渡す
    'X-API-KEY': process.env.X_API_KEY,
  },
};

const getDataFactory = (target: string) => {
  const config = {
    ...DEFAULT_API_CONFIG,
  };
  const instance = axios.create(config);
  const getData = async () => {
    try {
      const response = await instance.get(target);
      if (response.status !== 200) {
        throw new Error(`${target}の取得に失敗しました……`);
      }
      const { data } = response;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return getData;
};

export default getDataFactory;
