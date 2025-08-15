/* eslint-disable prettier/prettier */
// src/config/configuration.ts
export default () => ({
  ports: {
    app: parseInt(process.env.APP_PORT ?? '3000', 10),
    vendor: parseInt(process.env.VENDOR_PORT ?? '3001', 10),
    customer: parseInt(process.env.CUSTOMER_PORT ?? '3002', 10),
  },
  // Legacy port support for backward compatibility
  port: parseInt(process.env.PORT ?? process.env.APP_PORT ?? '3000', 10),
  database: {
    url: process.env.DATABASE_URL ?? '',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  },
});
