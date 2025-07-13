# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run sb` - Start Storybook development server on port 6006
- `npm run sbb` - Build Storybook for production

## Code Architecture

### Framework Stack
- **Frontend**: Next.js 15 with React 19, TypeScript
- **UI Library**: Chakra UI v3 with custom theme system
- **State Management**: React Context (cart state, data provider)
- **Authentication**: Auth0 via custom `asasvirtuais-auth` package
- **Database**: Airtable as backend via `@asasvirtuais/crud` package
- **Payments**: Stripe integration (test environment)
- **Styling**: Emotion React with Chakra UI
- **Build Tools**: Vite for Storybook, Next.js for app

### Data Layer Architecture
The application uses a sophisticated CRUD abstraction:

1. **Schema Definition** (`data/schema.ts`): Zod schemas define table structures for Courses, Lessons, Profiles, Certificates, Exams, Questions, etc.
2. **Airtable Integration** (`data/airtable.ts`): Uses `@asasvirtuais/crud/airtable` package
3. **Server Layer** (`data/server.ts`): FeathersJS services wrapping CRUD operations
4. **Type Safety**: Global TypeScript types generated from Zod schemas

### Key Database Tables
- **Courses**: Course metadata, pricing, status, ownership
- **Lessons**: Bilingual content (EN/ES), quiz integration
- **Profiles**: User management with role-based permissions (Creator/Owner/Student)
- **Certificates**: Course completion tracking
- **Exams/Questions**: Quiz functionality

### Component Structure
- `components/layout/`: Page-specific layout components
- `components/ui/`: Reusable UI components with Chakra UI integration
- `components/views/`: Complex view components
- `app/`: Next.js App Router pages and API routes

### Authentication Flow
- Middleware (`middleware.ts`) handles Auth0 authentication for all routes
- Uses custom `asasvirtuais-auth` package wrapper
- Profile creation/linking managed through Auth0 integration

### MCP Integration
The project uses multiple MCP servers configured in `mcp.json`:
- **Airtable MCP**: Direct database operations
- **Stripe MCP**: Payment processing and product management
- **Context7**: Additional context management

### Next.js Configuration
- **Transpile Packages**: Custom packages are transpiled via Next.js config
- **Path Aliases**: `@/*` maps to project root
- **React Strict Mode**: Disabled for development
- **Package Optimization**: Chakra UI optimized for better bundle size

### Environment Requirements
- `AIRTABLE_TOKEN`: Required for database access
- Stripe keys configured in MCP setup
- Auth0 configuration handled by `asasvirtuais-auth`

### Development Notes
- Uses experimental Next.js features for package optimization
- Vite configured for Storybook with TypeScript path resolution
- Cart state managed via React Context with local storage persistence
- Bilingual content support (EN/ES) built into data schema