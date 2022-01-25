const fs=require("fs");

console.log("Hello");
const textIn = fs.readFileSync("./sample3.txt","utf-8");
//console.log(textIn);


const newInput=textIn+"\nThis is a new phase";     //Updating content of sample3.txt
fs.writeFileSync("./sample-mod.txt",newInput);     //Creating a new fileA with updated content

const textInSampleMod1=fs.readFileSync("./sample-mod.txt","utf-8");
console.log("------------------------");
//console.log(textInSampleMod1);

fs.writeFileSync("./sample-new.txt",`${textIn}\nThis is the new file created and outputted`);     //Again modifying the contents and creating a new fileB
console.log("Written");
const newFileText=fs.readFileSync("./sample-new.txt",'utf-8');                     //Finally Reading the final contents from the last fileB
console.log(newFileText);
