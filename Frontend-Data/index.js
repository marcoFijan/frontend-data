// import { max } from 'd3'

const proxyURL = 'https://cors-anywhere.herokuapp.com/' // proxylink from Laurens Aarnoudse: Needed for https request for getting the data from local host
const parkingSpecsURL = 'https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json'
const provinces = ['groningen', 'friesland', 'overijsel', 'drenthe', 'gelderland', 'limburg', 'noord-brabant', 'zuid-holland', 'noord-holland', 'zeeland', 'utrecht', 'flevoland']


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
    const capacityPerLocationCollection = provinces.map(province => {
      const capacityPerLocation = getCapacityPerLocation(usefullDataArray, province)
      const sumOfCapacity = getSumOfCapacity(capacityPerLocation)
      const sumOfDisabledCapacity = getSumOfDisabledCapacity(capacityPerLocation)
      const percentageDisabledCapacity = getPercentage(sumOfCapacity, sumOfDisabledCapacity)
      return {
        province: province,
        totalCapacity: sumOfCapacity,
        totalDisabledCapacity: sumOfDisabledCapacity,
        totalNotDisabledCapacity: (sumOfCapacity - sumOfDisabledCapacity),
        percentageAvailible: percentageDisabledCapacity,
        percentageNotAvailible: (100 - percentageDisabledCapacity)
      }
    })
    // const capacityPerLocation = getCapacityPerLocation(usefullDataArray, 'drenthe')
    // getSumOfCapacity(capacityPerLocation)
    // count all capacity
    console.log(capacityPerLocationCollection)
    createDiagram(capacityPerLocationCollection)
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

const getCapacityPerLocation = function(usefullDataArray, location){
  return usefullDataArray.filter(garage => garage.location.toLowerCase() === location)
}

const getSumOfCapacity = function(capacityPerLocation){
  return capacityPerLocation.reduce((sum, garage) => sum + garage.capacity ,0)//Help from Fun Fun Functions: https://www.youtube.com/watch?v=Wl98eZpkp-c
  // console.log(total)
}

const getSumOfDisabledCapacity = function(capacityPerLocation){
  return capacityPerLocation.reduce((sum, garage) => {
    if(garage.disabledAccess){
      console.log('found!', garage.location)
      return sum + garage.capacity
    }
    return sum

  } ,0)//Help from Fun Fun Functions: https://www.youtube.com/watch?v=Wl98eZpkp-c
}

const getPercentage = function(totalCapacity, disabledCapacity){
  return disabledCapacity / (totalCapacity / 100)
}

//D3 Logic
const createDiagram = data => {
  const valueY = d => d.percentage
  const valueX = d => d.province // d.data.province
  const margin = { left: 70, right: 20, bottom: 60, top: 50 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const stackGenerator = d3.stack().keys(['totalDisabledCapacity', 'totalNotDisabledCapacity'])
  const stackedData = stackGenerator(data)
  console.log('stackeddata', stackedData)

  const colorScale = d3.scaleOrdinal()
    .domain(['totalDisabledCapacity', 'totalNotDisabledCapacity'])
    .range(['green', 'red'])

  const scaleY = d3.scaleLinear()
    .domain([d3.max(stackedData, layer => d3.max(layer, subLayer => subLayer[1])), 0])
    .range([0, innerHeight])
    .nice()
    console.log('domain', scaleY.domain())

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
    .text('Provincies')

  g.append('text')
    .text('Aantal parkeerplaatsen per provincie')
    .attr('y', -20)
    .attr('x', innerWidth / 2)
    .attr('class', 'title')

  g.selectAll('.layer').data(stackedData)
    .enter().append('g')
    .attr('class', 'layer')
    .attr("fill", d => colorScale(d.key))
    .selectAll('rect').data(d => d)
      .enter().append('rect')
        .attr('x', d => scaleX(d.data.province))
        .attr('y', d => scaleY(d[1]))
        .attr('height', d => scaleY(d[0]) - scaleY(d[1]))
        .attr('width', scaleX.bandwidth())
  //
  //
  // g.selectAll('rect').data(layers)
  //   .data(layer => layer)
  //     .enter().append('rect')
  //       .attr('class', 'layer')






  // g.selectAll('rect').data(data)
  //   .enter().append('rect')
  //     .attr('x', d => scaleX(valueX(d)))
  //     .attr('y', d => scaleY(valueY(d)))
  //     .attr('height', d => innerHeight - scaleY(valueY(d)))
  //     .attr('width', scaleX.bandwidth())
}
