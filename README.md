# react-getting-started

## Setup

Run `npm install` to install all the node and the bower dependencies.

## Running

Run `npm start` to compile the jsx files and put them in the `dist/` folder and also start `http-server` on port 8080.

You can also run `npm run babel` to just compile the jsx or `npm run babel-watch` to watch for changes and compile them. There is also `npm run server` which only starts up the server, doesn't compile (helpful if you have babel watching for changes).

Finally, there is `npm run clean` which will delete the dist folder, as well as anything not checked into version control like the node modules and bower components. Running the app after this will require an `npm install`. 
