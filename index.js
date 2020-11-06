const proxyURL = 'https://cors-anywhere.herokuapp.com/' // proxylink from Laurens Aarnoudse: Needed for https request for getting the data from local host
const parkingSpecsURL = 'https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json'

// const margin = { left: 200, right: 50, bottom: 50, top: 50 }
const svg = d3.select('svg')
const width = 700
const height = 400

//Receiving the data
const parkingSpecsOverview = d3.json(proxyURL + parkingSpecsURL)
  .then(parkingOverview => {
    return getUsefullDataArray(parkingOverview)
  })
  .then(usefullDataArray => {
    console.log(usefullDataArray)
    return getCapacityPerLocation(usefullDataArray, 'drenthe')
  })
  .then(capacityPerLocation => {
    console.log(capacityPerLocation)
  })

// const cleanDisabledAccess = function(parkingGarage){
//   if (parkingGarage.parkingFacilityInformation.limitedAccess == false){
//     console.log(':(')
//   }
//   else if (parkingGarage.parkingFacilityInformation.limitedAccess == true)
//   console.log(':)')
// }

const getUsefullDataArray = async function(dataArray) {
  const usefullDataArray = dataArray.map(parkingGarage => {
    cleanLocation(parkingGarage)
    cleanCapacity(parkingGarage)
    // cleanDisabledAccess(parkingGarage)
    return {
      location: parkingGarage.parkingFacilityInformation.operator.postalAddress.province,
      capacity: parkingGarage.parkingFacilityInformation.specifications[0].capacity,
      disabledAccess: parkingGarage.parkingFacilityInformation.limitedAccess
    }
  })
  console.log(usefullDataArray)
  return usefullDataArray
}

const getCapacityPerLocation = function(usefullDataArray, location){
  return usefullDataArray.filter(garage => garage.location.toLowerCase() === location)
}

const cleanLocation = function(parkingGarage){
  if (typeof parkingGarage.parkingFacilityInformation.operator.postalAddress == 'undefined'){
    parkingGarage.parkingFacilityInformation.operator.postalAddress = {province: 'unknown'}
  }
}

const cleanCapacity = function(parkingGarage){
  if (typeof parkingGarage.parkingFacilityInformation.specifications[0].capacity == 'undefined'){
    parkingGarage.parkingFacilityInformation.specifications[0].capacity = 0
  }

}

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
