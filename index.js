
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// Import Classes
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Blank array to be filled in with pushed constructors classes.
const teamMembersArray = [];

// Initial prompt to begin application
const cliStartQuestion = {
	type: 'list',
	message: `
    Do you wish to start the team builder application?`,
	choices: ['Yes', 'No'],
	name: 'cliIntroQ',
};

// Questions to be answered to fill in the manager constructor
const managerQuestions = [
	{
		type: 'input',
		message: "What is the Manager's name?",
		name: 'managerName',
	},
	{
		type: 'input',
		message: "What is the Manager's ID number?",
		name: 'managerId',
	},
	{
		type: 'input',
		message: "What is the Manager's email?",
		name: 'manageEmail',
	},
	{
		type: 'input',
		message: "What is the Manager's office number?",
		name: 'managerOfficeNumber',
	},
];

// questions that prompts the user if they want to add another team member.
const endManagerQuestions = {
	type: 'list',
	message: 'Would you like to add another team member to this team? Select Yes to add an Engineer or Intern team member or select No if no additional team members need to be added.',
	choices: ['Yes', 'No'],
	name: 'teamSize',
};

// Question to ask which role the new team member should be mapped to.
const teamMemberRolePick = {
	type: 'list',
	message: 'Is this team member an Engineer or an Intern?',
	choices: ['Engineer', 'Intern'],
	name: 'teamMemberRoleType',
};

// Questions for the engineer profile
const engineerQuestions = [
	{
		type: 'input',
		message: "What is this Engineer's name?",
		name: 'engineerName',
	},
	{
		type: 'input',
		message: "What is this Engineer's ID number?",
		name: 'engineerId',
	},
	{
		type: 'input',
		message: "What is this Engineer's email?",
		name: 'engineerEmail',
	},
	{
		type: 'input',
		message: "What is this Engineer's GitHub Profile Name?",
		name: 'engineerGithub',
	},
];

// Questions for the intern profile
const internQuestions = [
	{
		type: 'input',
		message: "What is this intern's name?",
		name: 'internName',
	},
	{
		type: 'input',
		message: "What is this intern's ID number?",
		name: 'internId',
	},
	{
		type: 'input',
		message: "What is this Engineer's email?",
		name: 'internEmail',
	},
	{
		type: 'input',
		message: "What is this Engineer's school?",
		name: 'engineerSchool',
	},
];



// Function to start the application
function cliStart(){
    
inquirer
  .prompt(cliStartQuestion)
  .then((answers) => {
    if (answers.cliIntroQ === 'Yes') {
        console.log('Please Submit Manager Info');
        managerInfo();
    } else {
        console.log('Application Closed');
    };
  });
};

// Function to build the team manager and then call the function to start building the team size
function managerInfo() {
	inquirer.prompt(managerQuestions).then((managerBuild) => {
		let manager = new Manager(managerBuild.managerId, managerBuild.managerName, managerBuild.manageEmail, managerBuild.managerOfficeNumber);
		teamMembersArray.push(manager);
		teamSizeInfo();
	});
}

// Function to determine the size of the team with additional engineers or interns
function teamSizeInfo() {
	inquirer.prompt(endManagerQuestions).then((teamSize) => {
		//* By choosing yes, you can add another team member to the array. This re-cals the teamMemberloop funciton which goes throught the questions to add a new team member to the array
		if (teamSize.teamSize === 'Yes') {
			teamMemberLoop();
		}
		if (teamSize.teamSize === 'No') {
			//* If no more members need to be added, then the application is ended by choosing No and then the file is written to the HTML template
			console.log("HTML Created!");
            finishTeam(teamMembersArray)
		}
	});
}

// Function to choose the type of team member (engineer or intern) and prompt questions to build additional class constructors.
function teamMemberLoop() {
	inquirer.prompt(teamMemberRolePick).then((teamrole) => {
		if (teamrole.teamMemberRoleType === 'Engineer') {
            console.log('Please Submit Engineer Info');
			inquirer.prompt(engineerQuestions).then((engineerBuild) => {
				let engineer = new Engineer(engineerBuild.enginnerId, engineerBuild.engineerName, engineerBuild.engineerEmail, engineerBuild.engineerGithub);
				teamMembersArray.push(engineer);
				teamSizeInfo();
			});
		} else if (teamrole.teamMemberRoleType === 'Intern') {
            console.log('Please Submit Intern Info');
			inquirer.prompt(internQuestions).then((internBuild) => {
				let intern = new Intern(internBuild.internId, internBuild.internName, internBuild.internEmail, internBuild.internSchool);
				teamMembersArray.push(intern);
				teamSizeInfo();
			});
		}
	});
}

// write team profile page and store those files in ./dist
function finishTeam() {
	const managerTemplate = manager => {
		return `<div>${manager.name}</div>`
	}
	const engineerTemplate = engineer => {
		return `<div>${engineer.name}</div>`
	}
	const internTemplate = intern => {
		return `<div>${engineer.name}</div>`
	}
	let data = ``
	for (i = 0; i < teamMembersArray.length; i++) {
		if (teamMembersArray[i].getRole() === "Manager") {
			data += managerTemplate(teamMembersArray[i])
		}
		else if (teamMembersArray[i].getRole() === "Engineer"){
			data += engineerTemplate(teamMembersArray[i])
		}
		else if (teamMembersArray[i].getRole() === "Intern"){
			data += internTemplate(teamMembersArray[i])
		}
	}
	
    const html = `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>My Team</h1>
    ${data}
</body>
</html>
	`;
    fs.writeFile('./dist/team_page.html', html, (err) => {
        if (err) 
        console.log(err); 
        else {
        console.log("Team Page Generated");
      }
    });
}

cliStart();"seed": "node seeders/seed.js",