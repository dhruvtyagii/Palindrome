function reverseStr(str){
    var listOfChars = str.split('');

    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    
    return reversedStr

}


function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse
}

var date = {
    day: 5,
    month: 9,
    year: 2020
}


function convertDateToStr(date){

    var dateStr = {day: '', month: '', year: ''}

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }

    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }

    else{
        dateStr.month = date.month.toString();
    }
    
    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var isPal= false;

    for(var i=0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            isPal = true;
            break;
        }
    }
    
        return isPal;
}

function isLeapYear(year){
    if (year % 400 === 0){
        return true;
    }   
    if (year % 100 === 0){
        return true 
    }
    if (year % 4 === 0){
        return true; 
    }
    else{
        return false;
    }
}

function getNextDate(date){
    
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month ++;
            }
        }
        else {
            if(day > 28){
                day = 1;
                month ++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if (month>12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year:year

    };
}


function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

function getPreviousPalindromeDate(date){
}

var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler(e){
    var bdayStr = dateInputRef.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
    }

    var isPalindrome = checkPalindromeForAllFormats(date);

    if(isPalindrome){
        resultRef.innerText = "yay your birthday is a palindrome"
    }
    else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
        resultRef.innerText = `The next palindrome date ${nextDate.day}- ${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days`
    }

}

showBtnRef.addEventListener('click', clickHandler);


var date = {
    day: 31,
    month: 12,
    year: 2020
};

console.log(getNextDate(date));
console.log(checkPalindromeForAllFormats(date));
console.log(convertDateToStr(date));
console.log(isPalindrome('242'));
console.log(isPalindrome('oppo'));

console.log(getNextPalindromeDate(date));