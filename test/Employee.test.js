const Employee = require("../lib/Employee");

test("Employee is object with properties", () => {
  const e = new Employee();
  expect(typeof e).toBe('object');
});

