const warning = document.getElementById("warning");
const csv_input_text = document.getElementById("csv");
const json_input_text = document.getElementById("json");
const csv_button = document.getElementById("button-csv");
const save_button = document.getElementById("save-button");
const json_button = document.getElementById("button-json");
const warningText = document.getElementById("warning-text");
const csv_input_file = document.getElementById("input-csv");
const clear_button = document.getElementById("clear-button");
const json_input_file = document.getElementById("input-json");
const warningClose = document.getElementById("warning-close");
const convert_button = document.getElementById("convert-button");

convert_button.addEventListener('click', function(){
     if(csv_input_text.value !== ' '){
          const converted = CSV2JSON(csv_input_text.value);
          if(converted.length < 3){
               setWarning("Fill with CVS valid");  
          } else {
                innertText(json_input_text,converted); 
          }
     }
     // if(json_input_text.value){
     //      const converted = CSV2JSON(json_input_text.value);
     //      if(converted.length > 9){
     //           setWarning("Fill with JSON valid");    
     //      } else {
     //           csv_input_text.value = converted;
     //      }
     // }

     (csv_input_text.value ===' ' && !json_input_text.value)? setWarning("Fill some field to convert"):''
})

clear_button.addEventListener('click', function(){
    csv_input_text.value = "";
    json_input_text.value = "";
    csv_input_text.removeAttribute('disabled');
    json_input_text.removeAttribute('disabled');
    innertText(convert_button, "Convert");
});

csv_input_text.addEventListener('change', function(){
     if(csv_input_text.value){
          innertText(convert_button,"Convert to JSON");
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
save_button.addEventListener('click',()=>{
      if(convert_button.innerText==="Convert to JSON")alert(convert_button.innerText);
});
function setWarning(text){
     innertText(warningText,text);
     warning.style = 'visibility: visible';
     setTimeout(()=>{
      warning.style = 'visibility: hidden';
     }, 5000)
} 
function innertText(node, text){
     node.innerText = text;
}
// CSV To JSON
function CSVToArray(strData, strDelimiter) {
     // Check to see if the delimiter is defined. If not,
     // then default to comma.
     strDelimiter = (strDelimiter || ",");
     // Create a regular expression to parse the CSV values.
     let objPattern = new RegExp((
     // Delimiters.
     "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
     // Quoted fields.
     "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
     // Standard fields.
     "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
     // Create an array to hold our data. Give the array
     // a default empty first row.
     let arrData = [[]];
     // Create an array to hold our individual pattern
     // matching groups.
     let arrMatches = null;
     // Keep looping over the regular expression matches
     // until we can no longer find a match.
     while (arrMatches = objPattern.exec(strData)) {
         // Get the delimiter that was found.
         let strMatchedDelimiter = arrMatches[1];
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
             let strMatchedValue = arrMatches[2].replace(
             new RegExp("\"\"", "g"), "\"");
         } else {
             // We found a non-quoted value.
             let strMatchedValue = arrMatches[3];
         }
         // Now that we have our value string, let's add
         // it to the data array.
         arrData[arrData.length - 1].push(strMatchedValue);
     }
     // Return the parsed data.
     return (arrData);
 }
 
 function CSV2JSON(csv) {
     let array = CSVToArray(csv);
     let objArray = [];
     for (let i = 1; i < array.length; i++) {
         objArray[i - 1] = {};
         for (let k = 0; k < array[0].length && k < array[i].length; k++) {
             let key = array[0][k];
             objArray[i - 1][key] = array[i][k]
         }
     }
     let json = JSON.stringify(objArray);
     let str = json.replace(/},/g, "},\r\n");
 
     return str;
}