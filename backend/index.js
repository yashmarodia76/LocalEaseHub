const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

//
require('dotenv').config();

const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');

// app.use(express.static('images'))

// server.use(cors(
//   {
//       origin: ["https://LocalEaseHub.vercel.app"],
//       methods: ["POST", "GET"],
//       credentials: true
//   }
// ));

//middlewares

server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json()); // to parse req.body

server.use(express.static(path.join(__dirname, '../frontend/build')));
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/users', usersRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', cartRouter.router)
server.use('/orders', ordersRouter.router)

server.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
});

main().catch(err=> console.log(err));

async function main() {
    try {
      const mongodbUri = process.env.MONGODB_URI;
  
      if (!mongodbUri) {
        throw new Error('MONGODB_URI is not defined in the environment variables.');
      }
  
      await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connected');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }
  
// main();

// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
//     console.log('database connected')
// }

server.get('/',(req, res)=>{
    res.json({status:'success'})
})



server.listen(8080, ()=>{
    console.log('server started')
})
