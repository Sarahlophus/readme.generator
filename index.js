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
      message: "in 1 sentence, describe your image (for use as alt text)",
    },
  ])
  .then((answers) => {
    // if (answers.installOpt === false) {
    //   answers.installHowTo.message = "No installation required";
    // }
    const theReadme = generateReadme(answers);
    fs.writeFile("myREADME.md", theReadme, (err) => (err ? console.error(err) : console.log("success!")));
  });

const generateReadme = ({ projTitle, projDesc, feature1, feature2, feature3, installHowTo, projUse, image, imageAlt }) => {
  return `# ${projTitle}

## Project Description

${projDesc}

- Includes: ${feature1}
- Includes: ${feature2}
- Includes: ${feature3}
    
## Table of Contents

- Installation
- Usage
- Credits
- License
    
## Installation Steps

${installHowTo}
    
## Usage Instructions

${projUse}
    
![${imageAlt}](${image})
    
## Credits

- collaborators
- tutorials
- 3rd party assets

## Links

- Live page: 
- Github repo: 
    
## License

Licensed under the [MIT License](LICENSE)`;
};
