const Engineer = require("../lib/Engineer");

const e = new Engineer('Foo', 1, 'test@test.com', 'testValue');

test("Can set GitHub account via constructor", () => {
  
    expect(e.github).toBe('testValue');
  });

  test("Can set email via constructor", () => {
    expect(e.email).toEqual('test@test.com');
});

test("getRole() should return \"Engineer\"", () => {
    expect(e.getRole()).toEqual("Engineer");
});

test("Can get GitHub username via getGithub()", () => {
    expect(e.getGithub()).toEqual('testValue');
});
