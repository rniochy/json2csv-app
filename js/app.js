const csv_input_text = document.getElementById("csv");
const json_input_text = document.getElementById("json");
const json_input_file = document.getElementById("input-json");
const csv_input_file = document.getElementById("input-csv");
const csv_button = document.getElementById("button-csv");
const json_button = document.getElementById("button-json");
const clear_button = document.getElementById("clear-button");
const convert_button = document.getElementById("convert-button");
const save_button = document.getElementById("save-button");
const warning = document.getElementById("warning");
const warningClose = document.getElementById("warning-close");

convert_button.addEventListener('click', function(){
     if(csv_input_text.value){
          const converted = CSV2JSON(csv_input_text.value);
          converted.length === 0 ? warning.style = 'visibility: visible';
          json_input_text.value =converted;
     }
})

console.log(convert_button)
clear_button.addEventListener('click', function(){
    csv_input_text.value = "";
    json_input_text.value = "";
    csv_input_text.removeAttribute('disabled');
    json_input_text.removeAttribute('disabled');
});

csv_input_text.addEventListener('change', function(){
     if(csv_input_text.value){
         json_input_text.setAttribute('disabled', true);

     }
});
csv_input_text.addEventListener('focusout', function(){
     if(!csv_input_text.value){
         json_input_text.removeAttribute('disabled');

     }
});
json_input_text.addEventListener('change', function(){
     if(json_input_text.value){
        csv_input_text.setAttribute('disabled', true);

     }
});
json_input_text.addEventListener('focusout', function(){
     if(!json_input_text.value){
        csv_input_text.removeAttribute('disabled');

     }
});
warningClose.addEventListener('click', function(){
     warning.style = " visibility: hidden";
});
// CSV To JSON
function CSVToArray(strData, strDelimiter) {
     // Check to see if the delimiter is defined. If not,
     // then default to comma.
     strDelimiter = (strDelimiter || ",");
     // Create a regular expression to parse the CSV values.
     var objPattern = new RegExp((
     // Delimiters.
     "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
     // Quoted fields.
     "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
     // Standard fields.
     "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
     // Create an array to hold our data. Give the array
     // a default empty first row.
     var arrData = [[]];
     // Create an array to hold our individual pattern
     // matching groups.
     var arrMatches = null;
     // Keep looping over the regular expression matches
     // until we can no longer find a match.
     while (arrMatches = objPattern.exec(strData)) {
         // Get the delimiter that was found.
         var strMatchedDelimiter = arrMatches[1];
         // Check to see if the given delimiter has a length
         // (is not the start of string) and if it matches
         // field delimiter. If id does not, then we know
         // that this delimiter is a row delimiter.
         if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
             // Since we have reached a new row of data,
             // add an empty row to our data array.
             arrData.push([]);
         }
         // Now that we have our delimiter out of the way,
         // let's check to see which kind of value we
         // captured (quoted or unquoted).
         if (arrMatches[2]) {
             // We found a quoted value. When we capture
             // this value, unescape any double quotes.
             var strMatchedValue = arrMatches[2].replace(
             new RegExp("\"\"", "g"), "\"");
         } else {
             // We found a non-quoted value.
             var strMatchedValue = arrMatches[3];
         }
         // Now that we have our value string, let's add
         // it to the data array.
         arrData[arrData.length - 1].push(strMatchedValue);
     }
     // Return the parsed data.
     return (arrData);
 }
 
 function CSV2JSON(csv) {
     var array = CSVToArray(csv);
     var objArray = [];
     for (var i = 1; i < array.length; i++) {
         objArray[i - 1] = {};
         for (var k = 0; k < array[0].length && k < array[i].length; k++) {
             var key = array[0][k];
             objArray[i - 1][key] = array[i][k]
         }
     }
     var json = JSON.stringify(objArray);
     var str = json.replace(/},/g, "},\r\n");
 
     return str;
}