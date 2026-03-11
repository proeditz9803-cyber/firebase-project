# **App Name**: FastTrack

## Core Features:

- Fasting Timer Interface: A large, circular SVG timer visually representing fast progress, displaying remaining time in HH:MM:SS format and the current phase ('Fasting' or 'Eating Window'). Includes buttons to 'Start Fast', 'End Fast Early' (with confirmation), and 'Reset'.
- Fasting Protocol Selector: Allow users to select from predefined fasting protocols (16:8, 18:6, 20:4, OMAD) via a styled button group, or customize their own. The selection persists across sessions.
- Local Fasting Data Persistence: Utilize browser localStorage to save the fast start timestamp, selected protocol, and historical fast records, ensuring data persistence even if the browser tab is closed.
- Dynamic Motivational Messages & Streaks: Display contextual motivational messages that change based on fasting duration and track 'Current Streak' and 'Longest Streak' based on completed fasts.
- Fasting History Log: A dedicated page displaying a reverse-chronological list of past fasts, including date, protocol, actual duration, and completion status. Provides summary statistics and a 'Clear All History' option.
- Static Informational Guide: A read-only page with structured information about Intermittent Fasting protocols, body changes during fasting, common mistakes, and tips for breaking a fast.
- Progressive Web App (PWA) Support: Implement a basic web app manifest to enable installation of 'FastTrack' on mobile devices, offering an app-like experience directly from the browser.

## Style Guidelines:

- A dark, health-focused theme with a near-black background: #0f0f0f. Primary interactive elements and accents utilize a vibrant teal: #00d4aa. Secondary text uses a muted gray: #a0a0a0, while main text is crisp white: #ffffff. Cards feature a slightly lighter dark background: #1a1a1a. Timer track uses a dark gray: #2a2a2a, ensuring excellent contrast and a modern aesthetic. Button hovers are a darker shade of teal: #00b894.
- Headline and body text use the 'Inter' sans-serif font for its modern, clean, and highly readable qualities across various screen sizes. Weights of 400, 500, and 700 are utilized for visual hierarchy. Note: currently only Google Fonts are supported.
- Implement minimal, vector-based icons that are universally recognized and health-related to maintain a clean and professional appearance. Ensure icons are accessible and visually consistent with the dark theme.
- A responsive design prioritizing a clean, single-column layout for mobile screens (below 600px) and multi-column arrangements for larger displays. UI elements like cards and buttons have a consistent border-radius of 12px and a subtle box shadow of 0 2px 12px rgba(0,0,0,0.4) for depth. The circular timer resizes proportionally with a maximum width of 280px.
- Smooth and subtle animations for the circular timer's progress arc to provide real-time visual feedback. Buttons include smooth background color transitions on hover (to #00b894) for an engaging interactive experience.