## Concept
In this project I am trying things out with d3. I want to create a stacked bar chart that shows the amount of parkingspaces and how many of those spaces are accessible for people with a phisical limitation. I want to categorize these parkingspaces per province in the Netherlands. If you want to read more about my research and findings about d3, please visit [my wiki](https://github.com/marcoFijan/frontend-data/wiki)

## Features
As of now, this project has the following features:
* A big datacollection will be collected from [here](https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json) in combination with the corseverywhere herokuapp to access the data from my localhost
* That datacollection will be filtered with only the needed data for my visualisation
* The filtered datacollection will be cleaned (all undefined values will be edited in to usable data)
* The filtered datacollection will be saved in an array and given to the Chart
* The chart will be visualized with the power of d3

## Data used
For this project I am using a big dataset of RDW. Here are all the little datasets from the RDW website combined which makes the data for many categories more complete.
All collected data in data.json is originally from [RDW](https://npropendata.rdw.nl/parkingdata/v2/). To read the data yourself, please navigate to [this link](https://npropendata.rdw.nl/parkingdata/v2/)

## Live Deploy Link
To just try the project without the downloading hastle navigate to the [live deploy](https://marcofijan.github.io/frontend-data/)

## Credits and License
* RDW for collecting and documenting the dataset
* Sharon Veldman for hoisting the dataset
* Curan for the amazing explanation of D3
* Laurens Aarnoudse for explaining how to avoid the CORS error
* Rijk van Zanten for explaining how to connect multiple datasets with eachother
