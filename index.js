const proxyURL = 'https://cors-anywhere.herokuapp.com/' // proxylink from Laurens Aarnoudse: Needed for https request for getting the data from local host
const overviewURL = 'https://npropendata.rdw.nl/parkingdata/v2/'
const cityLocation = 'groningen'

const svg = d3.select('svg')
//Receiving the data
const parkingLocationOverview = d3.json(proxyURL + overviewURL)
  .then(parkingOverview => {
    const ParkingFacilitiesOverview = parkingOverview.ParkingFacilities
    const parkingLocation = ParkingFacilitiesOverview.filter(checkLocation)
    parkingLocation.forEach(location => console.log(location.name, location.limitedAccess))
    createDiagram(parkingLocation)
  })

//
const checkLocation = location => {
  if(!location.name){
    location.name = 'ONBEKEND'
  }
  return location.name.toLowerCase().includes(cityLocation)
}

//D3 Logic
const createDiagram = data => {
  svg.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('width', 300)
      .attr('height', 300)
}
