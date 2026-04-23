# Multi-Step Loan Application Form

A modern, robust, and highly performant multi-step loan application form built with React, Vite, and TypeScript. This project demonstrates best practices for building scalable frontend applications, including centralized state management, route protection, and a clean component-based architecture.

## Key Features

- **Multi-Step Flow**: A logical, 3-step application process (Personal Info -> Work/Address Details -> Loan Parameters).
- **State Persistence**: Uses **Zustand** with `persist` middleware to ensure user progress is saved even if the page is refreshed.
- **High-Performance Forms**: Powered by **React Hook Form** for optimized, re-render-free form validation and handling.
- **Secure Navigation**: Custom **Protected Route Guards** prevent users from skipping ahead to steps 2 or 3 without completing the required preceding forms.
- **Centralized API Layer**: All external requests are managed via a centralized Axios configuration inside the global store.
- **Absolute Imports**: Clean and scalable import structures using the `@/` alias.

##  Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

##  Getting Started


Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16+ recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd loan-app-task/front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to `http://localhost:5173` in your browser.

## 🚀 Live Demo

You can check out the live version of the project here: 
[Loan Application React](https://loan-application-react-snowy.vercel.app)

##  Architectural Decisions

### 1. Form Management (React Hook Form)
We opted for React Hook Form instead of controlled standard inputs to minimize the number of re-renders. By decoupling the UI updates from the state updates, the form remains highly performant even as validation rules scale.

### 2. Route Protection (`StepGuard`)
To ensure application security and data integrity, users cannot bypass form steps via direct URL manipulation. The `StepGuard` component validates the presence of required data from previous steps before granting access to subsequent routes, automatically redirecting users back if data is missing.

### 3. API Logic in the Store
We moved the `fetchCategories` and `submitForm` logic into the Zustand store. This ensures "result reuse" (caching) and strictly separates UI concerns from side effects. For example, if categories are already loaded, the request will not be executed again upon a re-render or re-navigation.

##  Project Structure

```text
src/
├── api/              # Centralized Axios configurations
├── components/       # Reusable UI pieces
│   ├── pages/        # Step-specific form components
│   └── ui/           # Generic atomic components (Input, Button, etc.)
├── store/            # Zustand global state (useFormStore.ts)
├── types/            # TypeScript interfaces and type definitions
├── ui/               # Layout components and Route Guards
├── App.tsx           # Main application router
└── main.tsx          # React DOM mounting point
```