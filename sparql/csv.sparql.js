import { sparqlEscapeString, sparqlEscapeUri } from 'mu';
import { querySudo as query } from '@lblod/mu-auth-sudo';

const PREFIXES = `
		PREFIX mu: ${sparqlEscapeUri('http://mu.semte.ch/vocabularies/core/')}
		PREFIX nie: ${sparqlEscapeUri('http://www.semanticdesktop.org/ontologies/2007/01/19/nie#')}
		PREFIX nfo: ${sparqlEscapeUri('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#')}
`;

export async function findCsvFleById(uuid) {
    console.log('UUID: ', uuid);
    const q = await query(`
     ${PREFIXES}          
     SELECT ?fileUrl       
     WHERE {
        GRAPH ?graph {
            ?uri        mu:uuid             ${sparqlEscapeString(uuid)} .
            ?fileUrl     nie:dataSource      ?uri .
        }
     }
    `);

    console.log(q.results.bindings);

    return q.results.bindings.length ? q.results.bindings[0]: null;
}
