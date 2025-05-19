const { useCallback } = require("react");
const { create, getUsers, getUsersByUserId, UpdateUser, deleteUser  , getUsersByEmail } = require("./user.service");
const { genSaltSync , hashSync ,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { subscribe } = require("./user.router");

module.exports = {
    createUser: (req,res) => {
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        create(body , (err , result) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database processes connection error "
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        });
    },
    getUsersByUserId: (req,res) => {
        const id = req.params.id;
            getUsersByUserId(id ,(err,result) => {
                if (err){
                console.log(err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: result[0]
            })
        });
    },
    getUsers: (req,res) => {
        getUsers ((err, result) => {
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:result
            })
        });
    }, 
    UpdateUser: (req ,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        UpdateUser(body, (err,result) => {
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                message: "updated successfully"
            });
        });
    },
    deleteUser:(req,res) => {
        const data = req.body;
        deleteUser( data, (err,result) => {
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success:0,
                    message: "Record not found"
                })
            }
            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
    },
    login: (req , res) =>{
        const body = req.body;
        getUsersByEmail(body.email,(err,result) => {
            if (err){
                console.log(err);
            }
            if (!result){
                return res.json({
                    seccess:0,
                    data:"invalid email or passwoord"
                })
            }
            const results = compareSync(body.password, result.password);
            if (result){
                result.password = undefined;
                const jsonwebtoken = sign({results: result}, process.env.TEMP_PASSWORD , {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login done",
                    token:jsonwebtoken
                })
            }else{
                return res.json({
                    success: 0,
                    message: "login canceled"
               })
            }
        })
    }
};

