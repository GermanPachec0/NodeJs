const Categories  = require('../models').Categories;
module.exports = {
    index: (req,res) => {
        Categories.findAll().then(category => {
            res.status(200).json({categories:category});
        })
    },

    update : (req,res) => {
        Categories.update({ title: req.body.title, color:req.body.color},{
            where : {
                id: req.params.id
            }
        }).then(() => {return Categories.findByPk(req.params.id)})
        .then((category)=> res.status(200).json(category))
    },

    create: (req,res) => {
        Categories.create({
                title: req.body.title,
                color: req.body.color
        }).then(result => {
             res.status(201).json({result});
        }).catch(err => {console.log(err);
            res.json(err);
        });
    },

    destroy : (req,res) => {
        Categories.destroy({
            where: {
                id:req.params.id 
            }
        }).then((data) => {
            res.status(200).json(data)
        });
    }
}