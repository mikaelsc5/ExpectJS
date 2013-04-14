# ExpectJS

ExpectJS is a Behavior Driven Development assertion library for JavaScript.

> The main purpose of ExpectJS is to make your BDD test writing easy to read, write and maintain.

## When should I use ExpectJS

* You want to write fluent tests
* You want to use an assertion library for the test framework of your choice
* You want to use the same assertion library in all environments
* You want to extend the assertion library easily

## Why did you create this?

Jasmine, Chai and expect.js are great, but they all have something that didn't quite work as well as it could. Asynchronous testing support could be better in Jasmine. Chai didn't work in IE8 out of the box. expect.js has unfixed bugs and the syntax isn't as fluent as Jasmine's.

## Included matchers

The _'toBe'_ matcher compares with ===

The _'toBeDefined'_ matcher compares against 'undefined'

The _'toBeUndefined'_ matcher compares against 'undefined'

The _'toBeNull'_ matcher compares against 'null'

The _'toBeTruthy'_ matcher is for boolean casting testing

The _'toBeFalsy'_ matcher is for boolean casting testing


All matchers have a _'not'_ implemention that negate the matching.

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