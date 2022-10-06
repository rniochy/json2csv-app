function CSVToArray(strData, strDelimiter) {
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
    let strMatchedValue;
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
            strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
              strMatchedValue = arrMatches[3];
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

// Convert JSON TO CSV
function  JSON2CSV(objArray) {
    let rows = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let  header = "";
    Object.keys(rows[0]).map(pr => (header += pr + " "));

    let str = "";
    rows.forEach(row => {
        let line = "";
        let columns = typeof row !== "object" ? JSON.parse(row) : Object.values(row);
        columns.forEach(column => {
            if (line !== "") {
                line += " ";
            }
            if (typeof column === "object") {
                line += JSON.stringify(column);
            }  else {
                line += column;
            }
        });
        str += line + "\r\n";
    });
    return header + "\r\n" +str;
}

