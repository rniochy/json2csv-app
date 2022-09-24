const csv_input_text = document.getElementById("csv");
const json_input_text = document.getElementById("json");
const json_input_file = document.getElementById("input-json");
const csv_input_file = document.getElementById("input-csv");
const csv_button = document.getElementById("button-csv");
const json_button = document.getElementById("button-json");
const clear_button = document.getElementById("clear-button");
const convert_button = document.getElementById("convert-button");
const save_button = document.getElementById("save-button");


clear_button.addEventListener('click', function(){
    csv_input_text.value = "";
    json_input_text.value = "";
});