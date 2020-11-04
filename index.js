const proxyURL = 'https://cors-anywhere.herokuapp.com/' // proxylink from Laurens Aarnoudse: Needed for https request for getting the data from local host
const parkingSpecsURL = 'https://opendata.rdw.nl/resource/b3us-f26s.json'

// const margin = { left: 200, right: 50, bottom: 50, top: 50 }
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
    const selectedParkingData = splittedParkingOverview.map(item => {
      return{
        areaManagerId: item.areamanagerid
      }
    })
    createDiagram(splittedParkingOverview)
  })

//D3 Logic
const createDiagram = data => {
  const valueX = d => d.capacity
  const valueY = d => d.areamanagerid
  const margin = { left: 20, right: 20, bottom: 20, top: 20 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const scaleX = d3.scaleLinear()
    .domain([0, d3.max(data, valueX)])
    .range([0, innerWidth])
    console.log(data)
    console.log(scaleX.domain())

  const scaleY = d3.scaleBand()
    .domain(data.map(valueY))
    .range([0, innerHeight])
    .padding(0.2)

  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  g.append('g').call(d3.axisLeft(scaleY))
  g.append('g').call(d3.axisBottom(scaleX))
    .attr('transform', 'translate(0,' + innerHeight + ')')


  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => scaleY(valueY(d)))
      .attr('width', d => scaleX(valueX(d)))
      .attr('height', scaleY.bandwidth())
}
