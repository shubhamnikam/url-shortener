# Url Shortner

### docker-compose
```bash
- install
    - docker
    - docker-compose
    - follow start/stop commands

- start all containers
docker-compose up -d --build

- stop & remove all containers 
docker-compose down --rmi local
```

### mssql server
```bash
- run mssql locally/in docker/in other server
    - change the appsettings.json DefaultConnection string accordingly

- apply initial migration
    - dotnet ef migration add "Initial"
    - dotnet ef database update
```
