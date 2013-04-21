// ExpectJS
// ========

// ExpectJS 0.0.11

// (c) 2013 Mikael Blomberg
// ExpectJS may be freely distributed under the MIT license.

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `expect` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousExpect = root.expect;

  // The top-level namespace. All public ExpectJS classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var expect = ExpectJS;
  if ((typeof module === "object") &&
      (typeof module.exports === "object")) {
    module.exports = expect;
  } else {
    root.expect = expect;
  }

  // Current version of the library. Keep in sync with `package.json`.
  expect.VERSION = '0.0.11';

  // Runs ExpectJS in *noConflict* mode, returning the `expect` variable
  // to its previous owner. Returns a reference to this expect object.
  expect.noConflict = function() {
    root.expect = previousExpect;
    return this;
  };

  // ExpectJS constructor
  function ExpectJS(expression) {

  	// ExpectJS object
    var prototype = Object.create(null);

    // ExpectJS 'not' property to negate the matcher
    prototype.not = Object.create(null);

    // ExpectJS failed object
    var failed = {
      "message" : null,
      "actual" : expression,
      "expected" : null
    }

    // A function for adding more matchers to ExpectJS.
    // The added function will have the given name and
    // negated in the 'not' property.
    function addMatcher(name, matcherFunction, notMatcherFunction) {
      prototype[name] = matcherFunction;
      prototype.not[name] = notMatcherFunction;
    }

    // A function for comparing 'actual' with 'expected' using the identity operator.
    // The comparison is negated when 'not' is true.
    // Returns itself for chaining.
    function identityComparison(actual, expected, not) {
      if (((not === true) && (actual !== expected)) ||
          ((not !== true) && (actual === expected))) {
        return prototype;
      } else {
        failed.message = "Expected " + actual + " to equal " + expected;
        failed.expected = expected;
        throw failed;
      }
    };

    // A function for comparing objects 'actual' with 'expected' using the identity operator.
    // The comparison is negated when 'not' is true.
    // Returns itself for chaining.
    function deepComparison(actual, expected, not) {
      // Compare values using the identity operator
      if (((not === true) && (actual !== expected)) ||
          ((not !== true) && (actual === expected))) {
        return prototype;
      // Compare object type as only objects can have deep comparison
      // TODO: handle more data types
      } else if (((not === true) &&
                  (typeof actual === "object") &&
                  (typeof expected !== "object")) ||
                 ((not !== true) &&
                  (typeof actual !== "object") &&
                  (typeof expected !== "object"))) {
          failed.message = "Expected " + actual + " to equal " + expected;
          failed.expected = expected;
          throw failed;
      } else {
        // Unfortunately, there is no way to access Object properties in a recursive fashion in legacy browsers
        // therefore we are forced to break the looping rules of functional programming
        var actualKeys = [];
        for(var actualProperty in actual) {
          actualKeys.push(actualProperty);
        }
        var expectedKeys = [];
        for(var expectedProperty in expected) {
          expectedKeys.push(expectedProperty);
        }

        // Check key array lengths, if they aren't identical, then the objects are different
        if (((not === true) && (actualKeys.length === expectedKeys.length)) ||
            ((not !== true) && (actualKeys.length !== expectedKeys.length))) {
          failed.message = "Expected " + actual + " to equal " + expected;
          failed.expected = expected;
          throw failed;
        } else {
          // The arrays have the same lenght, then check the keys are identical
          for(var index = 0, indexLength = actualKeys.length; index < indexLength; index += 1) {
            var key = actualKeys[index];
            if (((not === true) && (actual[key] === expected[key])) ||
                ((not !== true) && (actual[key] !== expected[key]))) {
              failed.message = "Expected " + actual + " to equal " + expected;
              failed.expected = expected;
              throw failed;
            }
          }
        }

        // No differences were detected, return prototype for chaining
        return prototype;
      }
    };

    // A function for recursively comparing array values with 'expected' using the identity operator.
    // The comparison is negated when 'not' is true.
    // Returns itself for chaining.

    function recursiveComparison(array, expected, not) {
      // Store the index for the last value in the array to compare
      // when all elements in the array has been checked
      var lastIndex = array.length - 1;

      // Use recursion function to utilizes the closure for accessing the values
      var recursion = function(index) {
        var value = array[index];
        // Halt condition:
        // All elements in the array has been checked and none was the 'expected' value or
        // the 'not' expected value has been found
        if (((not !== true) && (lastIndex === index)) ||
            ((not === true) && (value === expected))) {
          failed.message = "Expected to find " + expected + " in " + array;
          failed.expected = expected;
          throw failed;
        // Pass condition:
        // The 'expected' value has been found or
        // all elements in the array has been checked and none was the 'not' expected value
        } else if (((not !== true) && (value === expected)) ||
                   ((not === true) && (lastIndex === index))) {
          return prototype;
        } else {
          return recursion(index + 1);
        }
      };
      // Execute the recursion function to start from the first element in the array
      recursion(0);
    }

    // A function for comparing the 'actual' string with the 'expected' pattern using regular expressions.
    // The comparison is negated when 'not' is true.
    // Returns itself for chaining.
    function matchComparison(actual, expected, not) {
      // Create regular expression of "expected" unless "expected" already is a regular expression.
      var regularExpression = (typeof expected === "object" && typeof expected.test === "function") ?
                              expected :
                              new RegExp(expected);
      // Test the regular expression pattern for the "actual".
      // The match passes when the test returns true and the "not" parameter is false or
      // when the test returns false and the "not" parameter is true.
      if (regularExpression.test(actual) === !not) {
        return prototype;
      // The match fails when the test returns true and the "not" parameter is also true or
      // when the test returns false and the "not" parameter is false.
      } else {
        failed.message = "Expected " + actual + (not === true ? " not" : "") + " to match " + regularExpression;
        failed.expected = expected;
        throw failed;
      }
    };

  	// expect('expression').toBe
  	// -------------------------

    // The 'toBe' matcher compares 'expression' and 'expected' with ===.
    // 'not.toBe' compares 'expression' and 'expected' with !==.
    // The match passes if they are the same object or primitives and
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBe', function(expected) {
      return identityComparison(expression, expected, false);
    }, function (expected) {
      return identityComparison(expression, expected, true);
    });

    // expect('expression').toBeDefined
    // -------------------------

    // The 'toBeDefined' matcher compares 'expression' with !== undefined.
    // 'not.toBeDefined' compares 'expression' with === undefined.
    // The match passes if they are the same object or primitives and
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBeDefined', function() {
      var notDefined; // notDefined is deliberately not defined, to be evaluated as undefined.
      return identityComparison(expression, notDefined, true);
    }, function() {
      var notDefined; // notDefined is deliberately not defined, to be evaluated as undefined.
      return identityComparison(expression, notDefined, false);
    });

    // expect('expression').toBeUndefined
    // -------------------------

    // The 'toBeUndefined' matcher compares 'expression' with === undefined.
    // 'not.toBeUndefined' compares 'expression' with !== undefined.
    // The match passes if they are the same object or primitives and
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBeUndefined', function() {
      var notDefined; // notDefined is deliberately not defined, to be evaluated as undefined.
      return identityComparison(expression, notDefined, false);
    }, function() {
      var notDefined; // notDefined is deliberately not defined, to be evaluated as undefined.
      return identityComparison(expression, notDefined, true);
    });

    // expect('expression').toBeNull
    // -------------------------

    // The 'toBeNull' matcher compares 'expression' with === null.
    // 'not.toBeNull' compares 'expression' with !== null.
    // The match passes if they are the same object or primitives and
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBeNull', function() {
      var isNull = null;
      return identityComparison(expression, isNull, false);
    }, function() {
      var isNull = null;
      return identityComparison(expression, isNull, true);
    });

    // The 'toBeThruthy' matcher compares !!'expression' with === true.
    // 'not.toBeThruthy' compares !!'expression' with !== true.
    // The match passes if they are both true
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBeTruthy', function() {
      return identityComparison(!!expression, true, false);
    }, function() {
      return identityComparison(!!expression, true, true);
    });

    // The 'toBeFalsy' matcher compares !'expression' with === true.
    // 'not.toBeFalsy' compares !!'expression' with !== true.
    // The match passes if they are both false
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBeFalsy', function() {
      return identityComparison(!expression, true, false);
    }, function() {
      return identityComparison(!expression, true, true);
    });

    // The 'toEqual' matcher compares 'expression' with the 'expected' value.
    addMatcher('toEqual', function (expected) {
      return deepComparison(expression, expected, false);
    }, function (expected) {
      return deepComparison(expression, expected, true);
    });

    // The 'toMatch' matcher compares 'expression' with the 'expected' regular expression.
    addMatcher('toMatch', function (expected) {
      return matchComparison(expression, expected, false);
    }, function (expected) {
      return matchComparison(expression, expected, true);
    })

    // The 'toContain' matcher searches the 'expression' Array for the 'expected' value.
    // 'not.toContain' searches the 'expression' Array not to contain the 'expected' value.
    // The match passes if the 'expected' value is found.
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toContain', function(expected) {
      return recursiveComparison(expression, expected, false);
    }, function(expected) {
      return recursiveComparison(expression, expected, true);
    });

    // The 'toThrow' matcher catches the exception the 'expression' throws when executed.
    // 'not.toThrow' expects no exception to be thrown when the 'expression' is executed.
    // The match passes if no exception is thrown.
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toThrow', function(expected) {
      try {
        expression();
      } catch (e) {
        return prototype;
      }
      failed.message = "Expected " + expression + " to throw exception " + expected;
      failed.expected = expected;
      throw failed;
    }, function(expected) {
      try {
        expression();
      } catch (e) {
        failed.message = "Expected " + expression + " not to throw exception " + expected;
        failed.expected = expected;
        throw failed;
      }
      return prototype;
    });


    // Returns reference to the ExpectJS object with all the defined matchers.
    return prototype;
  }

// Immediately invoke the function expression to define the expect object.
}).call(this);
