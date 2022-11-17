import dotenv from 'dotenv'
import {writeFile, readdir} from 'node:fs/promises'
import { createRequire } from "module";

import {
    getYearsRange,
    getSubjectAreas,
    buildCountryFilter,
    buildEndpointQuery
} from './helpers/index.js'
import requestScopus from './helpers/requestScopus.js';

dotenv.config()

const require = createRequire(import.meta.url);

const csvHeaders = ['endpoint', 'totalResults', 'affiliationCountry', 'year', 'subjectArea']

const writeToOutput = (outputPath, data) => writeFile(outputPath, data, {flag: 'a'})

const runQuery = async (queriesFolder, queryFileName) => {
    const outputFileName = queryFileName.split('.')[0]
    const query = require(`./${queriesFolder}/${queryFileName}`)
    const yearsRange = getYearsRange(query.startYear, query.finishYear)
    const subjectAreas = getSubjectAreas(query.subjectAreas)
    const countries = buildCountryFilter(query.countries, query.excludeOthers)
    const outputPath = `./outputs/${outputFileName}-${new Date()}.csv`
    await writeToOutput(outputPath, csvHeaders.join(';') + '\n')
    for (const year of yearsRange) {
        for (const subjectArea of subjectAreas) {
            const endpointQuery = buildEndpointQuery(year, subjectArea, countries, query.onlyPublishedArticles)
            const {endpoint, totalResults} = await requestScopus(endpointQuery)
            const csvData = {
                endpoint,
                totalResults,
                affiliationCountry: query.countries,
                year,
                subjectArea
            }
            await writeToOutput(outputPath, `${csvHeaders.map(header => csvData[header]).join(';')}\n`)
        }
    }
}

;(async () => {
    const queriesFolder = process.argv[2]
    const queries = (await readdir(`./${queriesFolder}`))
    for (const query of queries) {
        await runQuery(queriesFolder, query)
    }
})()