/*
Here we create a class with a couple of methods (add, ...)

*/

// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     return a / b;
//   }
// }

/*
Now, just like we've learned, we can use module.exports to export our calculator. REMEMBER that we use module.exports when we just want to export one single value, in this case the value is the calculator class.
module.exports is exactly what is returned from one module, meaning that we can save this exported value into a variable when importing it (again, because it is only one value).
We import it in modules.js.

*/

// module.exports = Calculator;

/*
We can export this calculator in a more elegant way, we can assign the class directly to module.export, above we have a class declaration (a bit like a function declaration) but we can do it with a class expression.
Like this we assign the value directly to the variable module.exports and only name it in the import.
It's like jumping the step of creating a class declaration (with a name) and then assign that class to the module.exports variable, like this we do it directly.

*/

module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
};
