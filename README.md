This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First,
```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Get Client ID and Client Secret from [https://develop.battle.net/access/clients] by making and account and creating a client.

Add these to your env file as:

```bash
REACT_APP_CLIENT_ID = your_client_id
REACT_APP_CLIENT_SECRET = your_client_secret
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project purpose:

The purpose of this application is to display Diablo3's leaderboards on a website to make it easier to view.
There are plenty of leaderboards to choose from, by selecting region, season, and leaderboard type from the dropdown menus.

## Dynamic rendering

This project uses blizzards api through OAuth and generates details about each player and displays time/date achieved.
This projects scope was to have a nonseasonal leaderboard, items, and character, but the main working element is the seasonal leaderboard.
