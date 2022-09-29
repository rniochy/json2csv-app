function saveAs(content, fileName) {
    const a = document.createElement("a");
    const isBlob = content.toString().indexOf("Blob") > -1;
    let url = content;
    if (isBlob) {
      url = window.URL.createObjectURL(content);
    }
    a.href = url;
    a.download = fileName;
    a.click();
    if (isBlob) {
      window.URL.revokeObjectURL(url);
    }
  }

function saveFormat(text,type){
    var blob = new Blob([text],{type:`application/${type};charset=utf-8`});
    saveAs(blob, `myFile.${type}`);
  }

// Util functions
function innertText(node, text){
    node.innerText = text;
}
function setWarning(text){
    innertText(warningText,text);
    warning.style = 'visibility: visible';
    setTimeout(()=>{
     warning.style = 'visibility: hidden';
    }, 5000)
} 