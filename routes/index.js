var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
//const fileUpload = require('express-fileupload');
var init_model=require('../models/init')
var grocery_model=require('../models/query')
const helpers = require('../public/javaScripts/helpers');



// GET Homepage
router.get('/', async(req, res) => {
  let result=await init_model.init_DB()
  let groceries = await grocery_model.get_all_grocery()
  let price = await grocery_model.get_grocery_count()
  if(groceries) {
    res.render('index', {
      title: "Grocery List",
      groceries: groceries,
      price: price
    })
  } else {
    res.render('404')
  }
});

// GET Posts
router.get('/groceries', async (req, res) => {
  res.redirect('/')
})


router.get('/delete/:id',async(req,res)=>{
  let id=req.params.id
  let result= await grocery_model.delete_grocery_by_id(id)
  if(result){
    res.redirect('/')
  }else{
    res.send({msg:"Something went wrong."})
  }
})

// GET Post Submission Form
router.get('/add', (req, res) => {
  res.render('add', {title: "Add Grocery", msg: ""})
});

// POST New Post
router.post('/add', async (req, res) => {
  let name=req.body.name
  let imgUrl=req.body.imgUrl
  let quantity=req.body.quantity
  let cost=req.body.cost

  let added=await grocery_model.add_grocery(name,imgUrl,quantity,cost);

  if(added){
    res.redirect('/groceries')
  }else{
    res.render('add', {title: "Submit Post", msg: "ERROR: Please refill form."})
  }
});
//store on disk
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../public/images');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

router.post('/upload-grocery-pic',(req, res) => {
    // 'grocery-pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('grocery_pic');
    upload(req , res , function(err){

      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
      console.log(req.file);
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      }
      else if (!req.file) {
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        return res.send(err);
      }
      else if (err) {
        return res.send(err);
      }
      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});
// router.post('/upload', function(req, res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   };
//
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
//
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('/images/', function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!');
//   });
// });

module.exports = router;
