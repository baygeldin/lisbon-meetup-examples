import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    bindings: {
      DEPLOY_TIMESTAMP: new Date(0).toUTCString(),
      HOMEPAGE_URL: 'https://example.com',
    },
    kvNamespaces: ['KV'],
  },
  globals: {
    appUrl: '',
  },
  collectCoverageFrom: ['src/**/*.{ts}'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
}

export default config

