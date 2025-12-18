# Task Dashboard - Creative Upaay Full Stack Development Assignment

A feature-rich task management dashboard built with React, Redux, and Firebase. Implements pixel-perfect Figma design with advanced features including authentication, drag-and-drop, subtasks, activity logging, and real-time due date notifications.

![React](https://img.shields.io/badge/React-19.2.3-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)

**Live Demo**: [task-management-dashboard-firebase-zakiyas-projects-cb77cfea.vercel.app]  
---

## Table of Contents

- [Project Overview](#project-overview)
- [Features Checklist](#features-checklist)
- [Tech Stack](#tech-stack)
- [Approach & Architecture](#approach--architecture)
- [Installation & Setup](#installation--setup)

---

## Project Overview

This project is a comprehensive task management dashboard developed as part of the Creative Upaay Full Stack Development Assignment. It replicates the provided Figma design while implementing advanced features for task organization, collaboration, and productivity tracking.


---

## Features Checklist

### **LEVEL 1 FUNCTIONALITIES** (5 out of 5 Complete)

| Feature | Status | Description |
|---------|--------|-------------|
| **Dashboard UI** | Done | Pixel-perfect implementation matching Figma design |
| **Task Management** | Done | Add Task, Move Task, BONUS: Drag n Drop feature implemented. |
| **Filtering** | Done | Filter tasks by priority |
| **State Management Using Redux** | Done | Centralized state using Redux Toolkit,  application state is persistent using Local Storage |
| **Drag & Drop (Bonus)** | Done | Smooth drag-and-drop using @hello-pangea/dnd |

### **LEVEL 2 FUNCTIONALITIES** (5 out of 6 Complete)

| Feature | Status | Description |
|---------|--------|-------------|
| **Basic Authentication** | Done | Firebase Auth with email/password and Google OAuth |
| **Due Date & Reminder** | Done | Date picker, color-coded due date badges, banner notifications for overdue/upcoming tasks |
| **Subtasks** | Done | Nested subtask management with progress tracking, add/toggle/delete functionality |
| **Socket.io Integration** | ❌ | Not implemented (opted for Firebase Auth instead) |
| **Customizable Task Fields** | Done | 8 custom tags (Design, Development, Testing, etc.) and 11 effort estimates (30m-2w) |
| **Activity Log** | Done | Comprehensive activity tracking with 7+ event types, expandable timeline UI |

### **Additional Features Implemented** (Bonus)

| Feature | Status | Description |
|---------|--------|-------------|
| **Edit Task** | Done | Edit any task via dropdown menu with pre-filled modal |
| **Delete Task** | Done | Delete tasks with confirmation dialog |
| **Avatar Management** | Done | Custom team member avatars from Figma assets |
| **Protected Routes** | Done | Dashboard access restricted to authenticated users |
| **Click-Outside Detection** | Done | Improved UX for dropdown menus |

---

## Tech Stack

### Core Technologies
- **React** 19.2.3 - UI framework
- **Redux Toolkit** 2.11.2 - State management
- **Redux Persist** 6.0.0 - State persistence
- **Firebase** 12.7.0 - Authentication (Email/Password + Google OAuth)

### UI & Styling
- **Material-UI** 7.3.6 - Icon library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS (Material-UI peer dependency)
- **Custom CSS** - Component-level styling matching Figma specs

### Drag & Drop
- **@hello-pangea/dnd** 18.0.1 - Modern drag-and-drop library

### Date Management
- **date-fns** 4.1.0 - Date formatting and calculations

### Utilities
- **uuid** 13.0.0 - Unique ID generation for tasks and activities

---

## Approach & Architecture

### 1. Design-First Approach
- Analyzed Figma design and extracted color palette, component hierarchy, and constants

### 2. Component-Based Architecture
```
src/
├── components/          # Reusable UI components
│   ├── Sidebar/        # Left navigation panel
│   ├── Header/         # Top header with search and profile
│   ├── ProjectHeader/  # Project controls and filters
│   ├── TaskColumn/     # Droppable task container
│   ├── TaskCard/       # Individual task display
│   ├── AddTaskModal/   # Task creation/editing modal
│   ├── SubtasksList/   # Nested subtask management
│   ├── ActivityLog/    # Task activity timeline
│   ├── NotificationBanner/ # Due date alerts
│   └── Login/          # Authentication UI
├── redux/              # State management
│   ├── store.js        # Redux store with persistence
│   └── tasksSlice.js   # Task actions and reducers
├── contexts/           # React Context API
│   └── AuthContext.js  # Firebase auth state
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase initialization
└── utils/              # Constants and helpers
    └── constants.js    # Sample data, colors, configs
```

### 3. State Management Strategy
- **Redux Toolkit** for centralized task management
- **Redux Persist** for localStorage synchronization
- **Context API** for authentication state (separate concern)
- Automatic activity logging on every task modification

### 4. Authentication Flow
- Firebase initialization with environment variables
- React Context for auth state management
- Protected routes (redirect to login if not authenticated)
- Persistent sessions across page refreshes

---

## Assumptions Made

- **Viewport**: Designed for 1440×932 desktop viewport (as per Figma design)
- **Single-user mode**: No multi-user permissions or real-time collaboration

---

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Firebase Account** (for authentication)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd dashboard-design-cu
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication** → **Email/Password** and **Google** sign-in methods
4. Go to **Project Settings** → **Your apps** → **Web app** → Copy config values

### Step 4: Environment Variables
Create a `.env` file in the root directory and add your Firebase credentials

### Step 5: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 6: Build for Production
```bash
npm run build
```

---

## Author

Created by **Zakiya Miller** for Creative Upaay Full Stack Development Assignment

- GitHub: [@ZakiyaMiller](https://github.com/ZakiyaMiller)
- Email: kzakiya2004@gmail.com

**Live Demo**: [task-management-dashboard-firebase-zakiyas-projects-cb77cfea.vercel.app]  
**Submission Date**: December 18, 2025
