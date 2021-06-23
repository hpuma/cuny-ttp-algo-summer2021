// Problem Statement #

// Design a class to calculate the median of a number stream. The class should have the following two methods:

//   1. insertNum(int num): stores the number in the class
//   2. findMedian(): returns the median of all numbers inserted in the class

// If the count of numbers inserted in the class is even, the median will be the average of the middle two numbers.

class Heap {
  constructor(comparator) {
    this.values = [];
    this.comparator = comparator || Heap.minComparator;
  }

  static minComparator = (a, b) => { return a - b; }
  static maxComparator = (a, b) => { return b - a; }

  add(val) {
    this.values.push(val);
    this.bubbleUp();
  }
  
  peek() {
    return this.values[0] || null;
  }

  size(){
    return this.values.length || 0;
  }

  poll() {
    const max = this.values[0];
    const end = this.values.pop();
    
    if (this.values.length) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return max;
  }
  
  bubbleUp() {
    let index = this.values.length - 1;
    let parent = Math.floor((index - 1)/2);
    while (this.comparator(this.values[index], this.values[parent]) < 0) {
      [this.values[parent], this.values[index]] = [this.values[index], this.values[parent]];
      index = parent;
      parent = Math.floor((index - 1)/2);
    };    
  }
  
  bubbleDown() {
    let index = 0;
    let length = this.values.length
    let left = null, right = null, swap = null;
    let leftIndex = 0, rightIndex = 0;
    while (true) {
      left = null; right = null; swap = null;
      leftIndex = (index * 2) + 1;  rightIndex = (index * 2) + 2;

      if (leftIndex < length) {
        left = this.values[leftIndex];
        if (this.comparator(left, this.values[index]) < 0)  swap = leftIndex;

      } else if (rightIndex < length) {
        right = this.values[rightIndex];
        if (this.comparator(right, this.values[index]) < 0) swap = rightIndex;
      }
      
      if (swap === null) break;
      
      [this.values[index], this.values[swap]] = [this.values[swap], this.values[index]];
      index = swap
    }
  }
};



class MedianOfAStream {
  constructor(comparator) {
    this.maxHeap = new Heap(Heap.maxComparator);
    this.minHeap = new Heap(Heap.minComparator);
  }

  insert_num(num) {
    if (this.maxHeap.peek() === null || num < this.maxHeap.peek()) {
      this.maxHeap.add(num);
    } else {
      this.minHeap.add(num);
    }
    const minHeapSize = this.minHeap.size(),  maxHeapSize = this.maxHeap.size();
    if (maxHeapSize - minHeapSize > 1) {
      this.minHeap.add(this.maxHeap.poll());
    } else if (minHeapSize - maxHeapSize > 1) {
      this.maxHeap.add(this.minHeap.poll());
    }

    return -1;
  }

  find_median(self) {
    const minHeapSize = this.minHeap.size(),  maxHeapSize = this.maxHeap.size();
    if (maxHeapSize > minHeapSize) {
      return this.maxHeap.peek();
    } else if (maxHeapSize < minHeapSize) {
      return this.minHeap.peek();
    } else {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
    return 0.0;
  }
}

var medianOfAStream = new MedianOfAStream();
medianOfAStream.insert_num(3);
medianOfAStream.insert_num(1);
console.log(`The median is: ${medianOfAStream.find_median()}`);
medianOfAStream.insert_num(5);
console.log(`The median is: ${medianOfAStream.find_median()}`);
medianOfAStream.insert_num(4);
console.log(`The median is: ${medianOfAStream.find_median()}`);
