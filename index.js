const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

// Import Classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Blank array to be filled in with pushed constructors classes.
const teamMembersArray = [];

// Initial prompt to begin application
const cliStartQuestion = {
  type: "list",
  message: `
    Do you wish to start the team builder application?`,
  choices: ["Yes", "No"],
  name: "cliIntroQ",
};

// Questions to be answered to fill in the manager constructor
const managerQuestions = [
  {
    type: "input",
    message: "What is the Manager's name?",
    name: "managerName",
  },
  {
    type: "input",
    message: "What is the Manager's ID number?",
    name: "managerId",
  },
  {
    type: "input",
    message: "What is the Manager's email?",
    name: "manageEmail",
  },
  {
    type: "input",
    message: "What is the Manager's office number?",
    name: "managerOfficeNumber",
  },
];

// questions that prompts the user if they want to add another team member.
const endManagerQuestions = {
  type: "list",
  message:
    "Would you like to add another team member to this team? Select Yes to add an Engineer or Intern team member or select No if no additional team members need to be added.",
  choices: ["Yes", "No"],
  name: "teamSize",
};

// Question to ask which role the new team member should be mapped to.
const teamMemberRolePick = {
  type: "list",
  message: "Is this team member an Engineer or an Intern?",
  choices: ["Engineer", "Intern"],
  name: "teamMemberRoleType",
};

// Questions for the engineer profile
const engineerQuestions = [
  {
    type: "input",
    message: "What is this Engineer's name?",
    name: "engineerName",
  },
  {
    type: "input",
    message: "What is this Engineer's ID number?",
    name: "engineerId",
  },
  {
    type: "input",
    message: "What is this Engineer's email?",
    name: "engineerEmail",
  },
  {
    type: "input",
    message: "What is this Engineer's GitHub Profile Name?",
    name: "engineerGithub",
  },
];

// Questions for the intern profile
const internQuestions = [
  {
    type: "input",
    message: "What is this intern's name?",
    name: "internName",
  },
  {
    type: "input",
    message: "What is this intern's ID number?",
    name: "internId",
  },
  {
    type: "input",
    message: "What is this Engineer's email?",
    name: "internEmail",
  },
  {
    type: "input",
    message: "What is this Engineer's school?",
    name: "internSchool",
  },
];

// Function to start the application
function cliStart() {
  inquirer.prompt(cliStartQuestion).then((answers) => {
    if (answers.cliIntroQ === "Yes") {
      console.log("Please Submit Manager Info");
      managerInfo();
    } else {
      console.log("Application Closed");
    }
  });
}

// Function to build the team manager and then call the function to start building the team size
function managerInfo() {
  inquirer.prompt(managerQuestions).then((managerBuild) => {
    let manager = new Manager(
      managerBuild.managerId,
      managerBuild.managerName,
      managerBuild.manageEmail,
      managerBuild.managerOfficeNumber
    );
    teamMembersArray.push(manager);
    teamSizeInfo();
  });
}

// Function to determine the size of the team with additional engineers or interns
function teamSizeInfo() {
  inquirer.prompt(endManagerQuestions).then((teamSize) => {
    //* By choosing yes, you can add another team member to the array. This re-cals the teamMemberloop funciton which goes throught the questions to add a new team member to the array
    if (teamSize.teamSize === "Yes") {
      teamMemberLoop();
    }
    if (teamSize.teamSize === "No") {
      //* If no more members need to be added, then the application is ended by choosing No and then the file is written to the HTML template
      console.log("HTML Created!");
      finishTeam(teamMembersArray);
    }
  });
}

// Function to choose the type of team member (engineer or intern) and prompt questions to build additional class constructors.
function teamMemberLoop() {
  inquirer.prompt(teamMemberRolePick).then((teamrole) => {
    if (teamrole.teamMemberRoleType === "Engineer") {
      console.log("Please Submit Engineer Info");
      inquirer.prompt(engineerQuestions).then((engineerBuild) => {
        let engineer = new Engineer(
          engineerBuild.engineerId,
          engineerBuild.engineerName,
          engineerBuild.engineerEmail,
          engineerBuild.engineerGithub
        );
        teamMembersArray.push(engineer);
        teamSizeInfo();
      });
    } else if (teamrole.teamMemberRoleType === "Intern") {
      console.log("Please Submit Intern Info");
      inquirer.prompt(internQuestions).then((internBuild) => {
        let intern = new Intern(
          internBuild.internId,
          internBuild.internName,
          internBuild.internEmail,
          internBuild.internSchool
        );
        teamMembersArray.push(intern);
        teamSizeInfo();
      });
    }
  });
}

// write team profile page and store those files in ./dist
function finishTeam() {
  const managerTemplate = (manager) => {
    return `<div class="row">
	<div class="team-area col-12 d-flex justify-content-center">
	  <div class="card employee-card">
		<div class="card-header">
		  <h2 class="card-title">${manager.name}</h2>
		  <h3 class="card-title">
			<i class="fas fa-mug-hot mr-2"></i>Engineering Manager
		  </h3>
		</div>
		<div class="card-body">
		  <ul class="list-group">
			<li class="list-group-item">ID:${manager.id}</li>
			<li class="list-group-item">
			  Email: <a href="mailto:${manager.email}">${manager.email}</a>
			</li>
			<li class="list-group-item">Office number:${manager.officeNumber}</li>
		  </ul>
		</div>
	  </div>`;
  };
  const engineerTemplate = (engineer) => {
    return `<div class="card employee-card">
	<div class="card-header">
	  <h2 class="card-title">${engineer.name}</h2>
	  <h3 class="card-title">
		<i class="fas fa-glasses mr-2"></i>Engineer
	  </h3>
	</div>
	<div class="card-body">
	  <ul class="list-group">
		<li class="list-group-item">ID: ${engineer.id}</li>
		<li class="list-group-item">
		  Email: <a href="mailto:${engineer.email}">${engineer.email}</a>
		</li>
		<li class="list-group-item">
		  GitHub:
		  <a
			href="https://github.com/${engineer.github}"
			target="_blank"
			rel="noopener noreferrer"
			>${engineer.github}</a
		  >
		</li>
	  </ul>
	</div>
  </div>`;
  };
  const internTemplate = (intern) => {
    return `<div class="card employee-card">
	<div class="card-header">
	  <h2 class="card-title">${intern.name}</h2>
	  <h3 class="card-title">
		<i class="fas fa-user-graduate mr-2"></i>Intern
	  </h3>
	</div>
	<div class="card-body">
	  <ul class="list-group">
		<li class="list-group-item">ID: ${intern.id}</li>
		<li class="list-group-item">
		  Email:
		  <a href="mailto:${intern.email}">${intern.email}</a>
		</li>
		<li class="list-group-item">School: ${intern.school}</li>
	  </ul>
	</div>
  </div>`;
  };
  let data = ``;
  for (i = 0; i < teamMembersArray.length; i++) {
    if (teamMembersArray[i].getRole() === "Manager") {
      data += managerTemplate(teamMembersArray[i]);
    } else if (teamMembersArray[i].getRole() === "Engineer") {
      data += engineerTemplate(teamMembersArray[i]);
    } else if (teamMembersArray[i].getRole() === "Intern") {
      data += internTemplate(teamMembersArray[i]);
    }
  }

  const html = `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Team Profile Generator</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>
<body>
<div class="container-fluid">
<div class="row">
  <div class="col-12 jumbotron mb-3 team-heading">
	<h1 class="text-center">Team Profile Generator</h1>
  </div>
</div>
</div>
<div class="container">
    ${data}
</body>
</html>
	`;

  fs.writeFile("./dist/team_page.html", html, (err) => {
    if (err) console.log(err);
    else {
      console.log("Team Page Generated");
    }
  });
}

cliStart();
