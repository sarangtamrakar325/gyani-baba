const express = require('express');
const {dbConnect} = require('./src/controller/dbcontroller');
const bodyParser = require('body-parser');

const app = express();
const dotenv = require('dotenv');
     dotenv.config();
     
const port = process.env.PORT || 3002; // Choose a port number for your server

// Middleware to parse JSON request body
app.use(bodyParser.json());

let menu = [
  { link: '/', name: "Home"  },
  { link: '/category', name: "Category"  },
  { link: '/products', name: "Product"  }
];

let categoryRouter = require('./src/controller/CategoryRouter')(menu);
//let productRouter = require('./src/controller/ProductRouter'); // this is when not pass menu that time.
let productRouter = require('./src/controller/ProductRouter')(menu);
let ChatAPIRouter = require('./src/controller/ChatAPIRouter')(menu);

// static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine
app.set('view engine','ejs')


// Define routes
app.get('/', (req, res) => {
  // res.send('Hello, Express!');
      const data = {
        title: 'Home Page',
        message: 'Hello from EJS! message',
        isAdmin: false,
        menu
    };
  res.render('index', data)
  
});

app.use('/category', categoryRouter)
app.use('/products', productRouter)
app.use('/chat-api', ChatAPIRouter)

// Start the server
app.listen(port, (err) => {
  dbConnect()
  if(err) throw err;
  console.log(`Server is running on http://localhost:${port}`);
});
