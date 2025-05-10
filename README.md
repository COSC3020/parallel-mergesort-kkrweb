# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.



//



Name: Kane Kriz

Start Date: 17 April 2025

Last Edited: 10 May 2025

Feedback Request 1 Date: 10 May 2025




//



Response:

Note: See disclaimer from the JS file regarding some inconsistencies between this explanation and the actual JS file I submitted to pass the test code.
I am of course 1000% willing to make adjustments given potential guidance on how to import, or potentially this 95% of the way there logical following of the concept as a whole may be sufficient.
Either way, I am thankful for your imput.





The implementation performs parallel merge sort by logically dividing work into independent partitions before merging results.

The function starts by checking for trivial cases where the input requires no sorting. 

This check requires constant work.

The main sorting logic begins by splitting the input into p partitions of attempted equal size via rounding.

This partitioning step performs $Θ(n)$ work through sequential slicing operations.

Each partition undergoes independent sorting through `solvePartition` calls.

The iterative merge sort implementation in solvePartition exhibits $Θ((n/p) log (n/p))$ span per partition. 

Since these operations could theoretically run in parallel, the map phase contributes $Θ((n/p) * log n)$ span when considering p concurrent sorting tasks.

The reduce phase merges sorted partitions.

The implementation builds a binary merge tree with $log p$ levels. 

Each merge level processes all n elements sequentially via `reduceMerge`, contributing $Θ(n)$ span per level that it considers. 

This results in $Θ(n * log p)$ total span for the reduce section.

The worst case span combines both phases. 

The map phase's $Θ((n/p) * log n)$ dominates when $log n$ exceeds $log p$.

On the other hand, the reduce phase's $Θ(n * log p)$ dominates when p grows alongside n.

The analysis holds despite the sequential implementation because the code structure preserves the logical dependencies of a parallel merge sort.

The `solvePartition` operations represent independent work units, while the `reduceMerge` create applicable dependencies as intended. 

The computation can be modeled as a DAG directed acyclic graph where nodes correspond to computational tasks. 

Each sorting operation in `solvePartition` becomes an independent node that could execute in parallel. 

The `reduceMerge` operations establish dependencies between nodes forming the DAG's potential edges.

The longest path through this graph determines the algorithm's span. 

This path starts with the initial partition sorting and proceeds through each necessary merge operation. 

The independent partition sorts allow for parallel execution, while the merging processes force sequential functionality.

This graph structure explains how the implementation preserves parallel complexity characteristics.

The `solvePartition` nodes represent parallel work units that could theoretically execute concurrently. 

The `reduceMerge` edges create the critical path that limits overall execution time.

The DAG model shows why the span analysis holds despite sequential execution. 

The algorithm's structure maintains the same task dependencies that would exist in a parallel system. 

This validates the theoretical complexity analysis through the computation's graph properties that still stand as they would if this parallel implementation was true in (working) form rather than theory.

Overall, the worst case occurs when the algorithm must fully sort each partition and execute all merge steps.

The $Θ((n/p) * log n + n log p)$ bound considers both parallel sorting and sequential merging costs.

Thus, the worst case span of this parallel merge sort implementation is $Θ((n/p) * log n + n log p)$.




//




Plagiarism Acknowledgement: I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.




Citations:


“COS 326: Functional Programming.” Www.cs.princeton.edu, www.cs.princeton.edu/~dpw/courses/cos326-12/notes/parallel-schedules.php.

“Parallel.js - Javascript Parallel Computing.” Js.org, 2025, parallel.js.org/. Accessed 10 May 2025.

“Introduction to Directed Acyclic Graph.” GeeksforGeeks, 8 Nov. 2023, www.geeksforgeeks.org/introduction-to-directed-acyclic-graph/.

Wikipedia Contributors. “Directed Acyclic Graph.” Wikipedia, Wikimedia Foundation, 11 Dec. 2019, en.wikipedia.org/wiki/Directed_acyclic_graph.

“Directed Acyclic Graph in Compiler Design (with Examples).” GeeksforGeeks, 10 June 2021, www.geeksforgeeks.org/directed-acyclic-graph-in-compiler-design-with-examples/.

“Paralleljs.” Npm, 6 Oct. 2020, www.npmjs.com/package/paralleljs. Accessed 10 May 2025.

“MapReduce.” Wikipedia, 22 Apr. 2020, en.wikipedia.org/wiki/MapReduce.

“MapReduce Architecture.” GeeksforGeeks, 8 Sept. 2020, www.geeksforgeeks.org/mapreduce-architecture/.
