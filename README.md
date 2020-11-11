# Functional programming

## Concept
This repo has been seperated into multimple projects.

### Frontend-Data
Here you will find a project where I tried several things with data and d3.

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

### Research Questions
According to the Central Bureau of Statistics of the Netherlands, a lot of citizenry have one or more phisical limitation. More then 13% has a phisical limitation. Still, according to the RDWDataset, most parkinggarages are not accessible for those citizenry. I want to research how many parkingspots are availible per province, and how many are required in percentage according to the numbers of the Central Bureau of Statistics.

To begin my research, I set up a series of questions:
#### Main Research Question:
Which province in the Netherlands is the best province to live for people with a phisical limitation when you look at the accessibility of parkingspots?

#### Supporting sub-Questions
* What is the ratio of the overall capacity and availible parking spaces for people with a disability per province?
* What is the ratio of the total number of parking garages and accessible parking garages for people with a disability per province?
* What is the percentage of people with a physical disability per province?

### Sketch of my concept
I want to visualize the accessibility with percentages of availible parking spaces. I want to use a parkingarea and color these according to their accessibility:
[![Artboard-1-copy-5-100.jpg](https://i.postimg.cc/PrXQF6j2/Artboard-1-copy-5-100.jpg)](https://postimg.cc/xqZmX3qz)

### Necessities
Before I can visualize my concept, I need to collect the data that I need:

I wanted to collect my data from different RDWDatasets. Unfortunatly, many datasets were incomplete or couldn't be linked together. So I chose for the [big RDWDataset](https://npropendata.rdw.nl/parkingdata/v2/) where all data could be fetched.

From the dataset I need the following data:
* DisabledAccess: boolean which shows if parking garage is accessible for people with a phisical handicap
* Capacity: integer that gives the amount of parkingspots of that garage
* Province: string that gives the province where the parking garage is located

To read how I received and saved the data, please navigate to [my wiki page](wikiURL) where I explain in detail on how I collected and saved that data.

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

## Data used

### EnqueteData
For this project I am using a dataset of an enquëte from Datavisualisatie 2. This dataset contains several interesting insights about CMD-students. This dataset has been created by Jan-Jaap Rijpkema and converted into json by Jonah Meijers.
The data for this dataset has been collected in September from CMD-students who are in the beginning of their third year.

### RDWData
Aw of now, the only data used in this project is one api from RDW with specific data of parkingarea's (capacity, maximum height, maximum weight etc...)
[RDWData: Parking Specifications API](https://opendata.rdw.nl/resource/b3us-f26s.json)

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
git clone https://github.com/marcoFijan/functional-programming.git
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
To just try the project without the downloading hastle navigate to the [live deploy](https://marcofijan.github.io/functional-programming/)

## Credits and License
* Jan-Jaap Rijpkema for collecting the dataset
* Jonah Meijers for converting the dataset to .json
* stackoverflow for multiple difficult code (see index.js for the sources)
* Laurens Aarnoudse for the live code demo's and explaining functional programming
* Chelsea Doeleman for tips on how to make better functional programming functions
* RDW for collecting and documenting the dataset
* Sharon Veldman for hoisting the dataset
* Curan for the amazing explanation of D3
* Laurens Aarnoudse for explaining how to avoid the CORS error
* Rijk van Zanten for explaining how to connect multiple datasets with eachother
