const fs=require("fs");

const scriptFunc=async ()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile("../../Sync_R-W/sample3.txt",(err,data)=>{
            if(err)
                reject("Reading sample3 failed");
            else
            {
                fs.writeFile("./new_file_created",data,(err)=>{
                    if(err)
                        throw new Error("Error in creating new_file");
                    else
                        resolve("File created");
                })
            }    
        });
    });
    
}
const runTimer=new Promise((res,rej)=>{
        setTimeout(()=>{
            rej("Timer expired");
        },1000);
    });   

//fs.readFile("./../Sync R-W/sample3.txt",(err,data)=>{console.log(data)});
//fs.writeFile("./newfile.txt","So this is the text",(err)=>{console.log("Done")});

//const timer=runTimer().catch(err=>console.log(err));  //Testing timer promise


/*const promise1=scriptFunc();                          //Testing file Op promise
promise1.then((resolveText)=>{
    console.log(resolveText);
}).catch(err=>console.error(err));*/

Promise.race([runTimer,scriptFunc()]).then(res=>console.log(res)).catch(err=>console.log(err)); //Timer not going through


console.log("Line to be executed first");
