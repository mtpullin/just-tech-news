const router = require('express').Router();
const {User}= require('../../models');

//GET /api/users
router.get( '/', (req,res) =>{
    //access user model and run findall method
    User.findAll({
       // attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//get /api/users/1
router.get('/:id', (req,res)=>{
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'No user found'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

//post /api/users
router.post('/', (req,res) => {
    //expects username email and pass
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

//put /api/user/1
router.put('/:id', (req,res) => {
    //if req.bpdy has exact value use user.body
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]){
            res.status(404).json({ message: 'no user found'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json(err)
    })
});

//delete /api/user/1
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'no user found'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports =router;