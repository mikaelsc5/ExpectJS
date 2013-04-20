# ExpectJS

ExpectJS is a Behavior Driven Development assertion library for JavaScript.

> The main purpose of ExpectJS is to make your BDD test writing easy to read, write and maintain.

## When should I use ExpectJS

* You want to write fluent tests
* You want to use an assertion library for the test framework of your choice
* You want to use the same assertion library in all environments
* You want a functional programming capable assert library 
* (You want to extend the assertion library easily)

## Why did you create this?

Jasmine, Chai and expect.js are great, but they all have something that didn't quite work as well as it could. Asynchronous testing support could be better in Jasmine. Chai didn't work in IE8 out of the box. expect.js has unfixed bugs and the syntax isn't as fluent as Jasmine's.

## Included matchers

ExpectJS is inspired by the easy to read Jasmine syntax and the initial matchers are compatible. The development is still in the early phases and it's unknown what will be included in the 1.0 release.

The _'toBe'_ matcher compares with ===

The _'toBeDefined'_ matcher compares against 'undefined'

The _'toBeUndefined'_ matcher compares against 'undefined'

The _'toBeNull'_ matcher compares against 'null'

The _'toBeTruthy'_ matcher is for boolean casting testing

The _'toBeFalsy'_ matcher is for boolean casting testing

The _'toEqual'_ matcher compares objects with ===

The _'toThrow'_ matcher is for testing if a function throws an exception

All matchers have a _'not'_ implemention that negate the matching.

## Design choices

Unable to find an assert library for functional programming a decision was made to create one. The library will follow the rules of function programming laid out by [Stephen Young](http://stephen-young.me.uk/2013/01/20/functional-programming-with-javascript.html "Functional programming with Javascript")
* No value changes, only initial value assigments
* No loops, only recursions
* No object or array state changes
* No Date objects or usage of Math.random due to their changing nature

Unfortunately it will not be possible to be fully follow the rules above as it's not possible to access object properties in a recursive manner in legacy browsers. So at least one exception to the rules must be made, but currently it is unclear how that exception is formulated. Also recursion has a high risk of causing a stack overflow, which means complex structures needs to be handled some other way that is to be determined later.

This will be a learning effort as well as the author does not fully master functional programming. All contributions are welcomed.

The library will use closures, Monads, recursions, continuations and trampolines where needed. Optimizations will not be done at the early stages of the development, but will be considered later on to improve the performance. Therefore while performance is a key factor, it will not be benchmarked until later. Once the library has become easily extendable, then alternative implementations can be benchmarked and the best performing one is selected by default and the others can be used as drop-in replacements to better fit the developer needs.

### The MIT License (MIT)

> Copyright (C) 2013 Mikael Blomberg.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.