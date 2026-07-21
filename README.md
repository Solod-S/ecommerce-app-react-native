# Ecommerce App

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/) [![React Native](https://img.shields.io/badge/React%20Native-0.79.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/) [![Expo](https://img.shields.io/badge/Expo-53.0.17-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Firebase](https://img.shields.io/badge/Firebase-11.10.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/) [![Zustand](https://img.shields.io/badge/Zustand-5.0.6-433E38?style=for-the-badge&logo=redux&logoColor=white)](https://zustand-demo.pmnd.rs/)

[![Ecommerce app preview](./assets/banner.svg)](./assets/banner.svg)

Ecommerce App is a modern mobile shopping experience built with React Native and Expo. It gives users a clean, focused interface for browsing products, exploring categories, managing a cart, and authenticating with email-based accounts.

The project is intentionally small, practical, and readable. It works as a React Native learning project while still aiming to feel like a real ecommerce product: smooth navigation, product browsing, category filtering, and a persistent cart with Firebase-backed authentication.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [App routes](#app-routes)
- [Data model](#data-model)
- [Useful commands](#useful-commands)

## Features

- User authentication with sign up, sign in, and password reset
- Email verification flow before first login
- Firebase Auth state listener with automatic routing
- Home screen with product browsing and flash sale section
- Category browsing and product filtering
- Search and explore screen for discovering products
- Product detail page with image gallery
- Shopping cart with item management
- Notifications screen
- User profile screen
- Responsive bottom-tab navigation with custom tab buttons
- Toast notifications for user feedback

## Tech stack

| Layer | Tools |
|-------|-------|
| Framework | React Native 0.79.5, React 19.0.0, Expo ~53.0.17 |
| Navigation | Expo Router 5.x with file-based routing |
| State | Zustand |
| Backend | Firebase Authentication, Firestore user profiles |
| Mock API | JSON Server with local `db.json` |
| Network | Axios |
| Styling | React Native StyleSheet |
| UI extras | Expo Vector Icons, Lottie, React Native Reanimated |
| Language | TypeScript 5.8.3 |

## Project structure

```
ecommerce-app-react-native/
├── app/                       # Expo Router file-based routes
│   ├── (notificationScreen)/  # Notification stack screens
│   ├── (tabs)/                # Main bottom-tab navigation
│   │   ├── home.tsx
│   │   ├── categories.tsx
│   │   ├── explore.tsx
│   │   ├── cart.tsx
│   │   ├── notifications.tsx
│   │   ├── profile.tsx
│   │   └── product-details/   # Product detail route
│   ├── _layout.tsx            # Root layout with auth guard
│   ├── index.tsx              # Landing / splash screen
│   ├── home.tsx               # Post-auth landing route
│   ├── signin.tsx             # Sign in modal
│   ├── signup.tsx             # Sign up modal
│   └── restorePassword.tsx    # Password reset modal
├── components/                # Reusable UI components
├── constants/                 # Colors, icons, shared constants
├── store/                     # Zustand stores
│   └── useAuthStore.js
├── config/                    # Firebase configuration
│   └── fireBaseConfig.js
├── data/                      # Mock API data
│   └── db.json
├── assets/                    # Fonts, images, and README banner
│   └── banner.svg
├── types/                     # TypeScript interfaces
│   └── type.ts
├── app.json                   # Expo configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Solod-S/ecommerce-app-react-native.git
cd ecommerce-app-react-native
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API server

```bash
npm run server
```

This runs `json-server --watch data/db.json --port 8000`.

### 4. Start the Expo development server

```bash
npx expo start
```

In the output, you will find options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

### 5. Configure Firebase

Make sure `config/fireBaseConfig.js` contains your Firebase project credentials.

## App routes

| Route | Description |
|-------|-------------|
| `/` | Landing screen. Splash / entry route. |
| `/home` | Post-auth landing route. |
| `/signin` | Sign in modal. |
| `/signup` | Sign up modal. |
| `/restorePassword` | Password reset modal. |
| `/(tabs)/home` | Main home screen with product browsing. |
| `/(tabs)/categories` | Category listing and product filtering. |
| `/(tabs)/explore` | Search and explore products. |
| `/(tabs)/cart` | Shopping cart with items badge. |
| `/(tabs)/notifications` | User notifications list. |
| `/(tabs)/profile` | User profile screen. |
| `/(tabs)/product-details/[id]` | Product detail page with gallery. |

## Data model

The app keeps the core domain simple:

```
User (Firebase Auth)
├── Firestore user profile
│   ├── email
│   ├── fullName
│   └── userId
├── CartItem
│   ├── id
│   ├── title
│   ├── price
│   ├── quantity
│   └── image
├── Product
│   ├── id
│   ├── title
│   ├── price
│   ├── description
│   ├── images[]
│   └── category
├── Category
│   ├── id
│   ├── name
│   └── image
└── Notification
    ├── id
    ├── title
    ├── message
    └── timestamp
```

## Useful commands

Start the Expo development server:

```bash
npx expo start
```

Start the Android simulator:

```bash
npm run android
```

Start the iOS simulator:

```bash
npm run ios
```

Start the web preview:

```bash
npm run web
```

Start the JSON server mock API:

```bash
npm run server
```

Run linting:

```bash
npm run lint
```

Reset the project starter:

```bash
npm run reset-project
```

## Notes

This project is intended for local development and React Native practice. The default setup uses Firebase Authentication and a local JSON Server for product data, so the app can be started with a small, predictable command set.

Make sure both the Expo development server and the JSON Server are running in separate terminals when working with product data.
