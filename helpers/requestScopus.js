import fetch from 'node-fetch'

const throttle =  () => new Promise(resolve => setTimeout(async () => resolve(console.log('throttled!')), 300))

const getTotalResults = response => response['search-results']['opensearch:totalResults']

export default async query => {
    const endpoint = `https://api.elsevier.com/content/search/scopus?count=1&${query}&apiKey=${process.env.API_KEY}`
    await throttle()
    const res = await fetch(endpoint)
    const response = await res.json()
    return {
        endpoint,
        totalResults: getTotalResults(response),
    }
}
