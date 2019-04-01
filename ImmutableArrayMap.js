/**
 * ImmutableArrayMap is a data structure that contains:
 * 1) Array to save the data [ {idAttribute: x, ...restItem}, ...restData]
 * 2) Map {idAttribute: arrIndex} to maintain pointers to the index in the array
 * It allows get, update and add in constant time (depending on the number of changed/added items)
 */
export default class ImmutableArrayMap {
	/**
	 * Create a new ImmutableArrayMap instance from a given array.
	 * Unless a map will be passed excplicitly, a new map will be built based on the idAttribute
	 * @param {Array} arr
	 * @param {String} idAttribute
	 * @param {Object} [map]
	 */
	constructor(arr = [], idAttribute, map) {
		this._arr = arr;
		this._idAttribute = idAttribute;
		this._map = Object.entries(map).length === 0 && map.constructor === Object ? buildMap(this) : map;
	}
}

/**
 * returns a reference to a new ImmutableArrayMap object, with the existing data.
 * @returns {ImmutableArrayMap}
 * @private
 */
const _clone = (self) => {
	return new self.constructor(self._arr, self._idAttribute, self._map);
};

/**
 * updates in-place the array according to a given item
 * @param {Object} item
 * @private
 */
const _setItem = (self, item) => {
	const id = item && item[self._idAttribute];
	const mapItem = self._map & self._map[id];
	if (mapItem != null) {
		self._arr[mapItem] = {...item};
	}
};

/**
 * Based on the current array state, build a map keyed by idAttribute.
 * For each item keep a pointer (arrIndex) to its index in the array.
 * @private
 */
export const buildMap = (self) => {
	const map = {};
	for (let i = 0; i < self._arr.length; i++) {
		const item = self._arr[i];
        const id = item && item[self._idAttribute];
		if (id != null) {
			map[id] = i;
		}
	}
	return map;
};

/**
 * Updates the array with the passed items.
 * Returns a reference to an updated new ImmutableArrayMap object.
 * @param {Array} items
 * @returns {ImmutableArrayMap}
 */
export const update = (self, items) => {
	if (!(items instanceof Array)) items = [items];
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		_setItem(self, item);
	}
	return _clone(self);
};

/**
 * add new items to the array, update the map accordingly.
 * Returns a reference to an updated new ImmutableArrayMap object.
 * @param {Array} items
 * @returns {ImmutableArrayMap}
 */
export const add = (self, items) => {
	if (!(items instanceof Array)) items = [items];
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
        const id = item && item[self._idAttribute];
		const mapItem = self._map && self._map[id];

		if (mapItem == null) {
			self._arr.push(item);
			self._map[id] = self._arr.length - 1;
		}
	}

	return _clone(self);
};

/**
 * removes an item from the array, re-build the map accordingly.
 * If the id is not found, return the same ImmutableArrayMap object.
 * Else return a reference to an updated new ImmutableArrayMap object.
 * @param {String} id
 * @returns {ImmutableArrayMap}
 */
export const remove = (self, ids) => {
	if (!(ids instanceof Array)) ids = [ids];

	ids.forEach(id => {
		const index = self._map && self._map[id];
		self._arr[index] = 'toRemove';
	});


	let i = 0,
		j = 0;
	while (i < self._arr.length) {
		const val = self._arr[i];
		if (val !== 'toRemove') self._arr[j++] = val;
		i++;
	}
	self._arr.length = j;

	self._map = buildMap(self);
	return _clone(self);
};

/**
 * Given an id (that matches idAttribute) - return the item from the array.
 * @param {String} id
 * @returns {Array}
 */
export const getItem = (self, id) => {
	const index = self && self._map && self._map[id];
	return index != null && self._arr[index];
};

/**
 * Given an id (that matches idAttribute) - return the index of item from the array.
 * @param {String} id
 * @returns {Array}
 */
export const getIndex = (self, id) => {
	return self && self._map && self._map[id];
};

export const isLast = (self, id) => {
	return getIndex(id) === size(self) - 1;
};

export const isEmpty = (self) => {
	return size(self) === 0;
};

export const size = (self) => {
	return self._arr.length;
};

/**
 * return the array of the ImmutableArrayMap.
 * @returns {Array}
 /**
 * return the array of the ImmutableArrayMap.
 * @returns {Array}
 */
export const getArray = (self) => {
	return self._arr;
};
