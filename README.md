# N-Puzzle [![CircleCI](https://circleci.com/gh/guyo/n-puzzle.svg?style=svg)](https://circleci.com/gh/guyo/n-puzzle)

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


to run locally - create new package and run on a local server on port 5000 
```
npm build

npm run start:prod &
````

to run against a remove server set the e2e URL:
```
export NPUZZLE_E2E_URL=http://<host>:<port>
```

run e2e tests against localhost port 5000:
```
npm run e2e
```  

#### E2E selenium tests (dev mode):
Set following local variable for dev mode:
```
export NPUZZLE_E2E_MODE=dev
```
Run dev server:
```
npm start &
```
Run e2e tests against local dev server
```
npm run e2e
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
