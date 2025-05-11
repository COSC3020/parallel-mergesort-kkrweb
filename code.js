// Kane Kriz
// UWYO COSC 3020 Algorithms - parallel mergesort primary code.js file
// 11 May 2025
//
//





////




var MapReduce = require('mapreduce-js').MapReduce;

function parallelMergeSort(inputArray) 
{
    var corePlaceholderCount;
    var partitionSize;
    var partitions;
    var sortedPartitions;
    var mergedPartitions;

    var inputLength = inputArray.length;
    corePlaceholderCount = 2;

    //
  
    if(inputLength <= 1) 
    {
        return inputArray;
    }

    partitionSize = Math.ceil(inputLength / corePlaceholderCount);

    partitions = [];
  
    for(var i = 0; i < inputLength; i += partitionSize)
    {
        var endPos = i + partitionSize;
        
        if(endPos > inputLength)
        {
            endPos = inputLength;
        }
        
        partitions.push(inputArray.slice(i, endPos));
    }

    ///map
    var mapReduce = new MapReduce(
        partitions,
        solvePartition, 
        function(results) 
        {
            //reduce
            var sortedParts = results;
         
            while(sortedParts.length > 1) 
            {
                var merged = [];
             
                for(var i = 0; i < sortedParts.length; i += 2) 
                {
                    if(i + 1 < sortedParts.length) 
                    {
                        merged.push(reduceMerge(sortedParts[i], sortedParts[i+1]));
                    } 
                     
                    else 
                    {
                        merged.push(sortedParts[i]);
                    }
                }
             
                sortedParts = merged;
            }
            return sortedParts[0];
        }
    );

    return mapReduce.execute();
}



////




function solvePartition(partition) 
{
    var partitionSize = partition.length;
    var currentSize;
    var startPos;
    var midpointPos;
    var endPos;
    var leftPos;
    var rightPos;
    var temp;

    //

    for(currentSize = 1; currentSize < partitionSize; currentSize *= 2) 
    {
        for(startPos = 0; startPos < partitionSize; startPos += 2 * currentSize) 
        {
            midpointPos = Math.min(startPos + currentSize, partitionSize);
            endPos = Math.min(startPos + 2 * currentSize, partitionSize);
            
            leftPos = startPos; 
            rightPos = midpointPos;     
            
            while((leftPos < midpointPos) && (rightPos < endPos))
            {
                if(partition[leftPos] <= partition[rightPos]) 
                {
                    leftPos++;
                }
                    
                else 
                {
                    temp = partition[rightPos];
                    
                    for(var i = rightPos; i > leftPos; i--) 
                    {
                        partition[i] = partition[i - 1];
                    }
                    
                    partition[leftPos] = temp;
                    leftPos++;
                    midpointPos++; 
                    rightPos++;
                }
            }
        }
    }
    
    return partition;
}



////



function reduceMerge(leftPartition, rightPartition) 
{
    var mergedResult = [];
    var leftPos = 0;
    var rightPos = 0;
    var leftLength = leftPartition.length;
    var rightLength = rightPartition.length;

    //
    
    while((leftPos < leftLength) && (rightPos < rightLength)) 
    {
        if(leftPartition[leftPos] <= rightPartition[rightPos])
        {
            mergedResult.push(leftPartition[leftPos]);
            leftPos++;
        }
            
        else
        {
            mergedResult.push(rightPartition[rightPos]);
            rightPos++;
        }
    }
    
    while(leftPos < leftLength)
    {
        mergedResult.push(leftPartition[leftPos]);
        leftPos++;
    }
    
    while(rightPos < rightLength)
    {
        mergedResult.push(rightPartition[rightPos]);
        rightPos++;
    }
    
    return mergedResult;
}


////
