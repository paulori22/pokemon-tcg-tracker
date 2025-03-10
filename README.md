Site: https://pptcg-tracker.btoolsb.com/

## Features

- Probability Calculator
  - Decide which pack to open based based on your collection and the calculated odds
- Progress Tracker
  - Check your progress on completing a set and see which cards are missing
- Free to use
  - Open source and free to use. You can contribute to the project

## Stack

- Nextjs
  - Database Postgree (Vercel Neon Database)
  - Clerk (Authentication provider)
  - Prisma (ORM)
- Tailwind
  - Shadcn ui (https://ui.shadcn.com/) for some ui components

## Development

This project has docker support, to start the development just clone the repository and run:

```bash
docker compose up
```

This command will start two containers, one with node for the Nextjs and another with the Postgree database. By default Nextjs will start on port 3000.

#### Database

After start up the project you can load the card database by executing the SQL file initial_db_data.sql (.docker/initial_db_data.sql)
