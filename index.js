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
  const valueY = d => d.capacity = +d.capacity
  const valueX = d => d.areamanagerid
  const margin = { left: 70, right: 20, bottom: 60, top: 50 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const scaleY = d3.scaleLinear()
    .domain([d3.max(data, valueY), 0])
    .range([0, innerHeight])
    .nice()
    // console.log(scaleY.range())
    console.log(scaleY.domain())

  const scaleX = d3.scaleBand()
    .domain(data.map(valueX))
    .range([0, innerWidth])
    .padding(0.2)

  const yAxis = d3.axisLeft(scaleY)
    .tickSize(-innerWidth)

  const xAxis = d3.axisBottom(scaleX)


  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const yAxisGroup = g.append('g').call(yAxis)
  yAxisGroup.select('.domain').remove()

  yAxisGroup.append('text')
    .attr('y', -50)
    .attr('x', -(innerHeight / 2))
    .attr('transform', 'rotate(-90)')
    .attr('class', 'yAxisName')
    .text('Aantal parkeerplaatsen')

  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', 'translate(0,' + innerHeight + ')')

  xAxisGroup.selectAll('.domain, .tick line').remove()

  xAxisGroup.append('text')
    .attr('y', 40)
    .attr('x', innerWidth / 2)
    .attr('class', 'xAxisName')
    .text('areaManagerId')

  g.append('text')
    .text('Aantal parkeerplaatsen per areaManagerId')
    .attr('y', -20)
    .attr('x', innerWidth / 2)
    .attr('class', 'title')

  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('x', d => scaleX(valueX(d)))
      .attr('y', d => scaleY(valueY(d)))
      .attr('height', d => innerHeight - scaleY(valueY(d)))
      .attr('width', scaleX.bandwidth())
}
