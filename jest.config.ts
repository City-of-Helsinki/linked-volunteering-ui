import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  automock: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!<rootDir>/node_modules/'],
  coverageReporters: ['clover', 'json', 'lcov', 'text'],
  setupFiles: ['./src/setupTests.ts'],
  verbose: true,
};

export default config;
