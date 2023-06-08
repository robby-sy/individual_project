const {Project,User,UserProject} = require('../models')
const {createComponent,createRecord} = require('../helpers/tableMongo')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);
const db = client.db("Sun_Power");

class ProjectController{
    static async getProjects(req,res,next){
        try {
            const projects = await Project.findAll({
                where:{
                    status:'publish'
                },
                include:User
            })
            res.status(200).json(projects)
        } catch (error) {
            console.log(error);
        }
    }
    static async getProject(req,res,next){
        try {
            const {id} = req.params
            const project = await Project.findByPk(id)
            await client.connect()
            const {record,component} = project
            const Record = db.collection(record)
            const record_data = await Record.find({}).toArray();
            const Component = db.collection(component)
            const comp = await Component.find({}).toArray();
            res.status(200).json({project,record_data,comp})
        } catch (error) {
            res.send(error)
        }
    }
    static async postProject(req,res,next){
        try {
            const {name,location} = req.body
            const UserId = req.user.id
            const record = createRecord(name,req.user.id)
            const component = createComponent(name,req.user.id)
            await client.connect()
            const Record = db.collection(record);
            const Component = db.collection(component);
            await Record.insertOne({
                time:new Date(),
                voltage:0,
                current:0,
                intentsity:0,
                temperature:0,
                humidity:0,
                message:"initial query"
            })
            await Component.insertOne({
                panel:{
                    type:"",
                    array:0,
                    voltage:12,
                    current:0,
                    power:0
                },
                controller:"",
                sensors:[]
            })
            const project = await Project.create({name,location,UserId,record,component,status:"archived"})
            res.send(project)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async putProject(req,res,next){
        try {
            const {name,location,status,picture1,picture2,picture3} = req.body
            await Project.update({name,location,status,picture1,picture2,picture3})
            res.status(200).json({message:"successfully update data"})
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteProject(req,res,next){
        try {
            
        } catch (error) {
            
        }
    }
    static async patchProject(req,res,next){
        try {
            const {status} = req.body
            await Project.update({status})
            res.status(200).json({message:"successfully update data"})
        } catch (error) {
            console.log(error);
        }
    }
    static async insertRecord(req,res,next){
        try {
            const {voltage,current,intentsity,temperature,humidity} = req.body
            const record = req.params.project
            await client.connect()
            const Record = db.collection(record);
            await Record.insertOne({
                time:new Date(),voltage,current,intentsity,temperature,humidity
            })
            res.status(201).json({message:"Data successfully recorded"})
        } catch (error) {
            res.status(500).json("Internal server error")
        }
    }

}

module.exports=ProjectController