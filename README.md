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
- 🎨 **One design system for web and mobile**: a warm dark theme (coral and gold) exported as a Flutter `ThemeData` in [`src/theme.dart`](src/theme.dart), so the mobile app looks the same as the web prototype

## Backend

Express + SQLite (built into Node 22.13+). Passwords are hashed with scrypt; sign-in uses signed tokens.

| Endpoint | What it does |
|---|---|
| `POST /api/auth/register` · `POST /api/auth/login` · `GET/PATCH /api/me` | Accounts and your profile |
| `GET /api/people?q=&role=` · `GET /api/people/:id` | People looking for a team |
| `GET/POST /api/hackathons` | Hackathon list; anyone signed in can add one |
| `GET/POST /api/teams` · `GET /api/teams/:id` | Teams with members and open roles |
| `POST /api/teams/:id/invite` · `POST /api/teams/:id/join` | Owner invites a person, or a person asks to join |
| `GET /api/invites` · `POST /api/invites/:id/accept` or `/decline` | Answer invites and requests; accepting adds the person to the team |
| `GET /api/conversations` · `GET /api/messages/:userId` · `POST /api/messages` | Direct messages with unread counts |

A fresh database gets sample people, hackathons and a team (sample password `demo1234`). CI signs up two users, creates a team, invites, accepts and sends a message on every push.

The GitHub Pages demo has no server, so it shows sample data and the Teams page explains how to run it. With the server, the People page loads real profiles, **Teams** has sign-in, team creation and invites, and **Invite to team** sends a real invite.

## Run it

With Docker:

```bash
docker build -t hack-searcher .
docker run -p 8080:8080 -e AUTH_SECRET=change-me -v hs-data:/data hack-searcher   # http://localhost:8080
```

Or with Node.js 22.13+:

```bash
npm install
npm run build && npm start      # app + API on http://localhost:8080
```

## Status

Working backend and web app: sign up, sign in, create a team, ask to join, invite people from the People page, accept or decline. Next steps: a messages screen on top of the existing API, importing real hackathon listings, and matching by skills.

## Author

Made by [Arnur](https://github.com/arna0), a hackathon regular who kept running into exactly these problems.
