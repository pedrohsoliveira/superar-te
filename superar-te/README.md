This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase RLS Configuration

This project uses Supabase for authentication, member data, activities, and file uploads. To protect private member data with row-level security, apply the SQL policies in `supabase-policies.sql` in the Supabase SQL editor.

Steps:
1. Open your Supabase project.
2. Go to the SQL editor.
3. Paste the contents of `supabase-schema.sql` and execute to create the required tables and enable RLS.
4. Then paste the contents of `supabase-policies.sql` and execute to create the row-level security policies.
5. Make the `uploads` storage bucket private, then allow the app to generate signed URLs for access.

> If Supabase shows the warning about tables without row-level security, it is because the editor detected the table creation before RLS was enabled. The updated `supabase-schema.sql` now enables RLS during creation, so you can safely run it and then apply `supabase-policies.sql`.

After applying policies, authenticated users will only be able to read and modify their own rows.
