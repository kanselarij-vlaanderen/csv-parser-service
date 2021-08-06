# Press release CSV Parser service

CSV parser microservice that has an endpoint which finds a CSV file and returns the rows of the CSV as JSON


## How to

### Run the application in development mode

For development, add a docker-compose.override.yml to your main project (app-persberchten), or add the following service to your existng docker-compose.override.yaml.
(You might have to change the volume path to the root path of this application).

```yaml
services:
  database:
    environment:
      LOG_DELTA_MESSAGES: "on"
  press-release-csv-parser:
    image: semtech/mu-javascript-template
    ports:
      - 8888:80
      - 9229:9229
    environment:
      NODE_ENV: "development"
    links:
      - triplestore:database
    volumes:
      - ./data/files:/share
      - ../press-release-csv-file-parser/:/app/
```
