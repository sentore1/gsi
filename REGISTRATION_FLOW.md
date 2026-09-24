# Business Registration Flow with Membership Selection

## Overview
The registration process now includes a multi-step flow that allows business users to choose their membership tier during registration, similar to the pricing page.

## Registration Steps

### Step 1: User Type Selection
Users choose between:
- **Individual**: For customers who want to rate businesses (proceeds directly to Step 3)
- **Business**: For business owners (proceeds to Step 2)

### Step 2: Membership Selection (Business Users Only)
Business users choose from three membership tiers:

#### Basic (Free)
- No membership required
- Business profile listing
- Receive customer ratings
- Perfect for businesses testing the platform

#### Business Membership (Paid)
- All features from the pricing page:
  - Business profile on GSI platform
  - Receive customer ratings
  - Respond to customer feedback
  - Service analytics dashboard
  - GSI Member badge
  - Rating trend reports
  - Customer insights
  - Priority support
- Contact-based pricing
- Popular option (highlighted)

#### Corporate Membership (Enterprise)
- All Business features plus:
  - Multiple location support
  - Industry analytics
  - Sponsored initiatives
  - Sector reports
  - GSI events access
  - Custom reporting
  - Dedicated account manager
- Custom enterprise solutions

### Step 3: Registration Details
Users complete their account information:
- Full Name
- Business Name (if business type)
- Email Address
- Password & Confirmation
- Terms & Conditions agreement

For Business and Corporate memberships:
- A notification appears informing users that the team will contact them to complete setup and discuss pricing
- Membership status is set to "pending" until admin approval

## Database Changes

### New Migration: `003_add_membership_type.sql`
Adds the following to the `businesses` table:
- `membership_type`: ENUM ('basic', 'business', 'corporate') - defaults to 'basic'
- `membership_status`: TEXT ('pending', 'active', 'expired') - defaults to 'pending'
- `membership_expiry`: TIMESTAMPTZ - for tracking subscription expiration

### Updated Database Types
The `database.types.ts` file has been updated to include the new membership fields.

## User Experience

### Individual Registration
1. Select "Individual"
2. Fill in details
3. Create account
4. Start rating businesses immediately

### Business Registration - Basic
1. Select "Business"
2. Choose "Basic" membership
3. Fill in details
4. Create account
5. Start receiving ratings immediately

### Business Registration - Paid Membership
1. Select "Business"
2. Choose "Business" or "Corporate" membership
3. Fill in details (see notification about contact follow-up)
4. Create account
5. Account marked as "pending" membership setup
6. Admin contacts business to complete setup
7. Once approved, membership status changes to "active"

## Features

### Navigation
- Back buttons allow users to change their selections at any step
- Clear visual indicators show the current step
- Progress is maintained when navigating backwards

### Visual Design
- Matches the pricing page design language
- Color-coded membership tiers:
  - Basic: Gray
  - Business: Blue (with "POPULAR" badge)
  - Corporate: Gold
- Clear feature lists for each tier
- Responsive layout for mobile and desktop

### Helpful Information
- Tooltip on membership selection page: "You can start with a basic account and upgrade to a membership plan anytime from your dashboard"
- Clear pricing information (Free, Contact Us, Enterprise)
- Notification for paid plans about follow-up contact

## Next Steps for Implementation

1. **Backend Integration**: Connect the form to Supabase
   - Create user in auth.users
   - Create user profile in users table
   - If business type, create business entry with selected membership_type
   - Send notification to admin for paid membership selections

2. **Admin Dashboard**: Add membership management
   - View pending membership requests
   - Approve/activate memberships
   - Set membership expiry dates
   - Contact information for follow-up

3. **Email Notifications**: 
   - Send welcome email based on user type
   - For paid memberships, send admin notification
   - Send confirmation when membership is activated

4. **Business Dashboard Updates**:
   - Display current membership tier
   - Show membership status (pending, active, expired)
   - Add "Upgrade Membership" option
   - Display available features based on tier

## File Changes

### Modified Files
- `app/register/page.tsx` - Complete redesign with multi-step flow
- `types/database.types.ts` - Added membership fields

### New Files
- `supabase/migrations/003_add_membership_type.sql` - Database schema update
- `REGISTRATION_FLOW.md` - This documentation

## Testing Checklist

- [ ] Individual registration completes successfully
- [ ] Business registration with Basic membership works
- [ ] Business registration with Business membership shows contact notification
- [ ] Business registration with Corporate membership shows contact notification
- [ ] Back navigation preserves form data
- [ ] Form validation works on all steps
- [ ] Mobile responsive design works properly
- [ ] Database correctly stores membership_type
- [ ] Email validation prevents duplicate registrations
