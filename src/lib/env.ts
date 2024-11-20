export type EnvKeys = 'API_URL' | 'BASE_URL';

const config: Record<EnvKeys, string> = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
};

export default config;
