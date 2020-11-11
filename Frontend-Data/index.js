//## SET DATA CLEANING VARIABLES ##
const proxyURL = 'https://cors-anywhere.herokuapp.com/' // proxylink from Laurens Aarnoudse: Needed for https request for getting the data from local host
const parkingSpecsURL = 'https://raw.githubusercontent.com/marcoFijan/hostRDWData/main/data.json'
const provinces = ['groningen', 'friesland', 'overijssel', 'drenthe', 'gelderland', 'limburg', 'noord-brabant', 'zuid-holland', 'noord-holland', 'zeeland', 'utrecht', 'flevoland']

//## SET D3 VARIABLES ##
//-- General --
const svg = d3.select('svg')
let data
let g
//-- Position & Size --
const width = 700
const height = 400
const margin = { left: 70, right: 20, bottom: 60, top: 50 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
//-- Y & X Values --
const stackGenerator = d3.stack().keys(['totalDisabledCapacity', 'totalNotDisabledCapacity'])
const valueX = d => d.province // d.data.province
let valueY
//-- Scales --
let colorScale
let scaleY
let scaleX

//## Receiving the data ##
const parkingOverviewRequest = d3.json(proxyURL + parkingSpecsURL)
  .then(parkingOverview => {
    console.log(parkingOverview)
    console.log(parkingOverview.filter(garage => garage.disabledAccess === true))
    const capacityPerLocationCollection = provinces.map(province => {
      const parkingOverviewFiltered = filterUnknown(parkingOverview)
      const capacityPerLocation = getCapacityPerLocation(parkingOverviewFiltered, province)
      const sumOfGarages = getSumOfGarages(capacityPerLocation)
      const sumOfDisabledGarages = getSumOfDisabledGarages(capacityPerLocation)
      const sumOfCapacity = getSumOfCapacity(capacityPerLocation)
      const sumOfDisabledCapacity = getSumOfDisabledCapacity(capacityPerLocation)
      const percentageDisabledCapacity = getPercentage(sumOfCapacity, sumOfDisabledCapacity)
      return {
        province: province,
        totalAmountGarages: sumOfGarages,
        totalAMountDisabledGarages: sumOfDisabledGarages,
        totalCapacity: sumOfCapacity,
        totalDisabledCapacity: sumOfDisabledCapacity,
        totalNotDisabledCapacity: (sumOfCapacity - sumOfDisabledCapacity),
        percentageAvailible: percentageDisabledCapacity,
        percentageNotAvailible: (100 - percentageDisabledCapacity)
      }
    })
    console.log(capacityPerLocationCollection)
    data = capacityPerLocationCollection
    createDiagram()
  })

const filterUnknown = function(parkingGarages){
   return parkingGarages.filter(garage => garage.location)
}

const cleanDisabledAccess = function(parkingGarage){
  if (parkingGarage.parkingFacilityInformation.limitedAccess == false){
    console.log(':(')
  }
  else if (parkingGarage.parkingFacilityInformation.limitedAccess == true)
  console.log(':)')
}

const getCapacityPerLocation = function(usefullDataArray, location){
  return usefullDataArray.filter(garage => garage.location.toLowerCase() === location)
}

const getSumOfGarages = function(capacityPerLocation){
  return capacityPerLocation.length
}

const getSumOfDisabledGarages = function(capacityPerLocation){
  return capacityPerLocation.reduce((sum, garage) => {
    if(garage.disabledAccess){
      console.log('found!')
      return sum + 1
    }
    return sum

  } ,0)
}

const getSumOfCapacity = function(capacityPerLocation){
  return capacityPerLocation.reduce((sum, garage) => sum + garage.capacity ,0)//Help from Fun Fun Functions: https://www.youtube.com/watch?v=Wl98eZpkp-c
  // console.log(total)
}

const getSumOfDisabledCapacity = function(capacityPerLocation){
  return capacityPerLocation.reduce((sum, garage) => {
    if(garage.disabledAccess){
      // console.log('found!', garage.location)
      return sum + garage.capacity
    }
    return sum

  } ,0)//Help from Fun Fun Functions: https://www.youtube.com/watch?v=Wl98eZpkp-c
}

const getPercentage = function(totalCapacity, disabledCapacity){
  return disabledCapacity / (totalCapacity / 100)
}

//## D3 LOGIC ##
const createDiagram = function() {
  // Set d3 variables
  valueY = stackGenerator(data)
  g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Create Diagram
  setScales()
  setAxises()
  drawBar()
}

const setScales = function(){
  colorScale = d3.scaleOrdinal()
    .domain(['totalDisabledCapacity', 'totalNotDisabledCapacity'])
    .range(['green', 'red'])

  scaleY = d3.scaleLinear()
    .domain([d3.max(valueY, layer => d3.max(layer, subLayer => subLayer[1])), 0])
    .range([0, innerHeight])
    .nice()

  scaleX = d3.scaleBand()
    .domain(data.map(valueX)) // Select all the provinces for the domain
    .range([0, innerWidth])
    .padding(0.2)
}

const setAxises = function(){
  const yAxis = d3.axisLeft(scaleY)
    .tickSize(-innerWidth)

  const xAxis = d3.axisBottom(scaleX)

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
}

const drawBar = function(){
  g.selectAll('.layer').data(valueY)
    .enter().append('g')
    .attr('class', 'layer')
    .attr("fill", d => colorScale(d.key))
    .selectAll('rect').data(d => d)
      .enter().append('rect')
        .attr('x', d => scaleX(d.data.province))
        .attr('y', d => scaleY(d[1]))
        .attr('height', d => scaleY(d[0]) - scaleY(d[1]))
        .attr('width', scaleX.bandwidth())
}
