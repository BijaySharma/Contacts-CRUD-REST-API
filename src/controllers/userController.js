import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    if(req.user){
        next();
    }else{
        return res.status(401).json({message: "Uauthorized User!"});
    }
};

export const register = (req, res) => {
    let newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if(err){
            return res.status(400).res.send({
                message: err
            });
        }else{
            user.hashPassword = undefined;
            return res.json(user);
        }
    });
}

export const login = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) throw err;

        if(!user){
            res.status(401).json({message: 'Authentication failed. No user found'});
        }else if(user){
            if(!user.comparePassword(req.body.password, user.hashPassword)){
                res.status(401).json({message: 'Authentication failed. Wrong password'});
            }else{
                return res.json({
                    token: jwt.sign({_id: user._id, email: user.email, username: user.username}, 'RESTFULAPIs')
                });
            }
        }
    });
}