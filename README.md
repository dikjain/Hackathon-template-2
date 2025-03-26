# Hackathon Template

## Overview
This template provides a premium and subtle experience for hackathon projects, streamlining authentication, backend setup, AI integration, and landing page creation with minimal configuration. By simply adding environment variables, developers can get started immediately with a fully functional project.

## Features
- **Authentication** using Clerk
- **Database Setup** using NeonDB
- **AI Integration** via Google Gemini API
- **Landing Page** with premium animations and UI components
- **Serverless Backend** powered by Next.js API routes
- **Dark Mode Support** for a modern user experience
- **One-Click Deployment** via Vercel

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS, Framer Motion
- **Backend:** Supabase, NeonDB
- **Auth:** Clerk
- **AI:** Google Gemini API

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- Yarn or npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/hackathon-template.git
   cd hackathon-template
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up environment variables by creating a `.env` file in the root directory and adding the following:
   ```sh
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth  
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth  
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-key>
   NEXT_PUBLIC_DATABASE_URL=<your-database-url>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   NEXT_PUBLIC_GEMINI_API_KEY=<your-gemini-api-key>
   ```

### Running the Project
Start the development server:
```sh
npm run dev  # or yarn dev
```

The app will be available at `http://localhost:3000`.

### Deploying to Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```

Follow the setup instructions to configure your project.

## Project Structure
```
📦 hackathon-template
├── 📂 components       # UI components
├── 📂 pages            # Next.js pages
├── 📂 utils            # Utility functions and hooks
├── 📂 data             # Static data files
├── 📂 styles           # Global styles
├── .env.example       # Sample environment variables
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── README.md          # Project documentation
```

## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## License
This project is open-source and available under the MIT License.

## Contact
For any issues or suggestions, feel free to reach out via GitHub or LinkedIn.

