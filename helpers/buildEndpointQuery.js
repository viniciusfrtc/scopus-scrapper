export default (year, subjectArea, countriesFilter, onlyPublishedArticles) => {
    return `query=PUBYEAR IS ${year} AND SUBJAREA(${subjectArea}) AND ${countriesFilter}${onlyPublishedArticles ? ' AND DOCTYPE(ar)' : ''}`
}