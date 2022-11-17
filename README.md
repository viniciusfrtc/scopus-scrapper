Simple project to scrap data from Scopus API for a friend.

Usage example:
1. create some folder with JSON files following this format:
```
{
    "startYear": 1980,
    "finishYear": 2021,
    "subjectAreas": [
        "All"
    ],
    "countries": [
        "China"
    ],
    "excludeOthers": false,
    "onlyPublishedArticles": true
}
```
2. run ```node index.js ${queriesFolderName}```
3. CSV files for given queries will be saved on outputs/

