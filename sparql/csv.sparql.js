import { query, sparqlEscapeString, sparqlEscapeUri } from 'mu';

const PREFIXES = `
    PREFIX mu: ${sparqlEscapeUri('http://mu.semte.ch/vocabularies/core/')}
    PREFIX nie: ${sparqlEscapeUri('http://www.semanticdesktop.org/ontologies/2007/01/19/nie#')}
    PREFIX nfo: ${sparqlEscapeUri('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#')}
    PREFIX dbpedia: ${sparqlEscapeUri('http://dbpedia.org/ontology/')}
`;

export async function findCsvFleLocationById(uuid) {
    const q = await query(`
     ${PREFIXES}          
     SELECT ?fileUrl ?extension
     WHERE {
            ?uri            mu:uuid                   ${sparqlEscapeString(uuid)} ;
                            dbpedia:fileExtension      ?extension .
            ?fileUrl         nie:dataSource            ?uri .
     }
    `);

    let path = q.results.bindings.length ? q.results.bindings[0].fileUrl.value : null;
    const extension = q.results.bindings.length ? q.results.bindings[0].extension.value : null;

    if (path) {
        // reformat the file path
        path = path.replace('share://', '/share/');
    }

    return {path, extension};
}
