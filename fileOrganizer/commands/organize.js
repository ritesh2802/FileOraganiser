const fs = require("fs");
const path = require("path");


    let types = {
        media: ["mp4", "mkv", "mp3"],
        archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
        documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
        app: ['exe', 'dmg', 'pkg', "deb"],
        images: ['png','jpg','jpeg']
    }


    function organize(srcPath){


            // 1. to check  srcPath is present
        if(srcPath==undefined){
            // The process.cwd() method returns the current working directory of the Node.js process
            srcPath= process.cwd();
            
        }
        // console.log("srcP" +srcPath);
    
        //  2. to create a diectory -> orgnizedFiles
        //   srcPath (folder given,{downloads in this case}) ke andar organizedFiles naam ka folder banana hai

        let organizedFiles= path.join(srcPath,"organizedFiles"); 
        // let organizedFiles = srcPath+"/"+"organizedFiles"

        // console.log("organzedP"+organizedFiles);
        // organzedPC:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\organizedFiles
        // windos me \ aata h path me nd isko / me krna padta h as js isko termination jaida kuch samjhata h 
    
// fs.existsSync() => Returns true if the path exists, false otherwise.
        if(!fs.existsSync(organizedFiles)){
            fs.mkdirSync(organizedFiles);
        }
        // agar organizedFiles naam ka folder exist ni krta to ek bana do warna rene do
        else{
            console.log("folder already exist");
        }
    

    // 3.-> to read the contents of srcPath(downloads foldr in this case)
    

    let allFiles = fs.readdirSync(srcPath);  
    // fs.readdirSync Reads the contents of the directory => basically reads the names of files present in directory

    // console.log(allFiles);



    

    // 4.traverse allFiles and classify them on the bais of their extension
    for(let i=0;i<allFiles.length;i++){

        // extension pata krne ke liye{
        // let ext = allFile[i].split(".")[1];

        //path.extname=> Return the extension of the path,
        // let ext = path.extname(allFiles[i]);
        // console.log(ext);}


    //  pehle ye deh le ki kya wo content file hai ya folder..
        let fullPathOfFile = path.join(srcPath,allFiles[i]);
        

// console.log("fullPathOfFile is " + fullPathOfFile);

// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\abc.zip
// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\app.exe
// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\organizedFiles
// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\pep.tvd
// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\pic.png
// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\songs.mp3
// fullPathOfFile is C:\Users\Surendra Singh\Desktop\FJP5\Node\fileOrganizer\downloads\videos.mp4



        // 1. check if it is a file or folder
        let isFile= fs.lstatSync(fullPathOfFile).isFile();   // return true if file; folder ho to false
          //lstatsync gives the information regarding the link provided 
        
        if(isFile){
            // 1.1 get extension name
            let ext = path.extname(allFiles[i]).split(".")[1];   //path.extname(allFiles[i])=> .zip
           
            //extname returns the extension of the file
            // extname Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string

            // 1.2get folder name from ext
            let folderName = getFolderName(ext);

            // 1.3 copy from src folder and paste in dest folder
            copyFileToDest(srcPath,fullPathOfFile,folderName);

        }

    }

    }

    function getFolderName(ext){
        for(let key in types){
            for(let i=0;i<types[key].length;i++){
                if(ext==types[key][i]){
                    return key;
                }
            }
        }
        return "miscellaneous"
    }


    function copyFileToDest(srcPath,fullPathOfFile,folderName){
        // 1.dest folder ka path bnana h
        let destFolderPath = path.join(srcPath,"organizedFiles",folderName);  
        //....../downloads/organized_files/archives


        // 2. check if destFolderPath folder exists, if not make folder
        if(!fs.existsSync(destFolderPath)){
            fs.mkdirSync(destFolderPath);
        }
        
        // 3. copy file from src folder to dest folder
        
        // fs.copyFileSync aise kaam krta h ki usko poora path file tk ka dena padta h
        let fileName=path.basename(fullPathOfFile);  // abc.zip

        let destFileName=path.join(destFolderPath,fileName);

        fs.copyFileSync(fullPathOfFile,destFileName);
    }

module.exports={
    organize:organize
}

// organize("C:/Users/Surendra Singh/Desktop/FJP5/Node/fileOrganizer/downloads");