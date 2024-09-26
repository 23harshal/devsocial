install node modules using npm install

install all these also
"dependencies": {
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.21.0",
"jsonwebtoken": "^9.0.2",
"mongodb": "^6.9.0",
"mongoose": "^8.6.3",
"nodemon": "^3.1.7",
"social": "file:",
"validator": "^13.12.0"
}

APIS -

AUTH APIS

POST /signup
POST /login
POST /logout

USER APIS
GET /profile/view
PATCH /profile/edit
PATCH /profile/password/edit

REQUEST APIS
POST /request/review/:status/:requestId

GET /connections
GET /request/received
GET /feed

Auhorization and authentication done by using jwt tokens and we use cookies for sending information to clients
