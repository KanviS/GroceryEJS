db=require('./base').db

// Add post
exports.add_grocery=async(name,imgUrl,cost)=> {
    let stmn = db.prepare("Insert into tbl_grocery(name,imgUrl,cost,created_on) values(?,?,?,?)")
    let msg
    try {
        msg = await stmn.run(name,imgUrl, cost, Date.now())
    } catch (e) {
        console.log(e.message)
        return null
    }
    return msg
}

// Get post by id
exports.delete_grocery_by_id=async(id)=>{
    let stmnt=db.prepare('delete from tbl_grocery where id=?')
let result
    try{
        result=await stmnt.get(id)
    }catch(e){
        console.error(e.message)
        return null
    }
    return result
}

// Get all posts
    exports.get_all_grocery=async()=> {
        let stmnt = db.prepare('select * from grocery')
        let result
        try {
            result = await stmnt.all()
        } catch (e) {
            console.error(e.message)
            return null
        }
        return result
    }

// Get all count grocery
exports.get_grocery_count=async()=> {
    let stmnt = db.prepare('select sum(cost) from grocery')
    let result
    try {
        result = await stmnt.get()
    } catch (e) {
        console.error(e.message)
        return null
    }
    return result
}
