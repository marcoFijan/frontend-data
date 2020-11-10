const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const overviewRDWUrl = 'https://npropendata.rdw.nl/parkingdata/v2/'

async function setupData(){
  const parkingOverview = await getData(proxyUrl+overviewRDWUrl)
  console.log(parkingOverview)
  const combinedData = await combineData(parkingOverview)
  console.dir(combinedData)
  document.getElementById('button').addEventListener('click', download_txt(combinedData))
}

async function combineData(parkingOverview){
  const parkingOverviewSliced = parkingOverview.ParkingFacilities.splice(7450, 7500)
  const parkingIdentifiers = parkingOverviewSliced.map(garage => garage.identifier)
  console.log(parkingIdentifiers)
  const baseUrl = proxyUrl + overviewRDWUrl + 'static/'

  parkingFacilityArray = parkingIdentifiers.map(identifier => getData(baseUrl+identifier))
  console.log(parkingFacilityArray)
  const dataCollection = await Promise.all(parkingFacilityArray)
  const dataCollectionArray = dataCollection.map(garage => {
    console.log(garage)
    cleanLocation(garage)
    cleanCapacity(garage)
    console.log('cleaned:', garage)
    return {
      location: getLocationIfExist(garage),
      capacity: garage.parkingFacilityInformation.specifications[0].capacity,
      disabledAccess: garage.parkingFacilityInformation.limitedAccess
    }
  })
  return dataCollectionArray
}

let counter = 0

async function getData(url){
  const parkingOverview = await d3.json(url)
  setTimeout('', 2000)
  console.log(counter++)
  return parkingOverview
}

function getLocationIfExist(garage){
  if (typeof garage.parkingFacilityInformation.operator == 'undefined'){
    return null
  }

  else if (garage.parkingFacilityInformation.operator.postalAddress.province !== 'undefined'){
    return garage.parkingFacilityInformation.operator.postalAddress.province
  }
  
  else{
    return null
  }
}

const cleanLocation = function(parkingGarage){

  if (typeof parkingGarage.parkingFacilityInformation.operator == 'undefined'){
    console.log('changing')
    parkingGarage.parkingFacilityInformation = {operator: {postalAddress: {province: null}}}
  }

  else if (typeof parkingGarage.parkingFacilityInformation.operator.postalAddress == 'undefined'){
    parkingGarage.parkingFacilityInformation.operator.postalAddress = {province: null}
  }
}

const cleanCapacity = function(parkingGarage){
  if (typeof parkingGarage.parkingFacilityInformation.specifications == 'undefined'){
    parkingGarage.parkingFacilityInformation = {specifications: []}
    parkingGarage.parkingFacilityInformation.specifications[0] = {capacity: null}
  }

  else if (typeof parkingGarage.parkingFacilityInformation.specifications[0] == 'undefined' || null){
    parkingGarage.parkingFacilityInformation.specifications[0].capacity = null
  }

  else if (parkingGarage.parkingFacilityInformation.specifications[0] == null){
    parkingGarage.parkingFacilityInformation.specifications[0] = {capacity: null}
  }

  else if (typeof parkingGarage.parkingFacilityInformation.specifications[0].capacity == 'undefined'){
    parkingGarage.parkingFacilityInformation.specifications[0].capacity = null
  }
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
