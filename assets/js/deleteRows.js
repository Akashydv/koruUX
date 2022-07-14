function deleteRows(){

    let tableRef = document.getElementById('tableId');
    let tbody = tableRef.querySelector("tbody");

    let checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
    Array.prototype.slice.call(checkedInputs)
    .forEach( input => tbody.removeChild(input.parentNode.parentNode));
}