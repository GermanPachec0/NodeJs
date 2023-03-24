const mysql  = require('mysql')
const methodOverride = require('method-override');
const Sequelize = require('sequelize')
const express = require('express')
const session = require('express-session');
const socketio = require('socket.io');
//bodyParseer and express
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','pug');
app.use(methodOverride('_method'));



//my routes from server
const tasksRoutes = require('./routes/tasks_routes');
const registrationRoutes = require('./routes/registrations_routes');
const sessionsRoutes=require('./routes/sessions_routes');
const findUserMiddleWare = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');
const categoriesRoutes = require('./routes/categories_routes');

app.use(session({
    secret:['123iasdasdasdasdad','123adasdasdjasdjasjdi'],
    saveUninitialized: false,
    resave:false 
}));

app.use(authUser);
app.use(findUserMiddleWare);
app.use(tasksRoutes);
app.use(registrationRoutes)
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/',(req,res)=>{
    res.render('home',{user:req.user})
    
})

let server = app.listen(3000)

let io = socketio(server);
let userCount = 0;
io.on('connection',function(socket){
    userCount ++;
    io.emit('count_updated',{count:usersCount});
    

    socket.on('disconnect',function(){
        usersCount --;
        io.emit('count_updated',{count:usersCount});
    })

    socket.on('new_task',function(data){
        console.log(data);
        io.emit('new_tas',data);
    })
});

const client = require('./realtime/client');