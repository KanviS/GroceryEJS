db=require('./base').db

// Add post
exports.add_grocery=async(name,imgUrl,cost)=> {
    let stmn = db.prepare('INSERT INTO tbl_grocery(name,imgUrl,quantity,cost,created_on) VALUES(?,?,?,?,?)')
    let msg
    try {
        msg = await stmn.run(name,imgUrl,quantity, cost, Date.now())
    } catch (e) {
        console.log(e.message)
        return null
    }
    return msg
}

// Delete post by id
exports.delete_grocery_by_id=async(id)=>{
    let stmnt=db.prepare('DELETE FROM tbl_grocery WHERE id=?')
    let result
    try{
        result=await stmnt.run(id)
    }catch(e){
        console.error(e.message)
        return null
    }
    return result
}

//update quantity
exports.update_quantity = async() =>{
    let stmnt = db.prepare('UPDATE tbl_grocery SET quantity = ? WHERE id = ?')
    let result
    try{
        result = await stmnt.run(quantity,id)
    }catch (e) {
        console.log(e.message)
        return null
    }
    return result
}

// Get all posts
    exports.get_all_grocery=async()=> {
        let stmnt = db.prepare(`SELECT * FROM tbl_grocery`)
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
    let stmnt = db.prepare('SELECT printf("%.2f",ifnull(SUM(cost),0)) as totalCost FROM tbl_grocery')
    let result
    try {
        result = await stmnt.get()
    } catch (e) {
        console.error(e.message)
        return null
    }
    return result
}
