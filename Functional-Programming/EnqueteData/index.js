// Variables
const userInput = document.querySelector(".userInput")
const userInputButton = document.querySelector(".userInputButton")
const surveyAnswers = data

console.log('Alle survey antwoorden:', surveyAnswers)

userInputButton.addEventListener('click', function(e){                          //Run when user gives input
  e.preventDefault();
  let columnName = userInput.value;                                             //Save userInput in Variable columnName
  console.log('userInput is:', columnName)
  let inputChecked = checkSpelling(columnName)                                  //Check if userInput is usable
  if (inputChecked != null){
    let answersToQuery = getAnswerOfQuery(surveyAnswers, inputChecked)          //Run getAnswerOfQuery if userInput is valid
    console.log('the CLEANED results are:', answersToQuery)
  }
})

function getAnswerOfQuery(list, query){
  let results = list.map(answer => answer[query])                               //Create new array of the specific column called results
  console.log('Kolom', query, "heeft de volgende waarden:", results)
  let removedEmptyItems = removeEmptyItems(results)
  let hashResultsChecked = checkHash(removedEmptyItems)                                   //Check if string begins with #
  let dataCleaned = checkHexCode(hashResultsChecked)                            // Check if string is a HEX
  return dataCleaned                                                            // Return the cleaned data
}

function checkSpelling(input){
  let eyeKeywords = ['oog', 'ogen', 'eyes', 'eye']                              // Array with keywords for the column oogKleur

  if (input === 'oogKleur'){                                                    // If input is correct
    return input
  }
  else if (grammerFixed(eyeKeywords, input)){                                   // If not correct but keyword found
    console.log('Incorrect Grammer! Converting...')
    return input.replace(input, 'oogKleur')                                     // Replace with correct keyword
  }
  else{
    console.log('I cannot read that! Please try again')                         // If not correct give error and
    return null                                                                 // Return null
  }
}

function grammerFixed(keywordArray, input){                                     // Check if one or more keywords are found
  keywordArray.forEach((item, i) => {
    let hasKeyword
    if (item === input){
      console.log('YESSSSSS')
      hasKeyword++
    }
  });
  return (hasKeyword => 1)
}

function removeEmptyItems(array){
  return array.filter(cleanData => cleanData != "")
}

function checkHash(results){                                                    // Check if arrayItems start with #
  let resultsWithHash = results;
  if(resultsWithHash.length < 1 || undefined){                                  // If array is empty, return error
    console.log('Array must be filled you dummy')
    return
  }
  for(result in resultsWithHash){
    if (!(resultsWithHash[result].charAt(0) === '#')){
      resultsWithHash[result] = '#' + resultsWithHash[result]                   // add # if needed
    }
  }
  return resultsWithHash                                                        // return array with added #
}

function checkHexCode(results){
  let checkedHexCode = results
  for(result in checkedHexCode){                                                // Check for every item if value is a string, has a length of 7 and if it does have valid characters
    if ((typeof checkedHexCode[result] === 'string' && checkedHexCode[result].length === 7) && (!(checkedHexCode[result].toLocaleUpperCase().includes('G' || 'H' || 'I' || 'J' || 'K' || 'L' || 'M' || 'N' || 'O' || 'P' || 'Q' || 'R' || 'S' || 'T' || 'U' || 'V' || 'W' || 'X' || 'Y' || 'X' || '!' || '?' || '@' || '$' || '%')))){
      console.log('it must be HEX!')
    }
    else{
      console.log('ERRRRRORRRR Not a HEX:', checkedHexCode[result])
      toHexCode(checkedHexCode, result)                                         // Run toHexCode if value not valid
    }
  }
  return checkedHexCode
}

function toHexCode(results, index){
  // Check for whitespaces and replace
  let convertedHexCode = results
  if (convertedHexCode[index].indexOf(' ') >= 0){                               // If value has whitespace, run removeWhitespaces
    convertedHexCode[index] = removeWhitespaces(convertedHexCode, index)
  }
  // Check for rgb color
  else if (convertedHexCode[index].includes('rgb')){                            // If value is in rgb format, run rgbToHex
    convertedHexCode[index] = rgbToHex(convertedHexCode, index)
  }
  // Check written color words
  else if (convertedHexCode[index].toLocaleLowerCase() ==='#bruin'||'#lichtblauw'||'#groen'||'#blauw'){
    convertedHexCode[index] = wordToHex(convertedHexCode, index)                // If value contains colorWords, run wordToHex
  }
  else{
    console.log('I do not know what you did, but you broke me; CANNOT CONVERT TO HEX:', convertedHexCode[index]) // Give error if not able to read
  }
  return convertedHexCode                                                       // Returns fixedArray
}

function wordToHex(results, index){
  let convertedWord = results[index].toLocaleLowerCase()                        // Convert value to lowercase and replace values where needed
  .replace('bruin', 'A52A2A')
  .replace('lichtblauw', 'ADD8E6')
  .replace('groen', '008000')
  .replace('blauw', '0000FF')
  // (^ Idea to use replace instead of if / else checks from Nathan Neelis)
  return convertedWord
}

function removeWhitespaces(results, index){
    return results[index].replace(/\s+/g, '') //BRON: https://css-tricks.com/snippets/javascript/strip-whitespace-from-string/
}

function rgbToHex(results, index){                                              // Run multiple functions to convert rgb to hex
  // remove the rgb text and other character so only the numbers remain
  let rgbStylingRemoved = removeRBGStyling(results, index)
  let rgbNumbersList = splitRGBNumbers(rgbStylingRemoved)
  return rgbNumbersToHex(rgbNumbersList)
}

function removeRBGStyling(results, index){
  return results[index].split("(")[1].split(")")[0]                             // Split results at ( and ) and grab the index of just the numbers
}

function splitRGBNumbers(rgbValues){
  let rgbValuesCleaned = rgbValues.replace('.', ',')                            //change . into ,
  return rgbValuesCleaned.split(",")                                            // split the values into an array at ,
}

function rgbNumbersToHex(splittedRGBNumbers){
    let hexArray = splittedRGBNumbers.map(function(rgbValue){                   //For each array element
      rgbValue = parseInt(rgbValue).toString(16);                               //Convert to a base16 string
      return (rgbValue.length==1) ? "0"+rgbValue : rgbValue;                    //Add zero if we get only one character BRON: https://stackoverflow.com/questions/13070054/convert-rgb-strings-to-hex-in-javascript/13070198
  })
  return ('#'+hexArray.join(''))                                                // Return the joined hexKey
}
