// Kane Kriz
// UWYO COSC 3020 Algorithms
// 10 May 2025
// Parallel Mergesort Exercise - test js file
//
//



//



const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');



//



function test() 
{
    var testArray1 = [];
    assert.deepStrictEqual(parallelMergeSort(testArray1), []);

  ////

    var testArray2 = [1];
    assert.deepStrictEqual(parallelMergeSort(testArray2), [1]);

  ////

    var testArray3 = [4, 2, 5, 1, 3];
    assert.deepStrictEqual(parallelMergeSort(testArray3), [1, 2, 3, 4, 5]);

  ////

    var testArray4 = [9, 6, 3, 8, 1];
    assert.deepStrictEqual(parallelMergeSort(testArray4), [1, 3, 6, 8, 9]);

  ////

    var testArray5 = [5, 2, 5, 1, 9, 2];
    assert.deepStrictEqual(parallelMergeSort(testArray5), [1, 2, 2, 5, 5, 9]);

  ////

    var testArray7 = [-3, 0, -1, 2, -5];
    assert.deepStrictEqual(parallelMergeSort(testArray7), [-5, -3, -1, 0, 2]);

  ////

    var testArray10 = [7, 7, 7, 7];
    assert.deepStrictEqual(parallelMergeSort(testArray10), [7, 7, 7, 7]);
}

//

test();
