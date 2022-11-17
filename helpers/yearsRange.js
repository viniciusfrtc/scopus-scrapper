export default (startYear, finishYear) => {
    const yearsRange = []
    for (let year = startYear; year <= finishYear; year++) {
        yearsRange.push(year)
    }
    return yearsRange
}