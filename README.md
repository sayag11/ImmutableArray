# Project Title

ImmutableArrayMap is a data structure that contains:
1) Array to save the data
2) Map {idAttribute: arrIndex} to maintain pointers to the index in the array

## Features

* multiple operations in constant time: update, add, getItem, getIndex, isEmpty, size, getArray
* remove operation in O(n) time

### Installing
```
npm install immutable-array-map
```

## Usage

```javascript
import ImmutableArrayMap from 'immutable-array-map';

const data = new ImmutableArrayMap([], 'id', {});

```

## Features

* **Yehonatan Sayag** - *Initial work* - [sayag11](https://github.com/sayag11)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
