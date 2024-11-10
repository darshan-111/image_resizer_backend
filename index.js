const express = require('express')
const {exec} = require('child_process')
const path = require('path')
const cors = require('cors')
const port = 5000;
const app = express();
const multer = require('multer');
const { error } = require('console');
const { stdout, stderr } = require('process');

app.use(cors())
app.listen(port , ()=>{
    console.log("server running on port ${port}");
})    
 
let img_path ;
function pathbuilt(){
    img_path = Date.now();
    return img_path;
}  
const storage = multer.diskStorage({
    destination : function (req , file, cb){
        return cb(null , "./input_resizer_input");
    },
    filename: function (req ,file,cb){
        return cb(null ,`${pathbuilt()}-${file.originalname.split(" ").join("")}`)
    },
}) 
  
const upload = multer({ storage })
app.post('/profile', upload.single('image'),function (req, res) {
    
    const filename_trimed = req.file.originalname.split(" ").join("");
    console.log(`py img.py input_resizer_input/${img_path}-${filename_trimed} output_directory_path/${img_path}-${req.file.originalname} ${req.body.w} ${req.body.h} ${req.body.q}`);
    exec(`py img.py input_resizer_input/${img_path}-${filename_trimed} output_directory_path/${img_path}-${filename_trimed} ${req.body.w} ${req.body.h} ${req.body.q}` , (error , stdout, stderr)=>{
        if(error){
            console.log(`error : ${error.message}`)
            res.sendStatus(501)
            return
        }
        if(stderr){
            console.log(`stderr: ${stderr}`);
            res.sendStatus(500)
            return;
        }
        else{
            console.log(`stdout: ${stdout}`);
            // console.log({"p" : path.join(__dirname , `/output_directory_path/${img_path}-${filename_trimed}`)});
            // const pathobj = {"p": path.join(__dirname , `/output_directory_path/${img_path}-${filename_trimed}`)}
            // res.send({"p" : path.join(__dirname , `/output_directory_path/${img_path}-${req.file.originalname}`)})
            // res.json(pathobj)
            res.sendFile(path.join(__dirname , `/output_directory_path/${img_path}-${filename_trimed}`))
            // var xyz = setInterval(()=>{
            // },1800)
            return;
        }
    })   
    // req.body will hold the text fields, if there were any
})

  
 
app.get("/" , (req , res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})