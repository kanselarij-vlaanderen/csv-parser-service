# Press release CSV Parser service

CSV parser microservice that has an endpoint which finds a CSV file by id. That csv's first line (column headers) will be the keys for the JSON it returns and every row will be an instance of such an object.


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

# Endpoints
## GET /csv/:id/parse
### params
| param | description |
|-------|-------------|
| id | id of the csv file to be parsed |

### Responses
| status | description |
|-------|-------------|
| 404 | a file with the provided id does not exist |
| 400 | the id provided is not matched with a file that has a .csv extension |

### example
a csv file that looks like the one below, 

```csv
key1, key2, key3
foo, bar, baz
qux, quux, quuz
```

wll result in a response that looks like

```json
[
  {
    "key1": "foo",
    "key2": "bar",
    "key3": "baz"
  }, {
    "key1": "qux",
    "key2": "quux",
    "key3": "quuz"
  }
]
```


