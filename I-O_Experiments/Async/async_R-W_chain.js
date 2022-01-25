const fs=require("fs");
const EventEmittor=require("events");
const event=new EventEmittor();

event.on("startNow",({val1,val2})=>{
    createFinalFile(val1,val2);
})
const createFinalFile=(val1,val2)=>{
    fs.readFile("./sample3.txt","utf-8",(err1,data1)=>{
    if(err1===null){
        fs.writeFile("./newFileCreated1.txt","Created a manual file on resolved reading of sample3.txt","utf-8",(err2)=>{
            fs.readFile("./newFileCreated1.txt","utf-8",(err3,data3)=>{
                if(err3===null){
                    fs.appendFile("./newFileCreated2.txt","Created another file on resolved reading of newFileCreated2.txt","utf-8",(err4)=>{
                        fs.readFile("./newFileCreated2.txt","utf-8",(err5,data5)=>{
                            if(err5===null){
                                fs.writeFile("./final-file.txt",`${data1}\n\n${data3}\n\n${data5}\n\nFinal Ending line${val1}${val2}`,"utf-8",(err6)=>{
                                    fs.readFile("./final-file.txt","utf-8",(err7,data7)=>{
                                        console.log(data7);
                                    })
                                })
                            }else
                                console.log(err5.stack)
                        })
                    })
                }else
                    console.log(err3.stack);
            })
        })
    }else    
        console.error(err1.stack);
    })}

console.log("Starting");
setTimeout(()=>{
    event.emit("startNow",{
        val1:10,
        val2:20
    })
},5000);
