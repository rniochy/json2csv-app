const warning = document.getElementById("warning");
const csv_input_text = document.getElementById("csv");
const json_input_text = document.getElementById("json");
const csv_button = document.getElementById("button-csv");
const save_button = document.getElementById("save-button");
const json_button = document.getElementById("button-json");
const warningText = document.getElementById("warning-text");
const csv_input_file = document.getElementById("input-csv");
const json_input_file = document.getElementById("input-json");
const clear_button = document.getElementById("clear-button");
const warningClose = document.getElementById("warning-close");
const convert_button = document.getElementById("convert-button");

convert_button.addEventListener('click', function(){
     if(convert_button.innerText === "Convert to JSON"){
          const converted = CSV2JSON(csv_input_text.value.trim());
          if(converted.length < 3){
               setWarning("Fill with CVS valid");  
          } else {
               json_input_text.value = converted 
          }
     } 
     
     if(convert_button.innerText === "Convert to CSV"){
          const converted = JSON2CSV(json_input_text.value.trim());
          console.log(converted.length)
          if(converted.length < 8){
               setWarning("Fill with JSON valid");    
          } else {
               csv_input_text.value = converted;
          }
     }

     (csv_input_text.value ===' ' && !json_input_text.value)? setWarning("Fill some field to convert"):''
})

clear_button.addEventListener('click', function(){
    csv_input_text.value = "";
    json_input_text.value = "";
    csv_input_text.removeAttribute('disabled');
    json_input_text.removeAttribute('disabled');
    innertText(convert_button, "Convert");
    innertText(save_button, "Save");
});

csv_input_text.addEventListener('change', function(){
     if(csv_input_text.value){
          innertText(convert_button,"Convert to JSON");
          innertText(save_button,"Save to JSON");
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
        innertText(convert_button,"Convert to CSV");
        innertText(save_button,"Save to CSV");
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
     if(convert_button.innerText === "Convert to JSON")
          saveFormat(json_input_text.value, "json");

     if(convert_button.innerText === "Convert to CSV")
          saveFormat(csv_input_text.value, "csv");

          setWarning("Fill some field and convert to save");
});
json_input_file.addEventListener('change', (event) => {
     const fileList = event.target.files[0];
     const  fileTobeRead = fileList;
     const fileReader = new FileReader();
   
     if (window.File && window.FileReader && window.FileList && window.Blob) {

                  fileReader.onload = function (e) {
                    json_input_text.innerText = fileReader.result;
                    console.log(fileReader.result)
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
// csv_button.addEventListener('click', function(){
//       alert(); //csv_input_file
// });
// json_button.addEventListener('click', function(){
//      alert(); //json_input_file
// })