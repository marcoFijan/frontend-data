const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
// const proxyUrl = 'https://cors-proxy.htmldriven.com/'

const overviewRDWUrl = 'https://npropendata.rdw.nl/parkingdata/v2/'

async function setupData(){
  const parkingOverview = await getData(proxyUrl+overviewRDWUrl)
  console.log(parkingOverview)
  const combinedData = await combineData(parkingOverview)
  console.dir(combinedData)
  download_txt(combinedData)
}

async function combineData(parkingOverview){
  const parkingOverviewSliced = parkingOverview.ParkingFacilities
  const parkingIdentifiers = parkingOverviewSliced.map(garage => garage.identifier)
  console.log(parkingIdentifiers)
  const baseUrl = proxyUrl + overviewRDWUrl + 'static/'

  parkingFacilityArray = parkingIdentifiers.map(identifier => getData(baseUrl+identifier))
  console.log(parkingFacilityArray)
  const dataCollection = await Promise.all(parkingFacilityArray)
  const dataCollectionArray = dataCollection.map(garage => {
    // console.log(garage)
    // cleanLocation(garage)
    // cleanCapacity(garage)
    // console.log('cleaned:', garage)
    return {
      location: getLocationIfExist(garage),
      capacity: getCapacityIfExist(garage),
      disabledAccess: getDisabledAccessIfExist(garage)
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
  if ((typeof garage.parkingFacilityInformation.operator == 'undefined') || (typeof garage.parkingFacilityInformation.operator.postalAddress == 'undefined')){
    return null
  }

  else if (garage.parkingFacilityInformation.operator.postalAddress.province !== 'undefined'){
    console.log(garage.parkingFacilityInformation.operator.postalAddress.province)
    return garage.parkingFacilityInformation.operator.postalAddress.province
  }
  return null
}

function getCapacityIfExist(garage){
  if ((typeof garage.parkingFacilityInformation.specifications == 'undefined') || (garage.parkingFacilityInformation.specifications[0] == null) || (typeof garage.parkingFacilityInformation.specifications[0] == 'undefined') || (typeof garage.parkingFacilityInformation.specifications[0].capacity == 'undefined')){
    return null
  }

  else if (typeof garage.parkingFacilityInformation.specifications[0].capacity !== 'undefined'){
    return garage.parkingFacilityInformation.specifications[0].capacity
  }
  return null
}

function getDisabledAccessIfExist(garage){
  if ((typeof garage.parkingFacilityInformation.specifications == 'undefined') || (garage.parkingFacilityInformation.specifications[0] == null) || (typeof garage.parkingFacilityInformation.specifications[0] == 'undefined') || (typeof garage.parkingFacilityInformation.specifications[0].capacity == 'undefined')){
    return null
  }

  else if (typeof garage.parkingFacilityInformation.specifications[0].disabledAccess !== 'undefined'){
    return garage.parkingFacilityInformation.specifications[0].disabledAccess
  }
  return null
}

function download_txt(data) {
  //SOURCE FOR BASE IDEA: https://stackoverflow.com/questions/33531158/export-from-variable-to-json-file
  const parkingDataCollection = JSON.stringify(data)
  const hiddenElement = document.createElement('a')

  hiddenElement.href = 'data:attachment/text,' + encodeURI(parkingDataCollection)
  hiddenElement.target = '_blank'
  hiddenElement.download = 'myFile.txt'
  hiddenElement.click()
}

setupData()
