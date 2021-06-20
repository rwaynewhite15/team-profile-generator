
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
		name: 'enginnerName',
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
		let manager = new Manager(managerBuild.managerName, managerBuild.managerId, managerBuild.manageEmail, managerBuild.managerOfficeNumber);
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
		}
	});
}

// Function to choose the type of team member (engineer or intern) and prompt questions to build additional class constructors.
function teamMemberLoop() {
	inquirer.prompt(teamMemberRolePick).then((teamrole) => {
		if (teamrole.teamMemberRoleType === 'Engineer') {
			inquirer.prompt(engineerQuestions).then((engineerBuild) => {
				let engineer = new Engineer(engineerBuild.enginnerName, engineerBuild.engineerId, engineerBuild.engineerEmail, engineerBuild.engineerGithub);
				teamMembersArray.push(engineer);
				teamSizeInfo();
			});
		} else if (teamrole.teamMemberRoleType === 'Intern') {
			inquirer.prompt(internQuestions).then((internBuild) => {
				let intern = new Intern(internBuild.internName, internBuild.internId, internBuild.internEmail, internBuild.internSchool);
				teamMembersArray.push(intern);
				teamSizeInfo();
			});
		}
	});
}

// write team profile page and store those files in ./dist
function finishTeam() {
    // finish process by writing file, displaying success or error msg
    fs.writeFile('./dist/team_page.html', getHTML(), (err) =>
      err ? console.error(err) : console.log('Generated team page!')
    );
}

cliStart();