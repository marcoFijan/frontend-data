// Variables
// const rawDataURL = 'https://opendata.rdw.nl/resource/b3us-f26s.json'
const rawParkingSpecsURL = 'https://opendata.rdw.nl/resource/b3us-f26s.json'
const userInput = document.querySelector(".userInput")
const userInputButton = document.querySelector(".userInputButton")
const capacity = 'capacity'
const accessibility = 'disabledaccess'

getData(rawParkingSpecsURL)
  .then(rawData => {
    return rawData.json()
   })
   .then(jsonData => {
     return getColumnData(jsonData, capacity, accessibility)
   })
   .then(columnData => {
     console.log(columnData)
     columnData.forEach(function (columnArray){
       console.log(columnArray)
       // columnArray.map(columnElements => Object.values(users)filterArray(columnElements))
     })
   })


// Fetch the data from the json-url
function getData(url) {
  return fetch(url)
}

async function getColumnData(dataArray, column1, column2){
  const columnList = []
  columnList.push(dataArray.map(value => value[column1]))
  columnList.push(dataArray.map(value => value[column2]))
  return columnList
}



function filterArray(array){
  const filteredArray = array.filter(function (el) {
    return el != null
  })
  return filteredArray
}
