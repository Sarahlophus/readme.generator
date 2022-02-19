const fs = require("fs");
const inquirer = require("inquirer");

// prompt user for questions, sent as array of objects
inquirer
  .prompt([
    {
      name: "projTitle",
      type: "input",
      message: "Enter your project title",
    },
    {
      name: "license",
      type: "list",
      message: "What license type do you have?",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
      name: "projDesc",
      type: "input",
      message: "Enter a 2-3 sentence summary about this project.",
    },
    {
      name: "feature1",
      type: "input",
      message: "in 1 sentence, describe the coolest feature of this project",
    },
    {
      name: "feature2",
      type: "input",
      message: "in 1 sentence, describe the second-coolest feature of this project",
    },
    {
      name: "feature3",
      type: "input",
      message: "in 1 sentence, describe the third-coolest feature of this project",
    },
    {
      name: "installOpt",
      type: "confirm",
      message: "Does your project require special installation instructions?",
    },
    {
      name: "installHowTo",
      type: "input",
      message: "Enter instructions for installing your project",
      when: (answers) => answers.installOpt === true,
    },
    {
      name: "projUse",
      type: "input",
      message: "Enter 2 - 3 sentences describing how to use your project",
    },
    {
      name: "image",
      type: "input",
      message: "To include an image or gif in your ReadMe, enter your its relative filepath",
    },
    {
      name: "imageAlt",
      type: "input",
      message: "In 1 sentence, describe your image (for use as alt text)",
    },
    {
      name: "contributeOpt",
      type: "confirm",
      message: "Does your project have contribution guidelines?",
    },
    {
      name: "contribution",
      type: "input",
      message: "Enter guidelines for contributing to this project",
      when: (answers) => answers.contributeOpt === true,
    },
    {
      name: "liveLink",
      type: "input",
      message: "Enter the link to your live page. If none exists, write 'none' or 'N/A'",
    },
    {
      name: "liveLink",
      type: "input",
      message: "Enter the link to your live page. If none exists, write 'none' or 'N/A'",
    },
  ])
  // promise
  .then((answers) => {
    // conditional for installation instructions
    if (answers.installOpt) {
      console.log("you included install instructions");
    } else {
      answers.installHowTo = "No installation needed";
    }
    // conditional for license type and tag
    let licenseText = "";
    if (answers.license !== "None") {
      licenseText = `![License Type ${answers.license}](https://img.shields.io/badge/License-${answers.license}-9cf.svg)

Licensed under [${answers.license}](LICENSE)`;
    }
    // conditional for contribution instructions
    if (answers.contributeOpt) {
      console.log("you included contribution instructions");
    } else {
      answers.contribution = "No contributions";
    }
    // write newREADME file with user's answers
    const theReadme = generateReadme(answers, licenseText);
    fs.writeFile("newREADME.md", theReadme, (err) => (err ? console.error(err) : console.log("success!")));
  });

// generate newREADME)
const generateReadme = ({ projTitle, projDesc, feature1, feature2, feature3, installHowTo, projUse, contribution, image, imageAlt, liveLink }, licenseText) => {
  return `# ${projTitle}

${licenseText}

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation-steps)
- [Usage](#usage-instructions)
- [Contribution](#contribution)
- [Links](#links)
- [Contact](#contact)

## Project Description

${projDesc}

- Includes: ${feature1}
- Includes: ${feature2}
- Includes: ${feature3}
    
## Installation Steps

${installHowTo}
    
## Usage Instructions

${projUse}
    
![${imageAlt}](${image})
    
## Contribution
${contribution}

## Links

- Live page: ${liveLink}
- Repository: 

## Contact

If you have questions about this project, contact me at the information below:

- Email Address:
- Github Profile: 
`;
};
