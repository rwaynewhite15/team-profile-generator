const Employee = require('../lib/Employee');

test('Employee Test #1', () => {
    const employee = new Employee('name', '1','test@email.com')
    expect(employee.getName()).toEqual(expect.stringContaining('name'));
})
test('Employee Test #2', () => {
    const employee = new Employee('name', '1','test@email.com')
    expect(employee.getId()).toEqual(expect.stringContaining('1'));
})
test('Employee Test #3', () => {
    const employee = new Employee('name', '1','test@email.com')
    expect(employee.getEmail()).toEqual(expect.stringContaining('test@email.com'));
})
test('Employee Test #4', () => {
    const employee = new Employee('name', '1','test@email.com')
    expect(employee.getRole()).toEqual(expect.stringContaining('Employee'));
})
