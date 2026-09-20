const path = require('path');

// CRA doesn't support the `@/` import alias shadcn expects, so CRACO adds it
// for webpack (build) and jest (tests).
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
};
