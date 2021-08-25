const Manager = require("../lib/Manager");

const m = new Manager('Justin', 2, 'justin@gmail.com', 62379);

test("Get office number with getOfficeNumber()", () => {
    expect(m.getOfficeNumber()).toEqual(62379);
});