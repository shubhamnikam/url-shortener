# Url Shortner

#### Trending Urls:
![image](https://github.com/shubhamnikam/url-shortener/assets/24590977/388225d8-0a96-47f7-a023-893c116422a2)
#### Create Short Urls:
![image](https://github.com/shubhamnikam/url-shortener/assets/24590977/9003f2fe-420f-44e8-a679-7ff9facec4a9)
#### Get Long Urls from short url code:
![image](https://github.com/shubhamnikam/url-shortener/assets/24590977/405edad6-fc5f-406b-8c8b-0063c83a333d)

### tech-stack
```bash
- frontend
    - angular 15
- backend
    - dotnet core 6
- db
    - mongo db
```

### ng-openapi-gen to create types & api
```bash
- install
    - npm i -g ng-openapi-gen

- get template json/yml file from backend or create one as per requirement refer open api docs
    - sample template file -> src/core/api/template/swagger.json

- generate models and web client
    - use following command:
        - ng-openapi-gen --input <path-to-openapi-json> --output <angular-app-path>/src/app/api
    - eg:
        - ng-openapi-gen --input src/app/core/api/template/swagger.json --output src/app/core/api

- pass config with rootUrl in AppModule
    -  ApiModule.forRoot({ rootUrl: environment.API_ENDPOINT })

- calls the REST endpoints from components
    - import service from ~api/services/ in constructor
    - call required method & subscribe to it
```

### run locally using docker/docker-compose
```bash
- pull repo

- install
    - docker
    - docker-compose
    - follow start/stop commands

- start all containers
docker-compose up -d --build

- stop & remove all containers 
docker-compose down --rmi local
```
