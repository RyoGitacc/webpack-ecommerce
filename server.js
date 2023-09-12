const express = require('express')
const data = require('./data.js');
const app = express();

app.set('view engine', 'ejs')
// app.set('views',path.join(__dirname,'views'));
app.use(express.static('./dist'))
app.use(express.json())


const CATEGORIES={
    label:"Category",
    values:["All categories","Tops", "Bottoms", "Outerwear","Innerwear", "Skirt", "Shues", ]
 }
 const TYPE={
     label:"Type",
     values:["Any type","New Arrival", "Featured", "Sale", "Limited Offer"]
 }


let loadCount=1;

app.get('/',(req,res)=>{
    res.render('home',{categories:CATEGORIES, type:TYPE})
})

app.get('/data',(req,res)=>{
    res.status(200).json(data);
})

// app.get('/loadMore',(req,res)=>{
  
//         const moreItems = data.slice((loadCount * 4), (loadCount * 4 + 4) );
//         currentFilteredItems.push(...moreItems);
//         loadCount++;
//         res.status(200).json(moreItems)
// });


// app.post('/gender',(req,res)=>{
//     console.log(req.body,"gender")
//     const filteredItems = data.filter(d=>d.gender === req.body.gender);
//     tempItems = filteredItems;
//     filteredItemsByCondition = filteredItems;
//     currentFilteredItems=filteredItems.slice(0,4);
//     loadCount=1;
//     res.status(200).json(currentFilteredItems);
// })

app.post('/filter',(req,res)=>{
    const {gender,category,type,min,max}=req.body;
    console.log(req.body)
    let filteredItems= data.filter(d=> d.price >= min && d.price <= max)   
    
    if(gender){
        filteredItems= filteredItems.filter(f=>f.gender === gender);
    }

    if(category){
     filteredItems= filteredItems.filter(f=>f.category === category);
    }

    if(type){
        filteredItems = filteredItems.filter(f=>f.type === type)
    }
    console.log(filteredItems)
    res.status(200).json(filteredItems)
})

app.post("/sort",(req,res)=>{
    const items = req.body.items;
    console.log(req.body.sortBy);
    switch(req.body.sortBy){
        case "price":
            items.sort((a,b)=>a.price - b.price); break;
        case "date":
            items.sort((a,b)=> new Date(b.date) - new Date(a.date)); break;
        case "highRating": 
            items.sort((a,b)=>{
                const aveRating1= 
                 a.reviews.length !== 0 ? a.reviews.reduce((acm,r)=>{ return acm + r.stars},0) / a.reviews.length : 0;
                const aveRating2= 
                 b.reviews.length !== 0 ? b.reviews.reduce((acm,r)=>{ return acm + r.stars},0) / b.reviews.length : 0;
              
                return aveRating2 - aveRating1;
            }); break;
            
        default:items.sort((a,b)=>a.id - b.id);break;
    }
   
    res.status(200).json(items)
})

app.post("/search",(req,res)=>{
    const keyword = req.body.keyword;
    const regx=new RegExp("[a-zA-Z]*" + keyword + "+",'i')
    const searchedItems=data.filter(d=>regx.test(d.name));
    res.status(200).json(searchedItems)
})

app.listen(process.env.PORT || 8080,()=>{
    console.log('server running')
})