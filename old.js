//Original mergesort code from the exercise

//added it into this repo for convienence:





// Kane Kriz
// UWYO COSC 3020
// Iterative, In-Place Mergesort Exercise
// 4 April 2025
//


//







//altered after feedback request 1, as the code was not in place
function mergesort(array) 
{
    var arrSize = array.length; //convienence
    
    for(var currentSubarrSize = 1; currentSubarrSize < arrSize; currentSubarrSize *= 2) 
    {
        //iterating through the array
        //merging pairs of subarrays of increasing size (via currentSubarrSize doubling between iterations)
        
        for(var leftStartPos = 0; leftStartPos < arrSize; leftStartPos += 2 * currentSubarrSize) 
        {
            //calculating the middle position midPos
            var midPos = Math.min(leftStartPos + currentSubarrSize, arrSize);
            //midPos also acts as the end of the left sub array
            //as well as logically also the beginning of the right subarray
        
            var rightEndPos = Math.min(leftStartPos + 2 * currentSubarrSize, arrSize);  //calculating ending position of right subarray
            
            var leftSubArrPos = leftStartPos; 
            var rightSubArrPos = midPos;     
            
            //merging in place, now without temp array which violates the whole idea of this exercise
            while((leftSubArrPos < midPos) && (rightSubArrPos < rightEndPos) )
            {
                if(array[leftSubArrPos] <= array[rightSubArrPos]) 
                {
                    leftSubArrPos++;
                } 
                    
                else 
                {
                    //shifting elements to make space for the rightSubArrPos element properly
                    var temp = array[rightSubArrPos];
                    
                    for(var i = rightSubArrPos; i > leftSubArrPos; i--) 
                    {
                        array[i] = array[i - 1];
                    }
                    
                    array[leftSubArrPos] = temp;
                    leftSubArrPos++;
                    midPos++; 
                    rightSubArrPos++;
                }
            }
        }
    }
    
    return array; //return sorted
}

//
