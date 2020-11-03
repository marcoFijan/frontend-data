const proxyURL = 'https://cors-anywhere.herokuapp.com/' // proxylink from Laurens Aarnoudse: Needed for https request for getting the data from local host
const parkingSpecsURL = 'https://opendata.rdw.nl/resource/b3us-f26s.json'

const svg = d3.select('svg')
const width = 700
const height = 400

//Receiving the data
const parkingSpecsOverview = d3.json(proxyURL + parkingSpecsURL)
  .then(parkingOverview => {
    // const parkingAreaManagerId = parkingOverview.forEach(parkingGarage => console.log(parkingGarage.areamanagerid))
    const splittedParkingOverview = parkingOverview.slice(0, 10)
    console.log(splittedParkingOverview)
    // const ParkingFacilitiesOverview = parkingOverview.ParkingFacilities
    // const parkingLocation = ParkingFacilitiesOverview.filter(checkLocation)
    // parkingLocation.forEach(location => console.log(location.name, location.limitedAccess))
    createDiagram(splittedParkingOverview)
  })

//D3 Logic
const createDiagram = data => {
  const scaleX = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.chargingpointcapacity)])
    .range([0, width])

  const scaleY = d3.scaleBand()
    .domain(data.map(d => d.areamanagerid))
    .range([0, height])

  svg.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => scaleY(d.areamanagerid))
      .attr('width', d => scaleX(d.chargingpointcapacity))
      .attr('height', scaleY.bandwidth())
}
