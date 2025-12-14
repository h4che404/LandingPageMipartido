# Mi Partido - Landing Page Setup

## 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

You can find these in your Supabase Dashboard under **Project Settings > API**.

## 2. Supabase Setup (Database)
Go to the **SQL Editor** in your Supabase Dashboard and run the content of the `supabase_schema.sql` file located in the root of this project.

This will create:
- `beta_members` table (Stores user profiles and roles)
- `public_beta_members` view (Safe public view for the landing page)
- RLS Policies (Security rules so users can only edit their own data)

## 3. Authentication Setup
In Supabase Dashboard > Authentication > Providers:
- Enable **Google** (Create credentials in Google Cloud Console).
- Enable **Email** (Magic Link is enabled by default).
- Set the Redirect URL to: `http://localhost:3000/auth/callback` (and your production URL).

## 4. Run Locally
```bash
npm run dev
```

## Features Implemented
- **Hero & Marketing**: New messaging, role selection (Player/Court).
- **Beta Access**: `BetaJoinModal` with Google/Magic Link login.
- **Profile Management**: `/beta` portal for users to complete their profile.
- **Public List**: Landing page shows real waiting list count and members (if they consented).
- **Tracking**: Console logs for key actions (CTA clicks, Login starts).
