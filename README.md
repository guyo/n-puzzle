# [N-Puzzle](http://guyo.github.io/n-puzzle "n-puzzle")
[![CircleCI](https://circleci.com/gh/guyo/n-puzzle.svg?style=shield)](https://circleci.com/gh/guyo/n-puzzle) [![Build status](https://ci.appveyor.com/api/projects/status/9ig82toxm3txfc7u/branch/master?svg=true)](https://ci.appveyor.com/project/guyo/n-puzzle/branch/master)


This is an implementation of the classic 15-puzzle, 
generelized for N size ,  built with React, Redux and Bootstrap.


### Prerequisites

Node.js (version>=8)

### Installation
```
npm install
``` 

### Local Deployment
```
npm start 
```
runs webpack dev server , available on port 3000

### Packaging
```
npm run build
```

packaged files will be under ./dist

### Testing 
#### Unit testing:
```
npm test
```

#### Unit testing with coverage report:
```
npm run test:coverage
```

#### Test including packaging:
```
npm run test:all
```

#### E2E selenium tests (production):


Local server, production mode - build, run on a local server (port 5000) and run e2e test against it:
```
npm build

npm run start:prod &

npm run e2e
````

local server, dev mode - run a local dev server (port 3000) and run e2e tests in dev mode against it:
```
npm start &

NPUZZLE_E2E_MODE=dev npm run e2e
```

run against a remote server - set the e2e URL:
```
NPUZZLE_E2E_URL=http://<host>:<port> npm run e2e
```


### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
