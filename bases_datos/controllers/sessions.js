const user = require('../models/user');
const { destroy } = require('./tasks');

const User = require('../models').User;
module.exports = {
    new: (req,res) =>{
        res.render('sessions/new');
    },
    create: (req,res) =>{
        User.login(req.body.email,req.body.password).then((user) => {
            if(user){
                req.session.userId = user.id;
            }
            res.json(user);
           
        }).catch((err) => {
            console.log(err);
            res.json(err);
        });;
    },

    destroy: (req,res) =>{
        req.session.destroy(() => {
            res.redirect('/sessions');
        });
    }
}
