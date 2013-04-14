describe("ExpectJS", function() {
	describe("A suite", function() {
		it("contains spec with an expectation", function() {
			expect(true).toBe(true);
		});
	});

	describe("A suite is just a function", function() {
		var a;

		it("and so is a spec", function() {
			a = true;

			expect(a).toBe(true);
		});
	});

	describe("The 'toBe' matcher compares with ===", function() {
		it("and has a positive case ", function() {
			expect(true).toBe(true);
		});

		it("and can have a negative case", function() {
			expect(false).not.toBe(true);
		});
	});

	describe("Included matchers:", function() {
		it("The 'toBe' matcher compares with ===", function() {
			var a = 12;
			var b = a;

			expect(a).toBe(b);
			expect(a).not.toBe(null);
		});

		it("The 'toBeDefined' matcher compares against 'undefined'", function() {
			var a = {
				foo: 'foo'
			};

			expect(a.foo).toBeDefined();
			expect(a.bar).not.toBeDefined();
		});

		it("The 'toBeUndefined' matcher compares against 'undefined'", function() {
			var a = {
				foo: 'foo'
			};

			expect(a.foo).not.toBeUndefined();
			expect(a.bar).toBeUndefined();
		})

		it("The 'toBeNull' matcher compares against null", function() {
			var a = null;
			var foo = 'foo';

			expect(null).toBeNull();
			expect(a).toBeNull();
			expect(foo).not.toBeNull();
		});

		it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
			var a, foo = 'foo';

			expect(foo).toBeTruthy();
			expect(a).not.toBeTruthy();
		});
	});

});