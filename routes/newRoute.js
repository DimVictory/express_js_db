import { Router } from "express";
import pool from "../db_connect/database.js";
const newRouter = Router();


//Get All News
newRouter.get('/GetAll', (req,res)=>{
    pool.query(`SELECT * FROM tbl_news`, (error,rows)=>{
        if(error) console.log("Someting went wrong");
        res.send(rows)
    })
})

//Get News By ID
newRouter.get('/GetNewsbyID/:id',(req,res)=>{
    const { params: {id} } = req;
    pool.query(`SELECT * FROM tbl_news WHERE id = ?`, id ,(error,row)=>{
        if(error) console.log("Something went wrong");
        res.send(row)
    })
})


//Create New News

newRouter.post('/CreateNewNews',(req,res)=>{
    const { title,description,category } = req.body;
    pool.query(`INSERT INTO tbl_news (title,description,category) VALUES (?,?,?)`,[title,description,category],(error,result)=>{
        if(error) console.log("Cannot Create User");
        res.json({
            message : result
        })
    })
})



//Edit News

newRouter.put('/EditNews/:id',(req,res)=>{
    const { title,description,category } = req.body;
    const { id } = req.params;
    pool.query(`UPDATE tbl_news SET title = ? ,description = ? ,category = ? WHERE id = ?`,[title,description,category,id],(error,result)=>{
        if(error) console.log("Something went wrong");
        res.json({
            message : result
        })
    })
})



//Remove News

newRouter.delete('/RemoveNews/:id',(req,res)=>{
    const { id } = req.params
    pool.query(`DELETE FROM tbl_news WHERE id = ? `,id,(error,result)=>{
        if(error) console.log("Something went wrong");
        res.json({
            message : result
        })
    })
})



//Sort New by ID

newRouter.get('/SortNewByID', (req, res) => {
    const { order } = req.query;
    if (order === 'asc' || order === 'desc') {
        pool.query(`SELECT * FROM tbl_news ORDER BY id ${order}`, (error, rows) => {
            if (error) {
                res.json({ error: 'Something Went Wrong' });
            } else {
                res.json(rows);
            }
        });
    } else {
        res.json({
           msg : "Error"
       })
    }
});

export default newRouter;