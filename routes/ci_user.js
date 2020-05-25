/**
 * Dev: f97gp1@gmail.com
 * Date: May 24th, 2020
 * 
 * Controller for the "ci_user" table.
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const upload = require('../utils/uploader');

const db = require('../config/database');

const CI_user = require('../model/CI_user');

var ci_user = express.Router();

// CRUD logic

// filter 
ci_user.get('/',  async (req, res) =>{
    var where = {},
        include = exclude = null,
        t = await db.transaction();

        if( req.query ){
            
            if( req.query.exclude ){
                exclude = req.query.exclude.split(",");

                delete req.query.exclude;
            }

            if (req.query.include){
                include = req.query.include.split(",");

                delete req.query.include;
            }

            where = req.query;

            CI_user.findAndCountAll({
                where,
                attributes : include || {exclude}
            }, {transaction : t})
            .then( data =>{

                let message = (!data || !data.count) 
                    ? "object not found"
                    : "object found";

                t.commit();    

                return res
                    .status(200)
                    .send({
                        result      : "ok",
                        http_code   : 200,
                        message,
                        item        : data
                    });
            });
        }else{
            t.rollback();

            return res
                .status(400)
                .send({
                    result      : "bad",
                    http_code   : 400,
                    message     : `empty query row not created`
                });
        }
});

// create 
ci_user.post('/', upload.multer.none(), async (req,res) => {
    var t = await db.transaction();

    try{

        CI_user.create({
            id_user : uuidv4(),
            email   : req.body.email,
            dev_lvl : req.body.dev_lvl
        }
        , { transaction: t }
        )
        .then( item => {
            t.commit();

            return res
                .status(200)
                .send({
                    result      : "ok",
                    http_code   : 200,
                    message     : `row created`,
                    item
                });
        })
        .catch( err =>{
            t.rollback();
        
        return res
            .status(400)
            .send({
                result      : "bad",
                http_code   : 400,
                message     : `row not created created`,
                err_msg     : String( err) 
            });
        });
    }
    catch(err){
        t.rollback();
        
        return res
            .status(400)
            .send({
                result      : "bad",
                http_code   : 400,
                message     : `row not created created`,
                err_msg     : String( err) 
            });
    }
});

// delete all | id_user
ci_user.delete('/', upload.multer.none(), async (req, res) =>{
    var where = {},
        t = await db.transaction();

        if( req.body )
            where = req.body;

    // console.log( where );

    await CI_user.destroy(
        {where},
        {force          : true},
        {transaction    : t}
    )
    .then( user_del => {
        if( user_del == 0)
            throw new Error('no row detected to delete');

        t.commit();

        return res
            .status(200)
            .send({
                result      : "ok",
                http_code   : 200,
                message     : `object(s) deleted, count: ${user_del}`
            });
    })
    .catch(err => {
        t.rollback();
        
        return res
            .status(400)
            .send( {
                result      : "bad",
                http_code   : 400,
                message     : String(err)
            });
    });
    
});

module.exports = ci_user;
