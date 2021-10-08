const readline = require("readline");
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fs = require('fs');


var fnm = "";
var cont = "";
var fonm = "";

//create new directory
var createDirWizard = () => 
{
    rl.question("Enter folder name:- ", (ans) => 
    {
        fonm=ans;
        try
        {
            if(!fs.existsSync(fonm))
            {
                fs.mkdirSync(fonm);
                console.log("Folder is successfully created...");
                repeat();
            }
        }catch(err){
            console.log(err);
        }
    });
}

//remove directory
var removeDirWizard = () => 
{
    if(fonm === "")
    {
        console.log("Directory not found! Please create it first...");
    }
    else
    {
        fs.rmdir(fonm,function(err)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("Folder deleted successfully...");
            }
        });
    }
    repeat();
}

//write file
var writeFileWizard = () => 
{
    rl.question("Enter file name:-",(ans) => 
    {
        fnm=ans + ".txt";
        rl.question("Enter Data:-",(ans) => 
        {
            cont=ans; 

            fs.writeFile(fnm,cont,(err) => 
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("file created successfully");
                }
                repeat();
            });
        }); 
    });
}

//read file
var readFileWizard = () =>
{
    if(fnm === "")
    {
        console.log("File not found...");
    }
    else
    {
        fs.readFile(fnm,"utf8",function(err,data){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
                repeat();
            }
        });     
    }
}

//delete file
var deleteFileWizard = () =>
{
    if(fnm === "")
    {   
        console.log("File not found...");
    }
    else
    {
        fs.unlink(fnm,function(err){
            if(err) 
            {
                console.log(err);
            }
            else
            {
                console.log('File deleted...');
                fnm="";
                repeat();
            }
        });
    }
}

//append new data to file
var appendToFileWizard = () =>
{
    if(fnm === "")
    {
        console.log("File not found...");
        repeat();
    }
    else
    {
        rl.question("Enter New Data:-",(data) => 
        {
            fs.appendFile(fnm, data,function(err)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("Content Updated...");
                    repeat();
                }
            }); 
        });
    }
}

//replace file's content with new data
var replaceDataWizard = () => 
{
    if(fnm === "")
    {
        console.log("File not found...");
    }
    else
    {
        rl.question("Enter new data:- ",(ans) => 
        {
            fs.writeFile(fnm,ans,(err) =>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("File content successfully replaced...");
                    repeat();
                }
            });
        });
    }
}

//rename file
var renameFileWizard = () =>
{
    if(fnm === "")
    {
        console.log("File not found...");
        repeat();
    }
    else
    {
        rl.question("Enter new file name:-",(ans) => 
        {
            var nfile=ans + ".txt";
            fs.rename(fnm, nfile, function (err) 
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log('File Renamed...');
                    fnm=nfile;
                    repeat();
                } 
            });
        });
    }
}


var menu = () => 
{
    console.log("\n------File Wizard------");
    console.log("1. Create Directory");
    console.log("2. Remove Directory");
    console.log("3. Write File");
    console.log("4. Read File");
    console.log("5. Delete File");
    console.log("6. Append data to file");
    console.log("7. Update/Replace file with new data");
    console.log("8. Rename File");
    console.log("9. Exit");
}


var start = () =>
{
    rl.question("Enter your choice:-", (ans) => 
    {
        if(ans === "1")
        {
            createDirWizard();
        }
        else if(ans === "2")
        {
            removeDirWizard();
        }
        else if(ans === "3")
        {
            writeFileWizard();
        }
        else if(ans === "4")
        {
            readFileWizard();
        }
        else if(ans === "5")
        {
            deleteFileWizard(); 
        }
        else if(ans === "6")
        {
            appendToFileWizard();
        }
        else if(ans === "7")
        {
            replaceDataWizard();
        }
        else if(ans === "8")
        {
            renameFileWizard();
        }
        else if(ans === "9")
        {
            rl.close();
        }
        else
        {
            console.log("Please select proper option from menu...");
            start();
        }
    });    
}

var repeat = () => {
    menu();
    start();
}
repeat();
