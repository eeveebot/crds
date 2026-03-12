# Agent Development Guide

This guide provides essential information for agentic coding assistants working with this repository.

## Build Commands

```
# Build the project
npm run build

# The build process consists of two steps:
# 1. Compile TypeScript files using tsc
# 2. Generate CRDs using pepr
```

## Linting

```
npx eslint src/
npx prettier --check src/
```

## Formatting

```
npx prettier --write src/
```

## Type checking

```
npx tsc --noEmit
```

## Testing

Currently, this repository does not have unit tests configured. The primary validation is through the build process which ensures TypeScript compilation and CRD generation succeeds.

To validate changes:

1. Run the build command: `npm run build`
2. Check that no errors are reported
3. Verify that generated CRDs in the `crds/` directory are correctly updated

## Code Style Guidelines

### Language and Runtime

- Target: ES2024
- Module system: ESM (ECMAScript Modules)
- File extensions: `.mts` for TypeScript files, `.mjs` for JavaScript files
- Node.js version: >=24.0.0

### Imports

- Use ESM import/export syntax exclusively
- Prefer named imports over default imports when available
- Group imports in the following order:
  1. Node.js built-in modules
  2. External dependencies
  3. Internal modules
- Separate import groups with a blank line
- Use `'use strict'` directive at the top of each file

### Formatting

- Indentation: 2 spaces (no tabs)
- Semicolons: Required at the end of statements
- Quotes: Single quotes preferred
- Trailing commas: Enabled for ES5+ compatibility
- Line length: Wrap at 80 characters when possible

### Naming Conventions

- Variables and functions: camelCase
- Classes and interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- File names: kebab-case for most files, follow existing patterns for special cases
- TypeScript interfaces: Use "I" prefix for interfaces when appropriate (e.g., IConfig)

### Types

- Use TypeScript strictly with strict mode enabled
- Explicitly type all function parameters and return values
- Prefer interfaces over types for object shapes
- Use `unknown` instead of `any` when the type is truly unknown
- Use `Record<string, T>` for dictionaries/maps

### Error Handling

- Always handle promises with `.catch()` or use async/await with try/catch
- Create custom error classes for specific error types
- Include meaningful error messages with context
- Log errors appropriately but avoid exposing sensitive information

### Documentation

- Use JSDoc-style comments for exported functions, classes, and interfaces
- Document complex logic with inline comments
- Keep comments up to date with code changes
- Remove commented-out code that is no longer needed

### Kubernetes CRD Specifics

- Follow existing patterns in the codebase for CRD definitions
- Use proper TypeScript interfaces for spec and status objects
- Include JSON schema documentation for all fields
- Implement proper toJSON conversion functions for complex nested objects
- Maintain consistency with Kubernetes naming conventions for resources

### Best Practices

- Keep functions small and focused on a single responsibility
- Avoid side effects in pure functions
- Use functional programming approaches when appropriate
- Prefer immutability over mutability
- Handle edge cases and error conditions explicitly
- Minimize external dependencies
- Follow the existing code organization patterns
