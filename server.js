const mongoose=require('mongoose');
//const dotenv=require('dotenv');
//dotenv.config({ path: './config.env'})
const app= require('./app');
//console.log(process.env);
const PORT=3500;
mongoose.connect('mongodb://localhost:27017/TeamProject').then(()=>{
    app.listen(PORT,console.log(`listening to PORT ${PORT}`))
});
