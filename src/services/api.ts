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

const getWorksFactory = () => {
  const config = {
    ...DEFAULT_API_CONFIG,
  };
  const instance = axios.create(config);
  const getWorks = async () => {
    try {
      const response = await instance.get('/works');
      if (response.status !== 200) {
        throw new Error('Error! works取得失敗');
      }
      const works = response.data;
      return works;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return getWorks;
};

export default getWorksFactory;
