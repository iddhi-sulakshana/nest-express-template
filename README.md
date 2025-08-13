# NestJS Fastify Template

A modern, production-ready NestJS application template built with Fastify, featuring Drizzle ORM, PostgreSQL, comprehensive linting, formatting, and Git hooks with Husky.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18.19.1 or 20.11.1 or >=22.0.0
- **pnpm**: Version 8.0.0 or higher
- **PostgreSQL**: Version 12 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd nest-fastify-template
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Setup Husky Git hooks**

   ```bash
   pnpm run prepare
   ```

4. **Environment setup**

   ```bash
   cp .env.example .env
   # Update .env with your database credentials
   ```

5. **Database setup**

   ```bash
   # Generate migrations
   pnpm run db:generate

   # Push schema to database (development)
   pnpm run db:push
   ```

6. **Start the application**

   ```bash
   # Development mode
   pnpm run start:dev

   # Production mode
   pnpm run start:prod
   ```

## 🛠️ Available Scripts

### Development

- `pnpm run start:dev` - Start in watch mode
- `pnpm run start:debug` - Start with debug enabled
- `pnpm run build` - Build the application
- `pnpm run type-check` - Run TypeScript type checking

### Testing

- `pnpm run test` - Run unit tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:cov` - Run tests with coverage
- `pnpm run test:e2e` - Run end-to-end tests

### Code Quality

- `pnpm run lint` - Run ESLint with auto-fix
- `pnpm run format` - Format code with Prettier

### Database

- `pnpm run db:generate` - Generate database migrations
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open Drizzle Studio

## 🔒 Git Hooks with Husky

This project uses Husky to enforce code quality and prevent direct pushes to protected branches.

### Pre-commit Hook

The pre-commit hook runs automatically before each commit and performs:

- **Formatting**: Runs Prettier to format your code
- **Type Checking**: Ensures TypeScript compilation passes
- **Branch Protection**: Prevents commits to locked branches (main, develop, staging, production)

### Pre-push Hook

The pre-push hook runs before pushing and performs:

- **Branch Protection**: Prevents pushes to locked branches
- **Code Formatting**: Ensures code is properly formatted
- **Type Checking**: Validates TypeScript types

### What Happens During Hooks

1. **Pre-commit Process**:

   ```bash
   🔍 Running Pre-commit checks...
   ✅ No changes after formatting.
   ```

2. **Pre-push Process**:
   - Formatting check
   - Type checking
   - Branch validation

### 🚨 Common Issues and Solutions

#### Issue: "Direct pushes to locked branches are not allowed!"

**Cause**: You're trying to push directly to a protected branch (main, develop, staging, production)

**Solution**:

1. Create a feature branch from the protected branch
2. Make your changes and commit them
3. Create a pull request/merge request
4. Merge through the proper review process

#### Issue: "Some files were changed by formatting"

**Cause**: Prettier automatically formatted your code during the pre-commit hook

**Solution**:

1. Review the formatted changes: `git diff`
2. Stage the formatted files: `git add .`
3. Commit again: `git commit -m "Your message"`

#### Issue: "Type check failed"

**Cause**: TypeScript compilation errors in your code

**Solution**:

1. Run type checking manually: `pnpm run type-check`
2. Fix the TypeScript errors
3. Commit again

#### Issue: "Husky hooks not working"

**Cause**: Husky wasn't properly installed or configured

**Solution**:

1. Reinstall Husky: `pnpm run prepare`
2. Ensure `.husky` directory exists in your project root
3. Check that `.husky/pre-commit` and `.husky/pre-push` files are executable

#### Issue: "Permission denied" on Husky hooks

**Cause**: Husky hook files don't have execute permissions

**Solution**:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Manual Hook Execution

If you need to run hooks manually for testing:

```bash
# Test pre-commit hook
.husky/pre-commit

# Test pre-push hook
.husky/pre-push
```

## 🗄️ Database Setup

This project uses Drizzle ORM with PostgreSQL. See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed setup instructions.

### Quick Database Commands

```bash
# Generate new migration
pnpm run db:generate

# Apply migrations
pnpm run db:migrate

# Push schema changes (development only)
pnpm run db:push

# Open database studio
pnpm run db:studio
```

## 🏗️ Project Structure

```
src/
├── configs/          # Configuration files
├── database/         # Database configuration and schemas
├── modules/          # Feature modules
├── app.module.ts     # Root application module
└── main.ts          # Application entry point
```

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:cov

# Run end-to-end tests
pnpm run test:e2e
```

## 📝 Code Quality

### Linting

- ESLint with NestJS-specific rules
- Prettier for code formatting
- TypeScript strict mode enabled

### Pre-commit Checks

- Automatic code formatting
- Type checking
- Linting

## 🚀 Deployment

### Production Build

```bash
pnpm run build
pnpm run start:prod
```

### Environment Variables

Ensure all required environment variables are set in production:

- Database connection strings
- API keys
- Environment-specific configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Ensure all hooks pass: `pnpm run prepare`
5. Commit your changes: `git commit -m "Add amazing feature"`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Fastify Documentation](https://www.fastify.io/docs/)
- [Husky Documentation](https://typicode.github.io/husky/)

## 📄 License

This project is licensed under the MIT License.
