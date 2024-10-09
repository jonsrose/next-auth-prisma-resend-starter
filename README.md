# Next.js Auth Starter with Prisma and Resend

This is a starter template for building a Next.js application with authentication, database integration using Prisma, and email functionality via Resend. It provides a solid foundation for developing modern web applications with robust authentication and database capabilities.

## Features

- Next.js 13+ with App Router
- Authentication using NextAuth.js (with Google and GitHub providers)
- Database ORM with Prisma
- Email sending capabilities with Resend
- TypeScript support
- Currently unstyled but supports Tailwind CSS for styling

## Prerequisites

- Node.js 16.8 or later
- npm or yarn
- A database (PostgreSQL recommended, but Prisma supports others)
- Resend API key for email functionality
- Google Client ID and Secret for Google OAuth
- GitHub Client ID and Secret for GitHub OAuth
- A NextAuth secret (you can generate one using the command below)
- A database URL (you can use the free tier of services like Supabase or Railway)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/jonsrose/next-auth-prisma-resend-starter.git
   cd next-auth-prisma-resend-starter
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Set up your environment variables:

   Database URL needs to be in .env for Prisma commands to work. Create a new `.env` file and add the following:
   ```
   DATABASE_URL=<your-database-url>
   ```

   Create a new `.env.local` file and add the following:
   ```
   NEXTAUTH_SECRET=<your-secret>
   NEXTAUTH_URL=<your-url>
   RESEND_API_KEY=<your-resend-api-key>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GITHUB_ID=<your-github-id>
   GITHUB_SECRET=<your-github-secret>

   ```
  To generate a secure value for NEXTAUTH_SECRET, you can use this command:
   ```
   openssl rand -base64 32
   ```

4. Set up your database and run migrations:
   ```
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app`: Contains the Next.js 13+ app router pages and components
- `/prisma`: Prisma schema and migrations
- `/components`: Reusable React components
- `/lib`: Utility functions and shared code
- `/styles`: Global styles and Tailwind CSS configuration
- `/types`: TypeScript type definitions (including NextAuth type extensions)

## Authentication

This project uses NextAuth.js for authentication with Google, GitHub, and Email providers. You can configure providers and customize the authentication flow in `/app/api/auth/[...nextauth]/route.ts`.

## Database

Prisma is used as the ORM. The database schema is defined in `/prisma/schema.prisma`. Run `npx prisma studio` to open the Prisma Studio and manage your data.

## Email Functionality

Resend is integrated for sending emails. Configure your Resend API key in the `.env.local` file and use the provided utility functions to send emails from your application. Note: For email verification to work with external email addresses, you may need to set up a custom domain with Resend.

## TypeScript Types

Custom TypeScript type definitions for NextAuth are located in `/types/next-auth.d.ts`. These extend the default NextAuth types to include additional properties like user ID.

## Deployment

This project can be deployed on platforms like Vercel or Netlify. Make sure to set up your environment variables in your deployment platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
