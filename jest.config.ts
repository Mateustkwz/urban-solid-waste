import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@models/*": ["./src/models/*"],
      "@repositories/*": ["./src/repositories/*"],
      "@services/*": ["./src/services/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@provider/*": ["./src/provider/*"],
      "@storage/*": ["./src/storage/*"],
      "@store/*": ["./src/store/*"],
      "@assets/*": ["./src/assets/*"],
      "@constants/*": ["./src/constants/*"],
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@navigation/*": ["./src/navigation/*"],
      "@theme/*": ["./src/theme/*"],
      "@app-types/*": ["./src/types/*"],
      "@utils/*": ["./src/utils/*"],
      "@mocks/*": ["./src/mocks/*"],
    },
    { prefix: "<rootDir>", useESM: true },
  ),
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!(ajv-errors)/)"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/__tests__/**",
    "!src/mocks/**",
    "!src/constants/**",
    "!**/*.d.ts",
    "!**/*.model.ts",
  ],
  verbose: true,
};

export default config;
