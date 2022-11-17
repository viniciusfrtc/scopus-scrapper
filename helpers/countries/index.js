import escapedCountriesMap from './allCountries.js'
import countriesAliases from './countriesAliases.js'

export default (countries, excludeOthers) => {
    const countriesToInclude = []
    const includedCountriesSet = new Set()
    for (const country of countries) {
        if (countriesAliases[country]) {
            countriesToInclude.push(`AFFILCOUNTRY(${countriesAliases[country].join(' OR ')})`)
            countriesAliases[country].forEach(country => includedCountriesSet.add(country))
        } else if (escapedCountriesMap[country]) {
            countriesToInclude.push(`AFFILCOUNTRY(${escapedCountriesMap[country]})`)
            includedCountriesSet.add(escapedCountriesMap[country])
        }
    }
    if (excludeOthers) {
        const countriesToExclude = []
        for (const country of Object.keys(escapedCountriesMap)) {
            if (!includedCountriesSet.has(escapedCountriesMap[country])) {
                countriesToExclude.push(escapedCountriesMap[country])
            }
        }
        return `${countriesToInclude.join(' AND ')} AND NOT AFFILCOUNTRY(${countriesToExclude.join(' OR ')})` 
    }
    return `${countriesToInclude.join(' AND ')}` 
}