# Random User Directory

This is a [Next.js](https://nextjs.org) application that interacts with the Random User API to display user information with a searchable contact-like interface.

## Features

- **User Fetching**: Fetches 100 random users from the Random User API
- **Searchable Dropdown**: Search users by first name with debounced search functionality
- **Detailed User View**: Displays comprehensive user information including:
  - Full Name
  - Gender
  - Email (clickable)
  - Phone (clickable)
  - Country
  - Profile Picture
- **Accessibility**: Keyboard navigation support and ARIA attributes
- **Performance**: Debounced search to minimize re-renders

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

## Implementation Details

This project was built according to the following requirements:

1. Fetch Users: Fetch a list of users (100) from the Random User API
2. Searchable Dropdown: Create a searchable dropdown where users can search by first name
3. Display User Details: Show full name, gender, email, phone, country, and picture when a user is selected

### Performance Optimizations

- Debounced search input to reduce unnecessary re-renders
- Next.js Image component for optimized image loading
- Client-side filtering for instant search results

### Accessibility Features

- Keyboard navigation (arrow keys, enter, escape)
- Proper ARIA attributes for screen readers
- Visual indication of the currently selected item
- Focus management

## Project Structure

- `/app` - Next.js app directory with layout and main page
- `/src/components` - React components for the UI
- `/src/services` - Service layer for API interactions

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
