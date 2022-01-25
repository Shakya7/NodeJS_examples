const fs=require("fs");
const http=require("http");

let x=10;
for(let i=0;i<=1000000000;i++){               //Causing delay to prove inefficiency of synchronous code
    x=x+i;
}
const fileRead1=fs.readFileSync("./sample3.txt","utf-8");
console.log(fileRead1);
console.log(x);

//const word="ipsius";
//if(fileRead1.match(word)) console.log("Found");
//else console.log("Failed");

//console.log(fileRead1.match(word).groups);

console.log("Hello");

const fileOutput1=`This is writing/ rather creating a file. Contents are from sample3.txt... FUCK\n${fileRead1}`;
fs.writeFileSync("./new-sample3.txt",fileOutput1);

const tempFileContent="To be deleted";
fs.writeFileSync("./temp.txt",tempFileContent);
//fs.unlinkSync("./sample-new.txt");
//fs.renameSync("./sample-mod.txt","sample-new.txt");
fs.mkdirSync("/home/shakya/Node-practices/I-O polling [File Read Write]/Sync R-W/New/df",{recursive: true});
fs.rmdirSync("/home/shakya/Node-practices/I-O polling [File Read Write]/Sync R-W/New/df", {recursive:true});
