# Functional programming & Frontend data

Student name: Marco Fijan
[Live deploy link](https://marcofijan.github.io/functional-programming/)

[![afbeelding.png](https://i.postimg.cc/zG3CD1MJ/afbeelding.png)](https://postimg.cc/RW56G248)

## The Assignment
The Volkskrant asked me to give interesting insights about 'the car in the city' for a potential interesting article. It's my job to research the RDW datasets for interesting insights. The Volkskrant will write an article about it if I find something interesting. As a tip, the Volkskrant gave me the link to the RDW datasets, but I am free to chose and use other datasets as well.

## Contents
This repository has been seperated into multimple projects.

### Frontend-Data
This is a project where I tried several things with data and d3.

I received a big dataset from an API and saved that onto a smaller file with specific data needed for my concept. I also cleaned up the data that I received. The dataset was pretty messy so it needed some cleaning when the data was missing.
Besides receiving and cleaning the data, I also visualized the data with d3. Here I made a stacked bar chart which shows how many parkingspots are availible for people with a phisical limitation. I seperate those parkingspots with provinces.

### Functional-Programming
This project has 2 different side-projects: EnqueteData & RDWData.

#### EnqueteData
In EnqueteData I am writing a simple project where I gather the data from a dataset from a json file. The user can receive certain columns from the dataset by using the textbox on the HTMLpage. After the user typed his or her query, the program will then check if the user typed a valid input. If the input is valid, the program will try to 'clean' the data. Empty values, wrong format values and whitespaces will be fixed. If the program is unable to fix a certain value, the program will return a warning but continue with the other values. That way the user will still receive his or her preferred column.
For more information about the development of this project, navigate to [my wiki](https://github.com/marcoFijan/frontend-data/wiki/Opschonen-van-Data)

#### RDWData
I am writing a simple project where I am practising with receiving data from an api. I'm using the same html and textinput from my previous project in this repo. I will try to collect specific columns and clean them. Besides that I will compare columns with eachother to find interesting data. For the data I will be using different api's from RDW. I want to find answers for my main question

I'm planning to make an interactive parkingarea that will visualize per city how many parkingspots are availible for people with a phisical limitation

This was just the beginning of cleaning the RDW-data. Please navigate to my [Frontend Data](https://github.com/marcoFijan/frontend-data/tree/master/Frontend-Data) section in the repo.

## Concept
I want to visualize the accessibility with percentages of availible parking spaces. I want to use a parkingarea and color these according to their accessibility:
[![Artboard-1-copy-5-100.jpg](https://i.postimg.cc/PrXQF6j2/Artboard-1-copy-5-100.jpg)](https://postimg.cc/xqZmX3qz)

The green parking spots are parking areas in percentage that are accessible for phisical handicapped people. The red parking areas is the amount of percentage of parking areas not accessible for phisical handicapped people.
The user can sort the data by location on the right side of the screen.
Below the visualisation the user can dive deeper into the data.

### Research Questions
According to [this dataset from the Central Bureau of Statistics of the Netherlands](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83674NED/table?ts=1603802261246), a lot of citizenry have one or more phisical limitation. More then 13% has a phisical limitation. Still, according to the RDWDataset, most parkinggarages are not accessible for those citizenry. I want to research how many parkingspots are availible per province, and how many are required in percentage according to the numbers of the Central Bureau of Statistics.

#### Main Research Question:
Which province in the Netherlands is the best province to live for people with a phisical limitation when you look at the accessibility of parkingspots?

#### Supporting sub-Questions
* What is the ratio of the overall capacity and availible parking spaces for people with a disability per province?
* What is the ratio of the total number of parking garages and accessible parking garages for people with a disability per province?
* What is the percentage of people with a physical disability per province?


## Used data
This is the data I used per project:

### Frontend data
Before I can visualize my concept, I need to collect the data that I need:

I wanted to collect my data from [different RDWDatasets](https://opendata.rdw.nl/browse?category=Parkeren&provenance=official&page=1). Unfortunatly, many datasets were incomplete or couldn't be linked together. So I chose for the [big RDWDataset](https://npropendata.rdw.nl/parkingdata/v2/) where all data could be fetched.

From the dataset I need the following data:
* **DisabledAccess**: _boolean_ which shows if parking garage is accessible for people with a phisical handicap
* **Capacity**: _integer_ that gives the amount of parkingspots of that garage
* **Province**: _string_ that gives the province where the parking garage is located

To read how I received and saved the data, please navigate to [receiving the data wiki](https://github.com/marcoFijan/frontend-data/wiki/Ophalen-van-Data) where I go into detail on how I collected and saved that data.

### Functional Programming
#### EnqueteData
For this project I am using a dataset of an enquëte from Datavisualisatie 2. This dataset contains several interesting insights about CMD-students. This dataset has been created by Jan-Jaap Rijpkema and converted into json by Jonah Meijers.
The data for this dataset has been collected in September from CMD-students who are in the beginning of their third year.

For this project I used the following data:
* **oogKleur**: _string_ that should give a hex-colorcode

#### RDWData
Aw of now, the only data used in this project is one api from RDW with specific data of parkingarea's (capacity, maximum height, maximum weight etc...)
[RDWData: Parking Specifications API](https://opendata.rdw.nl/resource/b3us-f26s.json)

In this project I used the following datacolumns for testing, but all columns can be used:
* **capacity**: _integer_ that gives the capacity of the parking area
* **disabledAccess**: _boolean_ about the accessibility of the parking garage for people with a phisical handicap

## Features

### Frontend Data
As of now, this project has the following features:
* A big datacollection will be collected from [here](https://npropendata.rdw.nl/parkingdata/v2/) in combination with the corseverywhere herokuapp to access the data from my localhost
* That datacollection will be filtered with only the needed data for my visualisation and be resaved as a new file
* That file will be hosted on a new location
* The new data will be cleaned (all undefined values will be edited in to usable data)
* The new data will be saved in an array and given to the Chart
* The chart will be visualized with the power of d3
* The chart will show a stacked barchart
* The barchart will show the amount of accessible parkingspots for people with a phisical handicap
* The barchart will also show the amount of inaccessible parkingspots for people with a phisical handicap

### Functional Programming

#### EnqueteData
As of now, this project has the following features:
* User can give input on which column he or she wants to see in the console
[![1.png](https://i.postimg.cc/MT6nVypX/1.png)](https://postimg.cc/Tys2X5mX)
* UserInput will be checked and converted to a valid input if possible
[![2.png](https://i.postimg.cc/7PQ5JJ8Y/2.png)](https://postimg.cc/CdkhW1xW)
* The column 'oogKleur' will be coverted and cleaned into usable data
[![3.png](https://i.postimg.cc/vmMTwW9X/3.png)](https://postimg.cc/jDgtznMJ)

#### RDWData
As of now, this project has the following features:
* Project will make a connection to an api from RDW
* User can give input on which column he or she wants to see in the console


## Examples used
* For to basics of getAllRDWData.json I used the [example of Laurens Aarnoudse](https://vizhub.com/Razpudding/c2a9c9b4fde84816931c404951c79873?edit=files&file=index.js)
```javascript
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const overviewUrl = 'https://npropendata.rdw.nl/parkingdata/v2/'

//#####################################################

const allParkingFacilities = await getData(proxyUrl+overviewUrl)
const preparedData = await prepareData(allParkingFacilities, settings.remoteParkingsAmount)
//This step is only useful while exploring the data and shouldn't be in production code
inspectData(preparedData)

//#####################################################

async function getData(url){
  let data = await d3.json(url)
  return data
}

```
* For the basic d3 barchart I used the [example of curran](https://www.youtube.com/watch?v=_8V5o2UHG0E&t=17327s&ab_channel=freeCodeCamp.org)
```javascript
const svg = d3.select('svg')
const margin = { left: 70, right: 20, bottom: 100, top: 50 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

// #############################################

const yAxis = d3.axisLeft(scaleY)
  .tickSize(-innerWidth)

const xAxis = d3.axisBottom(scaleX)

const yAxisGroup = g.append('g')
  .call(yAxis)
  .attr('class', 'yAxis')

yAxisGroup.select('.domain').remove()

yAxisGroup.append('text')
  .attr('y', -50)
  .attr('x', -(innerHeight / 2))
  .attr('transform', 'rotate(-90)')
  .attr('class', 'yAxisName')
  .text('Aantal parkeerplaatsen')

const xAxisGroup = g.append('g').call(xAxis)
  .attr('transform', 'translate(0,' + innerHeight + ')')
  .attr('class', 'xAxis')

xAxisGroup.selectAll('text')
  .attr('transform', 'rotate(45)')

xAxisGroup.selectAll('.domain, .tick line').remove()

xAxisGroup.append('text')
  .attr('y', 80)
  .attr('x', innerWidth / 2)
  .attr('class', 'xAxisName')
  .text('Provincies')

g.append('text')
  .text('Aantal parkeerplaatsen per provincie')
  .attr('y', -20)
  .attr('x', innerWidth / 2)
  .attr('class', 'title')
}
```  
* To understand how stack worked in d3, I used the example of [the Muratorium](https://www.youtube.com/watch?v=bXN9anQN_kQ&t)
```javascript
g.selectAll('.layer').data(valueY)
  .enter().append('g')
  .attr('class', 'layer')
  .attr("fill", d => colorScale(d.key))
  .selectAll('rect').data(d => d)
    .enter().append('rect')
      .attr('x', d => scaleX(d.data.province))
      .attr('y', d => scaleY(d[1]))
      .attr('width', scaleX.bandwidth())
      .attr("height", 0) // set height 0 for the transition
      .transition().duration(800)
      .attr('height', d => scaleY(d[0]) - scaleY(d[1]))
```
* To understand how the update function exactly works I used the [example of Laurens Aarnoudse](https://vizhub.com/Razpudding/c2a9c9b4fde84816931c404951c79873?edit=files&file=index.js)
```javascript
bars
  .attr('x', d => x(d.description))
  .attr('y', d => y(d.capacity))
  .attr('width', x.bandwidth())
  .attr('height', d => height - y(d.capacity))
```

## Getting started guide
### OPTION 1: Cloning git
To try this project for yourself, you can clone the github repo to your locale machine. Just follow these steps
#### STEP 1: Create your local git repository
Navigate with your terminal to the desired folder where you want to clone this repo
```
cd "c:/foldername1/foldername2/destination"
```

**Optional** Use this command to create a new folder where you want to clone this repo.
```
mkdir "foldername"
```
**Optional** Don't forget to navigate to that folder with using the cd command


**Optional** If you desire to make changes to this project run this command to make that possible
```
git init
```

#### STEP 2: git clone
To clone this project and receive it on your locale machine, use this command
```
git clone https://github.com/marcoFijan/frontend-data.git
```

After this command your computer will download the files automaticly

#### STEP 3: Launching
Navigate to the folder where you cloned the git repository and launch the index.html

#### STEP 4: Open console
To see your results, you need to look in the console
Right-click on the webpage and click 'inspect' or 'inspect element'
Then, click on the tab called 'console'

That's it. You are all set up!

### OPTION 1: Download manually
#### STEP 1: Download the files
Navigate to the code on Github and press the 'code' button. After pressing the 'code' button select 'download as zip'
[![afbeelding.png](https://i.postimg.cc/4xkw1zt8/afbeelding.png)](https://postimg.cc/9rbGmwLT)

#### STEP 2: Unzipping
After downloading the files navigate to a folder of your choice and copy the files from the zip folder to that folder.

#### STEP 3: Launching
Navigate to that folder where you put the files and launch the index.html

#### STEP 4: Open console
To see your results, you need to look in the console
Right-click on the webpage and click 'inspect' or 'inspect element'
Then, click on the tab called 'console'

That's it. You are all set up!


## Credits

### Survey Data
* All the studens from the data visualisation track who filled in the enquete
* Jan-Jaap Rijpkema for collecting the dataset
* Jonah Meijers for converting the dataset to .json

### Collecting Data
* Rijk van Zanten for explaining how to connect multiple datasets with eachother
* Laurens Aarnoudse for explaining how to avoid the CORS error

### D3
* [The Muratorium](https://www.youtube.com/watch?v=bXN9anQN_kQ&t) for explaining stack in d3
* [Curan](https://www.youtube.com/watch?v=_8V5o2UHG0E&t=17327s&ab_channel=freeCodeCamp.org) for the amazing explanation of D3

### Other
* Laurens Aarnoudse for the live code demo's and explaining functional programming
* Chelsea Doeleman for tips on how to make better functional programming functions
* RDW for collecting and documenting the dataset
* The Volkskrant for giving tips and feedback
* stackoverflow for multiple difficult code (see index.js for the sources)

## License & Resources

### Datasets
* [RDWD Opendata: Specificaties](https://opendata.rdw.nl/resource/b3us-f26s.json)
* [NPRO Opendata: ParkingFacilities](https://npropendata.rdw.nl/parkingdata/v2/)
* [CBS Statline: Gezondheidsmonitor](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83674NED/table?ts=1603802261246)

### Hosting code
* [Github](https://marcofijan.github.io/frontend-data/Frontend-Data/index.html)
