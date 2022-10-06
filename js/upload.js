const json_input_text = document.getElementById("json");
const json_input_file = document.getElementById("input-json");
const convert_button = document.getElementById("convert-button");
const save_button = document.getElementById("save-button");

json_input_file.addEventListener('change', (event) => {
    const fileList = event.target.files[0];
    const  fileTobeRead = fileList;
    const fileReader = new FileReader();
  
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         
         fileReader.onload = function (e) {
              json_input_text.innerText = fileReader.result;
              innertText(convert_button,"Convert to CSV");
              innertText(save_button,"Save to CSV");
              csv_input_text.setAttribute('disabled', true);
              }
              fileReader.readAsText(fileTobeRead);
     }
     else {
         alert("Arquivo(s) não suportado(s)");
     }
})