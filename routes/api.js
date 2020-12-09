var express = require('express');
var router = express.Router();
var init_model=require('../models/init')
var grocery_model=require('../models/query')
router.get('/', function(req, res, next) {
    res.send({
        msg:"respond with a API resource"
    })
});

router.get('/init',async(req,res)=>{
    let result=await init_model.init_DB()

    if(result){
        res.send({msg:"Database has been set up"})
    }else{
        res.send({msg:"Database encountered an error!"})
    }
})

router.post('/add',async(req,res)=>{
    let name=req.body.name
    let imgUrl=req.body.imgUrl
    let cost=req.body.cost
    let added=await grocery_model.add_grocery(name,imgUrl,cost);
    console.log(added);
    if(added){
        res.send({msg:"Grocery added to database"})
    }else{
        res.send({msg:"Something went wrong"})
    }
})

router.get('/delete/:id',async(req,res)=>{
    let id=req.params.id
    let result= await grocery_model.delete_grocery_by_id(id)
    if(result){
        res.send(result)
    }else{
        res.send({msg:"Something went wrong."})
    }
})

router.get('/groceries',async(req,res)=>{
    let results= await grocery_model.get_all_grocery()
    if(results){
        res.send(results)
    }else{
        res.send({msg:"Something went wrong."})
    }
})

router.get('/total',async(req,res)=>{
    let results= await grocery_model.get_grocery_count()
    if(results){
        res.send(results)
    }else{
        res.send({msg:"Something went wrong."})
    }
})

module.exports = router;
