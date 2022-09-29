const ApiError = require("../api-error");
const ContractService = require("../services/contact.service");
const MongoDB =require("../utils/mongodb.util");


exports.create =async (req,res,next)=>{
    if(!req.body?.name){
        
        return next(new ApiError(400,"Name can not be empty"));
    }
    try {
        const contractService = new ContractService (MongoDB.client);
        const document = await contractService.create(req.body);
        return res.send(document);
        
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
        
    }
    
};

exports.findAll = async (req,res,next)=>{
    let document = [];
    try {
        const contractService = new ContractService(MongoDB.client);
        const {name} =req.query;
        if(name){
            document = await contractService.findByName(name);
        }else {
            document = await contractService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the contact")
        );
        
        
    }
    return res.send(document);
};
exports.findOne = async (req,res,next)=>{
    try {
        const contractService = new ContractService(MongoDB.client);
        const document = await contractService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);  
        
    } catch (error) {
        return next(
            new ApiError(500, "Error retrieving contact with id=${req.params.id}")
        );
    }
};
exports.update =  async(req,res,next)=>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try {
        const contractService = new ContractService(MongoDB.client);
        const document =await contractService.update(req.params.id,req.body);
        if(!document){
            return next (new ApiError(404,"contact not found"));
        }
        return res.send({message: "contact was updated successfully"});
        
    } catch (error) {
        return next(
            new ApiError(500, 'Error updating contact with id= ${req.params.id}')
        );
    }
    
};
exports.delete = async (req,res,next)=>{
    try {
        const contractService = new ContractService(MongoDB.client);
        const document = await contractService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({message:"Contact was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                'Could not delete contact with id=${req.params.id}'
            )
        );
        
    }
};
exports.findAllFavorite = async (req,res,next)=>{
    try {
        const contractService = new ContractService(MongoDB.client);
        const document = await contractService.findAllFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                'An error occurred while retrieving favorite contacts'
            )
        );
        
    }
    
};
exports.deleteAll = async(req,res,next)=>{
    try {
        const contractService = new ContractService(MongoDB.client);
        const deletedCount = await contractService.deleteAll();
        return res.send({
            message: "${deletedCount} contacts were deleted successfull",
        });
    } catch (error) {
        return next(
            new ApiError(500,"An error occurred while removing all contacts")
        );
    }
    
};