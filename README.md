# GSI Platform - Golden Service Initiative

**SERIVISI INOZE** - You Have a Right to Good Service

## Overview

The GSI Platform is a service rating system designed to improve service quality across Rwanda by collecting and aggregating customer feedback on businesses.

## Features

### Customer Features
- 🔍 Search businesses by name or category
- ⭐ Rate service experiences across multiple dimensions
- 📊 View detailed business profiles with ratings breakdown
- 🏆 Discover top-rated businesses by category

### Business Features
- 📈 View comprehensive rating analytics
- 💬 Respond to customer feedback
- ✅ GSI Member badge and profile
- 📉 Track rating trends over time

### Admin Features
- 👥 Manage businesses and memberships
- 🛡️ Moderate ratings and detect fraud
- 📊 Platform-wide analytics
- ✅ Approve/reject businesses

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd gsi
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

Create a \`.env.local\` file in the root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

4. Set up Supabase:

- Create a new Supabase project
- Run the migration file in \`supabase/migrations/001_initial_schema.sql\` in the SQL Editor
- This will create all necessary tables, functions, and RLS policies

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

### Tables

- **users** - User profiles (extends Supabase auth)
- **businesses** - Business information and GSI membership
- **ratings** - Individual service ratings with category breakdown
- **rating_categories** - Aggregated rating averages per business
- **business_responses** - Business responses to customer ratings

### Rating Categories

1. **Entrance** - How were you welcomed?
2. **Interaction** - How helpful and responsive was the staff?
3. **Heart Factor** - Did the service feel genuinely warm?
4. **Responsiveness** - How quickly were your needs addressed?
5. **Problem Resolution** - How well were problems handled?
6. **Exit** - How was the final interaction?

## Project Structure

\`\`\`
gsi/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── ui/               # Reusable UI components
│   ├── business/         # Business-related components
│   └── search/           # Search components
├── lib/                   # Utility functions and configs
│   ├── supabase/         # Supabase client configs
│   └── constants/        # App constants
├── types/                 # TypeScript type definitions
├── supabase/             # Database migrations
└── public/               # Static assets
\`\`\`

## Color Scheme

- **Primary (Blue):** #2563eb - Main brand color
- **Accent (Yellow):** #facc15 - Call-to-action and highlights
- **Success (Green):** For GSI Member badges
- **Gray Scale:** For text and backgrounds

## Features Implementation Status

- [x] Project setup with Next.js + Supabase
- [x] Database schema and migrations
- [x] Layout components (Header, Footer)
- [x] UI component library
- [x] Homepage with search and categories
- [ ] Business search and listing pages
- [ ] Business profile pages
- [ ] Rating submission interface
- [ ] Business dashboard
- [ ] Admin panel
- [ ] Authentication pages

## Contributing

This project is part of the Golden Service Initiative to improve service quality in Rwanda.

## License

Copyright © 2024 Golden Service Initiative. All rights reserved.
