
function printError(elementId, msg){
    document.getElementById(elementId).innerHTML = msg;
}

function addDataForm(e){
    e.preventDefault();

    var name = document.getElementById('form_name').value;
    var description = document.getElementById('form_description').value;
    var webReference = document.getElementById('form_web_reference').value;

    var nameErr = descErr = webErr = true;

    if(name === ""){
        printError('nameError', "*Please fill the name");
    }else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) {
            printError("nameError", "*Please enter a valid name");
        } else {
            printError("nameError", "");
            nameErr = false;
        }
    }
    if(description === ""){
        printError('descError', "*Please fill the description");
    }else {
            printError("descError", "");
            descErr = false;
    }
    
    if(webReference === ""){
        printError('webError', "*Please fill the description");
    }else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(webReference) === false) {
            printError("webError", "*Please enter a valid description");
        } else {
            printError("webError", "");
            webErr = false;
        }
    }

    if((nameErr || descErr || webErr) == true){
        return false;
    }
    else{
        
        var table = $('#table-body');

        var row = `<tr>
            <td><input type="checkbox" class="rowCheckbox"></td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${webReference}</td>
                `
        table.append(row);

        let msg = document.getElementById('msg');
        msg.innerText = "*Data submitted successfully";

        setTimeout(()=>{
            msg.innerText = "";
        }, 2000)

        document.getElementById('form_name').value = "";        
        document.getElementById('form_description').value = "";
        document.getElementById('form_web_reference').value = "";
    }
}
