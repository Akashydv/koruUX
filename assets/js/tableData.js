
document.addEventListener('DOMContentLoaded', tableLoad, false);

async function tableLoad(){
var fetchedData = await fetch('./assets/json/data.json').
                    then(res => res.json());
var myList =  fetchedData.data; 


var state = {
    'querySet': myList,

    'page': 1,
    'rows': 5,
    'window': 5
}

buildTable();

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    console.log(trimStart, trimEnd);
    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}


function buildTable() {
    var table = $('#table-body');

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet;         
    
    for (var i in myList) {
        
        var row = `<tr>
                  <td><input type="checkbox" class="rowCheckbox" id="${myList[i].id}"></td>
                  <td>${myList[i].id}</td>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].description}</td>
                  <td>${myList[i].webReference}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)

}
}