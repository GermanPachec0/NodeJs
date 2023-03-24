const User = require('../models').User;

const Task  = require('../models').Task;

module.exports = {
    index: (req,res) => {
        Task.findAll().then(tasks => {
            res.render('tasks/index',{tasks: req.user.tasks});
        })
    },

    update : (req,res) => {
        Task.update({ description: req.body.description},{
            where : {
                id: req.params.id
            }
        }).then((data) =>{
            res.redirect('/tasks/'+req.params.id)
        })
    },

    show: (req,res) =>{
        Task.findByPk(req.params.id,{include:[
          {  
            model: User,
            as: 'user'
            },
            'categories'
        ]}).then(task =>{
            res.render('tasks/show',{task})
        })
    },
    create: (req,res) => {
        Task.create({
                description: req.body.description,
                userId: req.session.userId
        }).then(result => {
             res.json(result);
        }).catch(err => {console.log(err);
            res.json(err);
        });
    },

    new: (req,res) =>{
        res.render('tasks/new');
    },

    edit: (req,res) => {
        Task.findByPk(req.params.id).then(task =>{
            res.render('tasks/edit',{task})

        })
    },

    destroy : (req,res) => {
        Task.destroy({
            where: {
                id:req.params.id 
            }
        }).then((data) => {
            res.redirect('/tasks')
        });
    }




};