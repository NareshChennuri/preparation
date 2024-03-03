/*

Java Collections framework provides a set of interfaces and classes that represent different types of data structures like lists, sets, maps, etc., along with algorithms to manipulate them. Each collection type is designed for specific use cases. Here's a brief overview of common Java collections and when to use them:

ArrayList:
--------------
Use when you need a resizable array.
Good for random access and traversal but not ideal for frequent insertion/deletion in the middle.

LinkedList:
--------------
Use when you need fast insertion and deletion at the beginning or middle of the list.
Suitable for implementing queues, stacks, etc.

HashSet:
--------------
Use when you need an unordered collection with no duplicates.
Provides constant-time performance for basic operations like add, remove, and contains.

TreeSet:
--------------
Use when you need a sorted set of unique elements.
Elements are stored in a sorted order defined by either natural ordering or a custom comparator.

HashMap:
--------------
Use when you need key-value pairs and don't require ordering.
Provides constant-time performance for basic operations like get, put, and remove.

TreeMap:
--------------
Use when you need a sorted map based on the natural ordering of its keys or a custom comparator.
Provides log(n) time complexity for basic operations.

LinkedHashMap:
--------------
Use when you need a map that preserves insertion order.
Maintains a doubly-linked list running through all of its entries, providing a predictable iteration order.

PriorityQueue:
--------------
Use when you need to process elements based on their priority.
Elements are dequeued based on their natural ordering or a custom comparator.

Stack:
--------------
Use when you need a Last-In-First-Out (LIFO) data structure.
Not commonly used directly; often replaced by the Deque interface or the ArrayDeque class.

Queue:
--------------
Use when you need a First-In-First-Out (FIFO) data structure.
Commonly used for implementing BFS (Breadth-First Search) algorithms and event-driven simulations.

Deque:
--------------
Use when you need a double-ended queue that supports insertion and deletion at both ends.

Suitable for implementing a stack, queue, or deque.

Choose the appropriate collection based on your specific requirements regarding data structure, performance characteristics, ordering, and behavior. It's also essential to consider thread-safety requirements if your application is multi-threaded.

*/