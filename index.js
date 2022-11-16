const express = require('express');
const fs = require('fs');
const bP = require('body-parser');
const  dir = __dirname;
const dirPub = dir+'/public/html/';
const dirScript = dir + '/public/'

const config = require('./config.json')

let port = config.port

let app = express();

app.use(bP.urlencoded({extended:false}))
app.use(bP.json())
app.use((req,res,next)=>{
    let now = new Date();
    console.log(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`+' '+(req.method)+' '+(req.url))
    next()
})

app.route('/')
    .get((req,res)=>{
        res.status(200);
        res.sendFile(dirPub + 'index.html')
        res.end
    })

app.route('/mobile/list')
    .get((req,res)=>{
        let list = fs.readFileSync('./raid.json',{encoding:"utf-8"})
        console.log(list);
        res.status(200)
        res.send(list)
        res.end
    })

app.route('/mobile/check')
    .get((req,res)=>{
        res.status(200)
        res.sendFile(dirPub + "test.html")
        res.end
    })


app.route('/mobile/add')
    .get((req,res)=>{
        res.status(200)
        res.sendFile(dirPub + "add.html")
        res.end
    })
    .post((req, res)=>{
        let list = fs.readFileSync('./raid.json',{encoding:"utf-8"})
        list = JSON.parse(list)
        list.push({name:req.body.name, keys:req.body.keys})
        fs.writeFileSync('./raid.json', JSON.stringify(list), {encoding:"utf-8"})
        res.status(200)
        res.send('ok')
        res.end
    })

app.route('/js/*')
    .get((req,res)=>{
        res.status(200)
        res.sendFile(dirScript+req.url)
        res.end
    })

app.listen(port, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log(`server start on ${port}`);
})
