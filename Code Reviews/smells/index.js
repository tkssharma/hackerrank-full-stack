/*
Closure smells
Coupling of JS/HTML/CSS
Empty catch
Excessive global variables
Large object
Large object
Long message chain
Long method/function
Long parameter list
Nested callback
Refused bequest
Switch statement
Unused code
*/

/* Example # 1 */
function isNumber(test) {
	if (typeof test === 'number') return true;
	else return false;
}

/* Example # 2 */
function isNotBoolean(test) {
	var retVal = false; //or any other initialization
	if (typeof test === 'boolean') {
		retVal = false;
	} else {
		retVal = true;
	}
	return retVal;
}

/* Example # 1*/
function isNumber(test) {
	return typeof test === 'number';
}

/* Example #2 */
function isNotBoolean(test) {
	return typeof test !== 'boolean';
}

/* Example */
function stringAdd(numString) {
	var val = parseInt(numString);
	if (numString === NaN) {
		return 0;
	} else {
		return val;
	}
}
/* Example */
function stringAdd(numString) {
	return Number(numString) || 0;
}

/* Example 1*/
function haircut(persons) {
	var that = this;

	persons.forEach(function(person) {
		that.cut(person);
	});
}

/* Example 1*/
function haircut(persons) {
	//var that = this;

	persons.forEach((person) => {
		that.cut(person);
	});
}
