# pipeline_database
Web app with simple user interface and intuitive functionality for tracking pipeline integrity


To install the app run these commands in terminal of root directory:

cd server // navigates to ./server/

npm install // installs dependencies from server side package.json

npx tsc -p tsconfig.json --build // compiles server side TypeScript to JavaScript in ./server/dist/ folder

cd dist // navigates to ./server/dist/

nodemon server.js // starts server on specified port


open new terminal and navigate to root directory

cd client // navigates to ./client/

npm install // installs dependencies from client side package.json

npm start // starts React app