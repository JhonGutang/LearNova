# LearNova - Learning Management System

LearNova is a comprehensive learning management system that empowers educators to create engaging courses and enables students to access quality education through an intuitive platform. The system features a dual-interface design with separate applications for course creators and students, built with modern web technologies for scalability and performance.

## Features

### Current Features
- **User Authentication & Authorization**: Role-based access control for creators and students
- **Course Management**: Create, edit, and manage courses with rich content
- **Lesson System**: Structured lessons with multiple pages and progress tracking
- **Text Editor for Lessons**: Rich text editor for creating and editing lesson content
- **Student Enrollment**: Course enrollment and progress monitoring
- **Community Features**: Student forums with posts and reactions
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS
- **Real-time Progress Tracking**: Monitor student progress through lessons

### Ongoing Plans
- Advanced analytics dashboard for creators
- Video content support and streaming
- Assignment and quiz system
- Discussion forums and live chat
- Mobile application development
- Payment integration for premium courses
- Advanced search and filtering capabilities

## Tech Stack

- **Backend**: Node.js, Express, GraphQL, Apollo Server
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: Session-based authentication with bcrypt
- **Content Editor**: TipTap rich text editor

## Backend Setup Guide

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager ([see install guide](https://pnpm.io/installation))

### Installation Steps

1. **Install all dependencies for every package using pnpm workspaces**
   ```bash
   pnpm install -r
   ```

2. **Navigate to backend directory**
   ```bash
   cd packages/backend
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/learning_management_system"
   PORT=3000
   SESSION_SECRET="your-secret-key-here"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate deploy
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   pnpm --filter backend dev
   ```

The GraphQL API will be available at `http://localhost:8000/graphql` with Apollo Studio interface.

### Available Scripts
- `pnpm dev` - Start development server with hot reload
- `pnpm run build` - Build the application for production
- `pnpm run prod` - Start production server
- `pnpm run codegen` - Generate GraphQL types

## Frontend Setup Guide

The project includes two separate frontend applications:

### LMS Creator (Course Creation Interface)

1. **Navigate to creator directory**
   ```bash
   cd packages/lms-creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the lms-creator directory:
   ```env
   NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:8000/graphql
   ```

4. **Start the development server**
   ```bash
   pnpm --filter lms-creator dev
   ```

The creator interface will be available at `http://localhost:3000`

### LMS Student (Student Learning Interface)

1. **Navigate to student directory**
   ```bash
   cd packages/lms-student
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the lms-student directory:
   ```env
   NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:8000/graphql
   ```

4. **Start the development server**
   ```bash
   pnpm --filter lms-student dev
   ```

The student interface will be available at `http://localhost:3001`

### Available Scripts (Both Frontends)
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Database Schema

The system uses PostgreSQL with the following main entities:
- **Users**: Authentication and role management
- **Creators**: Course creators with profile information
- **Students**: Student profiles and enrollment tracking
- **Courses**: Course content and metadata
- **Lessons**: Individual lessons within courses
- **Lesson Pages**: Content pages within lessons
- **Enrolled Courses**: Student enrollment tracking
- **Lesson Progress**: Student progress through lessons
- **Posts**: Community forum posts
- **Reactions**: Student reactions to community posts

## Development Workflow

1. **Install dependencies for all packages (if not yet done):**
   ```bash
   pnpm install -r
   ```
2. **Start the backend, creator, and student apps in three terminals:**
   ```bash
   pnpm --filter backend dev
   pnpm --filter lms-creator dev
   pnpm --filter lms-student dev
   ```
3. **Access Apollo Studio** at `http://localhost:3000/graphql` for API testing
4. **Use the creator interface** to create courses and content
5. **Use the student interface** to enroll in courses and track progress

## Project Structure

```
learning-management-system/
├── packages/
│   ├── backend/                 # GraphQL API server
│   │   ├── src/
│   │   │   ├── features/       # Feature modules (auth, courses, etc.)
│   │   │   ├── config/         # Configuration files
│   │   │   └── types/          # TypeScript type definitions
│   │   ├── prisma/             # Database schema and migrations
│   │   └── generated/          # Generated Prisma client
│   ├── lms-creator/            # Course creator frontend
│   │   └── src/
│   │       ├── app/            # Next.js app router pages
│   │       ├── features/       # Feature components
│   │       └── components/     # Reusable UI components
│   └── lms-student/            # Student learning frontend
│       └── src/
│           ├── app/            # Next.js app router pages
│           ├── features/       # Feature components
│           └── components/     # Reusable UI components
├── README.md
├── pnpm-workspace.yaml
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.