# 🔎 Hack Searcher

**Find a hackathon, find a team, agree on who does what.**

### ▶ [Live demo](https://arna0.github.io/hack-searcher/): opens in the browser, nothing to install

Students who want to join hackathons hit the same three problems: they don't know which events are open, they can't find teammates with the right skills, and teams fall apart because roles were never agreed. Hack Searcher puts all three in one app.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-theme-02569B?logo=flutter&logoColor=white)

## Features

- 🗓️ **Hackathon Explorer**: upcoming and past events with dates, prize pools and difficulty tags; search by title
- 🧲 **Team matchmaking**: filter people by role (Flutter, Design, Backend, Senior) and get matched into a team
- 🤝 **Team Agreement Builder**: write down roles, deadlines and action items before the hackathon starts
- 📁 **My Projects**: create a project, describe the idea, see active teams
- 🔔 **Notifications and chat** between team members
- 🎨 **One design system for web and mobile**: a futuristic dark theme (indigo and cyan) exported as a Flutter `ThemeData` in [`src/theme.dart`](src/theme.dart), so the mobile app looks the same as the web prototype

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Status

UI prototype with demo data. Next steps: real event sources, user accounts, and matching by skills.

## Author

Made by [Arnur](https://github.com/arna0), a hackathon regular who kept running into exactly these problems.
