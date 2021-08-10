import { app, errorHandler } from 'mu';
import { handleGenericError } from './helpers/generic-helpers';
import { findCsvFleById } from './sparql/csv.sparql';
import { readFile } from 'fs/promises';
import * as path from 'path';
const neatCsv = require('neat-csv');

app.get('/csv/:uuid/parse', async (req, res, next) => {
    // Retrieve csv file uuid from request
    const csvFileUUID = req.params.uuid;
    try {
        // find fileUrl from csv file in triplestore by provided uuid.
        const result = await findCsvFleById(csvFileUUID);
        console.log(result);

        if (result) {
            console.log('FOUND File: ', result.fileUrl);
            // Load file from location and
            const file = await readFile(path.join('/share', result.fileUrl), {encoding: 'utf8'});

            // parse csv file
            const parsedCSV = await neatCsv(file);

            // send parsed csv back to client
            res.json(parsedCSV);
            res.send();
            return;
        } else {
            return res.sendStatus(404);
        }

    } catch (err) {
        return handleGenericError(err, next);
    }
});

// use mu errorHandler middleware.
app.use(errorHandler);
