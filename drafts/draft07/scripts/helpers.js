//HELP FUNCTIONS

function init2dArray(cols, rows) {
    let tempArr = new Array(cols);
    for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = new Array(rows);
    }
    return tempArr;
}

