const { TestScheduler } = require("jest");
const Intern = require("../lib/Intern");

const i = new Intern('Andy', 3, 'andy@gmail.com', 'Purdue');

test("Can set school via constructor", () => {
    expect(i.school).toEqual('Purdue');
});
