# Database Setup with Drizzle ORM + PostgreSQL

This project uses Drizzle ORM with PostgreSQL for database operations.

## Prerequisites

- PostgreSQL installed and running
- Node.js and pnpm installed

## Environment Configuration

1. Copy the example environment file:

   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your PostgreSQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   DB_SSL=false
   DB_POOL_MAX=10
   DB_IDLE_TIMEOUT=30000
   DB_CONNECTION_TIMEOUT=2000
   ```

## Database Setup

1. Create a PostgreSQL database:

   ```sql
   CREATE DATABASE your_database_name;
   ```

2. Generate database migrations:

   ```bash
   pnpm db:generate
   ```

3. Push schema changes to database (for development):

   ```bash
   pnpm db:push
   ```

4. Or run migrations (for production):
   ```bash
   pnpm db:migrate
   ```

## Available Scripts

- `pnpm db:generate` - Generate migration files from schema changes
- `pnpm db:migrate` - Run pending migrations
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:push` - Push schema changes directly to database (development only)

## Project Structure

```
src/database/
├── database.config.ts      # Database configuration
├── database.service.ts     # Database connection service
├── database.module.ts      # Database module
├── schema/                 # Database schemas
│   ├── index.ts           # Schema exports
│   └── users.schema.ts    # Users table schema
└── repositories/           # Repository services
    ├── index.ts           # Repository exports
    └── users.repository.ts # Users CRUD operations
```

## Usage Example

```typescript
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async create(userData: NewUser) {
    return await this.usersRepository.create(userData);
  }
}
```

## Adding New Tables

1. Create a new schema file in `src/database/schema/`
2. Export it from `src/database/schema/index.ts`
3. Create a repository service in `src/database/repositories/`
4. Export it from `src/database/repositories/index.ts`
5. Generate and run migrations

## Drizzle Studio

Access Drizzle Studio to manage your database:

```bash
pnpm db:studio
```

This will open a web interface at `http://localhost:4983` where you can:

- View and edit data
- Execute SQL queries
- Monitor database performance
- Manage migrations
