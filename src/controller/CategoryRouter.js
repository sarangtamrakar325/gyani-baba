const express = require('express');
const {getData} = require('./dbcontroller');

const app = express();
let categoryRouter = express.Router();


// const categories = [
//   {
//       "id":1,
//       "category": "Fashion",
//       "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
//   },
//   {
//       "id":2,
//       "category":"Electronics",
//       "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
//   },
//   {
//       "id":3,
//       "category":"Essentials",
//       "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
//   },
//   {
//       "id":4,
//       "category": "Footwear",
//       "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
//   }
// ]

function router(menu){

  // categoryRouter.route('/')
  //   .get((req, res)=>{
  //     // res.send('Category route');
    //  let  data = {
    //     title:'Category Page',
    //     categories:categories,
    //     menu
    //   };
  //     // render the category.ejs file and show there
  //     res.render('category', data);

  //   })


   categoryRouter.route('/')
      .get( async (req, res)=>{
        let query = {};
        let categories = await getData('category', query);
        let  data = {
                title:'Category Page',
                categories:categories,
                menu
              };
        res.render('category', data);
      })




categoryRouter.route('/details')
   .get((req, res)=>{
        res.send('Category details route');
        });


        return categoryRouter;

        

}


 module.exports = router     