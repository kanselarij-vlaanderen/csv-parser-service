import { app, errorHandler } from 'mu';
import { handleGenericError } from './helpers/generic-helpers';

app.post('/csv/:uuid/parse', async (req, res, next) => {
    // Retrieve csv file uuid from request
    const pressReleaseUUID = req.params.uuid;

    try {
        // TODO: Retrieve csv file from triplestore

        // TODO: parse csv file

    } catch (err) {
        return handleGenericError(err, next);
    }

    // if all went well, we respond with 200 (success)
    res.sendStatus(200);
});

// use mu errorHandler middleware.
app.use(errorHandler);
