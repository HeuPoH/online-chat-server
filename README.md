# online-chat-server
Server for online chat on the node.js

#### h2 Installation:

1. Setup settings in /settings/settings.js.
2. Create mysql database and tables:

    CREATE TABLE `chat` (
    `id` int(32) NOT NULL,
    `id_user` int(32) NOT NULL,
    `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
    PRIMARY KEY (`id`),
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE `users` (
    `id` int(32) NOT NULL,
    `nickname` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `role` int(1) NOT NULL DEFAULT 0
    UNIQUE KEY `id` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

3. Install dependencies.
4. Put to command string npm start.

#### h2 Routes:

1. POST /user/signIn - for auth user
    If nickname and password are correctly,
    set cookie and create session in db by Passport middleware.

    request.body: {
        nickname: string,
        password: string
    },
    response: {
        user: {
            id: number,
            nickname: string,
            role: number
        } || { error: string }
    }

2. POST /user/signUp - for reg user
    request.body: {
        nickname: string,
        password: string,
        repeatPassword: string
    },
    response: {
        message: string || error: string
    }

3. POST /user/restoreState - restore state on the client
    If user has correctly cookie, return user state.

    request: { }
    response: {
        user: {
            id: number,
            nickname: string,
            role: number
        } || { error: string }
    }

4. GET /user/signOut - for exit from account
    Clear cookie and delete session from db by middleware Paspport

    requset: { }
    response: {
        message: string || error: string
    }

5. GET /chat - get messages
    request: {
        startRange: number
    },
    response: {
        messages: Array,
        count: number
    }

6. WS /chat - connect to ws channel.