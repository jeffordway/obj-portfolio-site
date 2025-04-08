# Portfolio Site

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Sanity CMS. This site showcases projects, skills, and professional experience with a focus on clean design and optimal user experience.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Theme switching with system preference detection
- **Content Management**: Integrated with Sanity CMS for easy content updates
- **Dynamic Projects**: Showcase work with detailed project pages
- **Interactive UI Components**: Modern UI with accessibility features
- **Contact Form**: Email integration using React Email and Resend
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Performance Focused**: Optimized for Core Web Vitals
- **Type Safety**: Full TypeScript implementation
- **Testing**: Jest and React Testing Library for component testing

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Theme Management**: next-themes
- **Icons**: Remix Icons (@remixicon/react)
- **UI Components**: Custom components with Radix UI primitives

### Backend & CMS
- **CMS**: Sanity v3
- **Content Delivery**: GROQ queries
- **Email**: React Email with Resend
- **API**: Next.js API routes

### Testing & Quality
- **Testing**: Jest and React Testing Library
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd obj-portfolio-site
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
RESEND_API_KEY=your_resend_api_key
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

For email development and testing:
```bash
npm run email
# or
yarn email
```

To run both simultaneously:
```bash
npm run all
# or
yarn all
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Email preview server runs on [http://localhost:3001](http://localhost:3001).

### Testing

Run tests:
```bash
npm test
# or
yarn test
```

Watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

Coverage report:
```bash
npm run test:coverage
# or
yarn test:coverage
```

## Project Structure

```
/src
  /app                 # Next.js App Router pages
    /(site)            # Main site pages
    /(studio)          # Sanity Studio
    /api               # API routes
  /components          # React components
    /features          # Feature components
    /layouts           # Layout components
    /ui                # UI components
  /emails              # React Email templates
  /hooks               # Custom React hooks
  /lib                 # Utility functions
  /providers           # React context providers
  /sanity              # Sanity CMS configuration
    /schemaTypes       # Content schemas
  /styles              # Global styles
  /__tests__           # Test files
```

## Deployment

This site is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Set the required environment variables
4. Deploy

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
