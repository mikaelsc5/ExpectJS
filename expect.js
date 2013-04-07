// ExpectJS
// ========

// ExpectJS 0.0.1

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

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

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
  expect.VERSION = '0.0.1';


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
    function addMatcher(name, matcherFunction) {
      prototype[name] = matcherFunction;
      prototype.not[name] = function(expected) {
        return prototype[name](!expected);
      }
    }

  	// expect('expression').toBe
  	// -------------------------

  	// A Matcher function that compares objects or primitives 'expression' and 'expected'
    // and passes if they are the same object or primitives

    // Throws a failed object with actual and expected values.
    addMatcher('toBe', function(expected) {
      if (expression === expected) {
        return;
      } else {
        var failed = {
          actual: expression,
          expected: expected
        };
        throw failed;
      }
    });

    // Returns reference to the ExpectJS object with all the defined matchers.
  	return prototype;
  }

// Immediately invoke the function expression to define the expect object.
}).call(this);
