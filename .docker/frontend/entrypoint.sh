#!/bin/sh
cd /home/node/app
yarn install
yarn prisma generate
yarn prisma migrate dev
yarn run dev
