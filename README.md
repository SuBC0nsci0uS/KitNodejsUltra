## Kit-nodejs-ultra
### Structure
<ul>
    <li>
      Application layer - responsibles for web application which provides a restful API based on nest framework. The web application contains modules, each of its contain controller, dto and mapper folders.
             Also the web application uses domain and infrastructure layers which are connected to the application like a dependency via package.json file
    </li>
    <li>
        Domain layer - responsibles for business logic and contains interfaces, for working with database or other storages, entities and value objects
    </li> 
    <li>
        Infrastructure layer - responsible for implementation of interfaces in domain layer
    </li>
</ul>    

### Technology stack:
<ul>
    <li>Typescript - primary language</li>
    <li>Nest - application framework</li>
    <li>Docker - virtualization tool</li>
</ul>   
    

## Installation

### Domain
Go to ```domain``` directory, then run ```npm install``` and ```npm run build```
```bash
$ cd ./domain
$ npm install
$ npm run build
$ cd  ..
```

### Infrastructure
Go to  ```infrastructure``` directory, then run ```npm install``` and ```npm run build```
```bash
$ cd ./infrastructure
$ npm install
$ npm run build
$ cd  ..
```

### Application
Go to ``application`` folder, then run ```npm install``` and ```npm run build``` 
```
$ cd ./application
$ npm install
$ npm run build
$ cd  ..
```

## Running the app 
Before you start, please go to  ```application``` directory and run this commands:
```bash
# development mode
$ npm run start
```
```
# production mode
$ npm run build:prod
$ npm run start
```

## Test
Before you start, please go to  ```application``` directory and run this commands:
```bash
# unit tests
$ npm run test

# integrations tests
$ npm run test:integrations

# test coverage
$ npm run test:cov
```

## Build Docker image
Before you start, please go to  ```application``` directory and run this commands:
```bash
$ npm run build:prod
$ npm install --only=prod
$ docker build -t ultra .
```
