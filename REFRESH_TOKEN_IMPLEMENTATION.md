# Refresh Token Implementation Guide

This document explains the new refresh token-based authentication system implemented in the NestJS application.

## Overview

The application now uses a dual-token authentication system:

- **Access Token**: Short-lived (15 minutes by default) for API requests
- **Refresh Token**: Long-lived (7 days by default) for obtaining new access tokens

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-at-least-32-characters-long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## New API Endpoints

### 1. Sign Up

```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "phone": "1234567890",
  "firstName": "John",
  "lastName": "Doe"
}
```

### 2. Sign In

```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Refresh Token

```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** New access and refresh tokens

### 4. Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer <access_token>
```

## How It Works

### 1. Authentication Flow

1. User signs in with email/password
2. System generates both access and refresh tokens
3. Refresh token is hashed and stored in database
4. Both tokens are returned to client

### 2. Token Usage

1. **Access Token**: Use in `Authorization: Bearer <token>` header for API requests
2. **Refresh Token**: Store securely (httpOnly cookie recommended) and use to get new access tokens

### 3. Token Refresh Flow

1. When access token expires, client sends refresh token
2. System verifies refresh token signature and expiration
3. System checks if refresh token exists in database
4. If valid, generates new access and refresh tokens
5. Old refresh token is invalidated

### 4. Logout Flow

1. Client sends logout request with valid access token
2. System clears refresh token from database
3. Both tokens become invalid

## Security Features

- **Separate Secrets**: Access and refresh tokens use different secrets
- **Token Hashing**: Refresh tokens are hashed before storing in database
- **Automatic Invalidation**: Old refresh tokens are invalidated on refresh
- **Secure Storage**: Refresh tokens should be stored in httpOnly cookies
- **Short-lived Access**: Access tokens expire quickly to minimize exposure

## Database Changes

A new `refresh_token` column has been added to the `users` table:

```sql
ALTER TABLE "users" ADD COLUMN "refresh_token" text;
```

## Implementation Details

### Files Modified/Created:

- `libs/config/src/configuration.ts` - Added JWT refresh configuration
- `libs/config/src/validation.ts` - Added JWT secret validation
- `libs/database/src/schema/users.schema.ts` - Added refresh token field
- `libs/database/src/repositories/users.repository.ts` - Added refresh token methods
- `apps/app/src/auth/auth.service.ts` - Implemented refresh token logic
- `apps/app/src/auth/auth.controller.ts` - Added new endpoints
- `apps/app/src/auth/strategy/jwt-refresh.strategy.ts` - New refresh token strategy
- `apps/app/src/auth/dto/refresh.dto.ts` - New DTO for refresh requests

### Key Classes:

- `AuthService`: Handles authentication logic
- `UsersRepository`: Manages user data and refresh tokens
- `JwtStrategy`: Validates access tokens
- `JwtRefreshStrategy`: Validates refresh tokens

## Best Practices

1. **Store refresh tokens securely**: Use httpOnly cookies, not localStorage
2. **Rotate refresh tokens**: Generate new refresh tokens on each refresh
3. **Implement token blacklisting**: Consider blacklisting revoked tokens
4. **Monitor token usage**: Log suspicious refresh token activity
5. **Set appropriate expiration**: Balance security with user experience

## Testing

Test the flow:

1. Sign up a new user
2. Sign in and get both tokens
3. Use access token for protected endpoints
4. Wait for access token to expire (or use expired token)
5. Use refresh token to get new tokens
6. Logout to invalidate tokens

## Troubleshooting

### Common Issues:

- **"Invalid refresh token"**: Token expired, invalid, or not in database
- **"User not found"**: User was deleted or refresh token corrupted
- **"JWT_SECRET not defined"**: Missing environment variables

### Debug Steps:

1. Check environment variables are set correctly
2. Verify database migration was applied
3. Check token expiration times
4. Verify refresh token is being stored in database
