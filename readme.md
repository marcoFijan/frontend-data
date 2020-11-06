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

## How to install and use
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

## Live Deploy Link
To just try the project without the downloading hastle navigate to the [live deploy](https://marcofijan.github.io/frontend-data/)

## Credits and License
* RDW for collecting and documenting the dataset
* Sharon Veldman for hoisting the dataset
* Curan for the amazing explanation of D3
* Laurens Aarnoudse for explaining how to avoid the CORS error
* Rijk van Zanten for explaining how to connect multiple datasets with eachother
