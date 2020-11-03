const proxyURL = "https://cors-anywhere.herokuapp.com/" // proxy from Laurens
const overviewURL = "https://npropendata.rdw.nl/parkingdata/v2/"

const parkingLocationOverview = d3.json(proxyURL + overviewURL)
  .then(parkingOverview => {
    console.log("overview", parkingOverview)
    const ParkingFacilitiesOverview = parkingOverview.ParkingFacilities
    console.log('ParkingFacilities:', ParkingFacilitiesOverview)
    const parkingLocation = ParkingFacilitiesOverview.filter(checkLocation)
    console.log('limitedAccessCity:', parkingLocation)
    const limitedAccessOverview = parkingLocation.map(parkingIndex => parkingIndex.limitedAccess)
    console.log('limitedAccessOverview:', limitedAccessOverview)
  })

const checkLocation = function(locationName){
  try{
    return locationName.name.toLowerCase().includes('groningen')
  }
  catch{
    console.log('no name found')
  }
  // let place = locationName.name.includes('tilburg')
  // console.log(place)
  // place.indexOf('tilburg') > -1
}
