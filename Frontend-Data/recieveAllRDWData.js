const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const overviewRDWUrl = 'https://npropendata.rdw.nl/parkingdata/v2/'

async function setupData(){
  const parkingOverview = await getData(proxyUrl+overviewRDWUrl)
  console.log(parkingOverview)
  const combinedData = await combineData(parkingOverview)
  console.dir(combinedData)
  document.getElementById('test').addEventListener('click', download_txt(combinedData))
}

async function combineData(parkingOverview){
  const parkingOverviewSliced = parkingOverview.ParkingFacilities
  const parkingIdentifiers = parkingOverviewSliced.map(garage => garage.identifier)
  console.log(parkingIdentifiers)
  const baseUrl = proxyUrl + overviewRDWUrl + 'static/'

  parkingFacilityArray = parkingIdentifiers.map(identifier => getData(baseUrl+identifier))
  console.log(parkingFacilityArray)
  const dataCollection = await Promise.all(parkingFacilityArray)
  const dataCollectionArray = dataCollection.map(garage => garage.parkingFacilityInformation)
  return dataCollectionArray
}

let counter = 0

async function getData(url){
  const parkingOverview = await d3.json(url)
  setTimeout('', 2000)
  console.log(counter++)
  return parkingOverview
}

function download_txt(data) {
  const textToSave = JSON.stringify(data)
  const hiddenElement = document.createElement('a')

  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave)
  hiddenElement.target = '_blank'
  hiddenElement.download = 'myFile.txt'
  hiddenElement.click()
}

setupData()
