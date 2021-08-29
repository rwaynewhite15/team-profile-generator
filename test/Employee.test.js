const Employee = require("../lib/Employee");
const e = new Employee(1, 'Foo', 'mike@gmail.com');

test("Employee is object with properties", () => {
  expect(typeof e).toBe('object');
});
test("Can instantiate Employee instance", () => {
  expect(e instanceof Employee).toEqual(true);
});

test("Can set name via constructor arguments", () => {
  expect(e.name).toEqual('Foo');
});

test("Can set id via constructor argument", () => {
  expect(e.id).toEqual(1);
});

test("Can set email via constructor argument", () => {
  expect(e.email).toEqual('mike@gmail.com');
});

test("Can get name via getName()", () => {
  expect(e.getName()).toEqual('Foo');
});

test("Can get id via getId()", () => {
  expect(e.getId()).toEqual(1);
});

test("Can get email via getEmail()", () => {
  expect(e.getEmail()).toEqual('mike@gmail.com');
});

test("Can get role via getRole()", () => {
  expect(e.getRole()).toEqual('Employee');
});

test("1 + 1 = 2", () => {
  expect(2).toEqual(1+1);
})

