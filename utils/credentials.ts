export type SauceUser = {
  username: string;
  password: string;
};

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Copy .env.example to .env and set it.`);
  }

  return value;
}

export const standardUser: SauceUser = {
  username: requiredEnvironmentVariable('SAUCE_STANDARD_USERNAME'),
  password: requiredEnvironmentVariable('SAUCE_PASSWORD'),
};