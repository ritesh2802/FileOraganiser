// entry point of myCLI

const helpFunc = require("./commands/help.js");
const organizeFunc= require("./commands/organize.js")

let inputArr= process.argv.slice(2);

let command = inputArr[0];
let path = inputArr[1];
console.log(command);




// break lagane se switch if else-if jaisa kaam krne lgta h internally ye bs if hote h

switch(command){
    case "tree":
        // do sth
        break;
    case "organize":
        organizeFunc.organize(path);
        break;
    case "help":
        // call help function
        console.log(helpFunc.haathi());
        break; 
}