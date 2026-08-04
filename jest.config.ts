import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@app/*": ["./src/app/*"],
      "@models/*": ["./src/models/*"],
      "@repositories/*": ["./src/repositories/*"],
      "@services/*": ["./src/services/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@context/*": ["./src/context/*"],
      "@storage/*": ["./src/storage/*"],
      "@assets/*": ["./src/assets/*"],
      "@constants/*": ["./src/constants/*"],
      "@components/*": ["./src/components/*"],
      "@theme/*": ["./src/theme/*"],
      "@types/*": ["./src/types/*"],
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
    "!**/*.d.ts",
    "!**/*.model.ts",
  ],
  verbose: true,
};

export default config;
