# Test project
Its just a test project that shows basics of building nodejs applications
### Testing and code quality
Check tslint rules
```bash
npm run lint
```
Execute unit tests
```bash
npm run test
```

### Docker Compose
to create docker container need to execute following command
```bash
docker-commpose build
```
to start application
```bash
docker-compose up -d db && docker compose up -d rest
```
### Start project
```bash
npm run start
```
### Postman definition
can be found ./postman_collection.json
