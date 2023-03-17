import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8080',
  title: '🐙 toml-yaml-json-xml 🐙',
};

export default setting;
