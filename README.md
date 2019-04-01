ImmutableArrayMap

ImmutableArrayMap is a data structure that contains:
1) Array to save the data [ {idAttribute: x, ...restItem}, ...restData]
2) Map {idAttribute: arrIndex} to maintain pointers to the index in the array
It allows get, update and add in constant time (depending on the number of changed/added items)

List of features
* multiple operations in constant time: update, add, getItem, getIndex, isEmpty, size, getArray
* remove operation in O(n) time

Download & Installation
$ npm i immutable-array-map

Authors or Acknowledgments
Yehonatan Sayag
License
This project is licensed under the MIT License