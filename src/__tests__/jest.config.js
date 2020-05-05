process.env.NODE_ENV = "test";
process.env.PORT = "0";
process.env.MONGODB_URI = "mongodb://db:27017/dig_test";
process.env.APP_ENV = "test";
process.env.JWT_SECRET = "segredo";

module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/../../tsconfig.json",
      // diagnostics: {
      //   warnOnly: true
      // }
      diagnostics: false,
    },
  },
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|js)"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
