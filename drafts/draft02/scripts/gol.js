//GAME OF LIFE//
//

function golGenerate(cellArr) {

    let cols = cellArr.length;
    let rows = cellArr[0].length;

    for (let i = 0; i <  cols; i++) {
        for (let j = 0; j < rows; j++) {
            cellArr[i][j].updatePrev();
        }
    }

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {

            let neighbours = 0;
            // let tempVal = 0;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let tempVal = cellArr[(x+i+cols)%cols][(y+j+rows)%rows].prevState===true?1:0;
                    // if (cellArr[(x+i+cols)%cols][(y+j+rows)%rows].prevState === false) {
                    //     tempVal=
                    // }
                    neighbours += tempVal;
                }
            }

            let tempPrev = cellArr[x][y].prevState===true?1:0;
            neighbours -= tempPrev;
            // console.log(neighbours);

            // cellArr[x][y].updateState(false);
        // Rules of Life
        if      ((cellArr[x][y].state == 1) && (neighbours <  2)) cellArr[x][y].updateState(true);           // Loneliness
        else if ((cellArr[x][y].state == 1) && (neighbours >  3)) cellArr[x][y].updateState(false);           // Overpopulation
        else if ((cellArr[x][y].state == 0) && (neighbours == 3)) cellArr[x][y].updateState(true);           // Reproduction
        // else do nothing!
        }
    }

}
