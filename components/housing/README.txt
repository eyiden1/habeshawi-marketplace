JOBS MILESTONE 3

Adds:
- Free Post a Job form
- Supabase insert with status = pending
- Success confirmation page
- No login and no Stripe

INSTALL
1. Copy the app folder into your project root and replace the empty app/jobs/post/page.tsx file.
2. Open Supabase Dashboard > SQL Editor.
3. Open supabase/jobs-table.sql from this package.
4. Paste the SQL and click Run.
5. Restart your app:
   npm run dev
6. Open:
   http://localhost:3000/jobs/post

A submitted job will appear in Supabase Table Editor with status "pending".
It will not appear publicly until we build the approved-job query in Milestone 4.
