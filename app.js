import { app, errorHandler } from 'mu';
import { handleGenericError } from './helpers/generic-helpers';
import { findCsvFleLocationById } from './sparql/csv.sparql';
import { readFile } from 'fs/promises';

const neatCsv = require('neat-csv');

app.get('/csv/:uuid/parse', async (req, res, next) => {
    // Retrieve csv file uuid from request
    const csvFileUUID = req.params.uuid;
    try {
        // find fileUrl from csv file in triplestore by provided uuid.
        const filePath = await findCsvFleLocationById(csvFileUUID);

        if (filePath) {
            // Load file from location
            const file = await readFile(filePath, {encoding: 'utf8'});

            // parse csv file
            const parsedCSV = await neatCsv(file);

            // send parsed csv back to client
            return res.json(parsedCSV);
        } else {

            // there is no file found, so return 404 Not Found
            return res.sendStatus(404);
        }

    } catch (err) {
        return handleGenericError(err, next);
    }
});

// use mu errorHandler middleware.
app.use(errorHandler);
