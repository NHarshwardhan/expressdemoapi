const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())

const conn = mysql.createConnection({
     host:'blzanf3hq3wss8xldrnk-mysql.services.clever-cloud.com',
     user:'ua7n0gojjwtdyvuw',
     password:'gZIPp3M9XcWKSIw85RMu',
     database:'blzanf3hq3wss8xldrnk'
})

conn.connect((err)=>{
    if(err) throw err
    console.log('connected to mysql db')
})

// define routes
app.get('/api/courses',(req,res)=>{
    let sql = "SELECT * FROM courses"
    conn.query(sql,(err,results)=>{
        if(err) throw err
        res.send(results)
    })
})

app.post('/api/courses',(req,res)=>{
     let data = {coursename:req.body.coursename,courseprice:req.body.courseprice}
     let sql  = "INSERT INTO courses SET ?"
     conn.query(sql,data,(err,results)=>{
         if(err) throw err
         res.send(results)
     })
})
// localhost:4000/api/courses/edit/3 + data(body)
app.put('/api/courses/edit/:id',(req,res)=>{
      
         let sql = `UPDATE courses SET coursename='${req.body.coursename}' ,courseprice=${req.body.courseprice} WHERE id=${parseInt(req.params.id)}`
         conn.query(sql,(err,results)=>{
            if(err) throw err
            res.send(results)
         })

})

app.delete('/api/courses/:id',(req,res)=>{
      let sql = `DELETE FROM courses WHERE id=${parseInt(req.params.id)}`
      conn.query(sql,(err,results)=>{
        if(err) throw err
        res.send(results)
     })
})


app.listen(4000,()=>console.log(`Listening on port no 4000`))
