
# Real Time Messaging API

## About Real Time Messaging API

Real Time Messaging API is a Node.js application built on Express.js providing a RESTful API and a WebSocket connection for real time chat clients.

## Features

	. RESTful API: 
		. Users registration and login
		. JWT based authentication
		. Send messages between users
	. WebSocket:
		. Real time WebSocket notifications
	. Test coverage

## Requirements

	. Node.js >= 8.11.3
	. npm >= 5.6.0
	. MongoDB >= 3.6.3

## Installation

Clone the repository

```bash
$ git clone https://yassine_khachlek@bitbucket.org/yassine_khachlek/real-time-messaging-api.git
```

Install dependencies

```bash
$ npm install
```

Rename the example configuation file .env.example to .env

```bash
$ mv .env.example .env
```

Update the configuration file with your server information

```file
APP_NAME="Real Time Messaging API"
APP_ENV=development
APP_PORT=5098
APP_URL=http://127.0.0.1:5098

JWT_KEY=G+KaPdSgVkYp3s6v
JWT_EXP=31536000000

DB_HOST=127.0.0.1
DB_PORT=27017

DB_DATABASE=real-time-messaging-api
DB_USERNAME=root
DB_PASSWORD=secret

LOG_FORMAT=combined
```

Run

```bash
$ npm start
```

Check the {APP_URL} in your brower:

```link
[http://127.0.0.1:5098] (http://127.0.0.1:5098){target="_blank"}
```

## Author

Copyright (c) 2018 Yassine Khachlek <yassine.khachlek@gmail.com>

