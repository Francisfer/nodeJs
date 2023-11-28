/*

The alternative of doing module.exports is to add properties to the exports objects itself.
We are using the calculator example from before.
This is used when we want to export multiple values from one module.

We created three anonymous functions and assign them to three properties of exports. Now, when we import this module on tge other side we will get access to this properties in the object.

*/

exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
