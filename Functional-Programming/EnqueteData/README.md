## Concept
I am writing a simple project where I gather the data from a dataset from a json file. The user can receive certain columns from the dataset by using the textbox on the HTMLpage. After the user typed his or her query, the program will then check if the user typed a valid input. If the input is valid, the program will try to 'clean' the data. Empty values, wrong format values and whitespaces will be fixed. If the program is unable to fix a certain value, the program will return a warning but continue with the other values. That way the user will still receive his or her preferred column.
For more information about the development of this project, navigate to [my wiki](https://github.com/marcoFijan/functional-programming/wiki/Opschonen-van-Data)

## Features
As of now, this project has the following features:
* User can give input on which column he or she wants to see in the console
[![1.png](https://i.postimg.cc/MT6nVypX/1.png)](https://postimg.cc/Tys2X5mX)
* UserInput will be checked and converted to a valid input if possible
[![2.png](https://i.postimg.cc/7PQ5JJ8Y/2.png)](https://postimg.cc/CdkhW1xW)
* The column 'oogKleur' will be coverted and cleaned into usable data
[![3.png](https://i.postimg.cc/vmMTwW9X/3.png)](https://postimg.cc/jDgtznMJ)

## Data used
For this project I am using a dataset of an enquëte from Datavisualisatie 2. This dataset contains several interesting insights about CMD-students. This dataset has been created by Jan-Jaap Rijpkema and converted into json by Jonah Meijers.
The data for this dataset has been collected in September from CMD-students who are in the beginning of their third year.

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
