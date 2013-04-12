// ExpectJS
// ========

// ExpectJS 0.0.4

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
  expect.VERSION = '0.0.4';

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

    // A function for adding more matchers to ExpectJS.
    // The added function will have the given name and
    // negated in the 'not' property.
    function addMatcher(name, matcherFunction, notMatcherFunction) {
      prototype[name] = matcherFunction;
      prototype.not[name] = notMatcherFunction;
    }

    // A function for comparing 'expression' with 'expected' using the identity operator.
    // The comparison is negated when 'not' is true.
    // Returns itself for chaining.
    function identityComparison(expected, not) {
      if (((not === true) && (expression !== expected)) ||
          ((not !== true) && (expression === expected))) {
        return prototype;
      } else {
        var failed = {
          actual: expression,
          expected: expected
        };
        throw failed;
      }
    };

  	// expect('expression').toBe
  	// -------------------------

    // The 'toBe' matcher compares 'expression' and 'expected' with ===.
    // 'not.toBe' compares 'expression' and 'exprected' with !==.
    // The match passes if they are the same object or primitives and
    // returns itself for chaining

    // A failed match throws a failed object with actual and expected values.

    addMatcher('toBe', function(expected) {
      return identityComparison(expected, false);
    }, function (expected) {
      return identityComparison(expected, true);
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
      return identityComparison(notDefined, true);
    }, function() {
      var notDefined; // notDefined is deliberately not defined, to be evaluated as undefined.
      return identityComparison(notDefined, false);
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
      return identityComparison(notDefined, false);
    }, function() {
      var notDefined; // notDefined is deliberately not defined, to be evaluated as undefined.
      return identityComparison(notDefined, true);
    });

    // Returns reference to the ExpectJS object with all the defined matchers.
    return prototype;
  }

// Immediately invoke the function expression to define the expect object.
}).call(this);
