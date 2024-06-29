import { Product } from "../models/Product.js";
import { mailsender } from "../utils/mailSender.js";
import { respond } from "../utils/response.js";
import { User } from "../models/User.js";

export const addPrice = async(req,res) => {
    try{
        const userId = req.user.id;
        const {productId} = req.body;

        if(!productId) {
            return respond(res,"please provide the product id",400,false)
        }

        const product = await Product.findById({_id:productId});

        if(!product){
            return respond(res,"could not find the product",400,false)
        }

        const {price} = req.body;

        if(!price) {
            return respond(res,"Please enter your estimeted price",400,false)
        }

        const addInterestedProduct = await Product.findOneAndUpdate({_id:productId},{
            $push:{
                estimatedPrice:{userId,price}
            },
        },{new:true});

        const interestedUser = await User.findOneAndUpdate({_id:userId},{
            $push:{
                products:productId,
            }
        },{new:true})
        
        const emailResponse = await mailsender(interestedUser.email,"Thanks for your Intrest",
        `Now you are on boarded for the product ${addInterestedProduct.name}`)

        return respond(res,"you are successfully add your intrest in this product",200,true,addInterestedProduct)
    } catch(error) {
        return respond(res,"something went wrong while adding interest in product",500,false)
    }
}

export const getAllInterestedShopkeepers = async(req,res) => {
    try{
        const {id} = req.params;

        console.log("ioqfhoq", JSON
            .stringify(req.params)
        )

        if(!id) {
            return respond(res,"please provide the product",400,false)
        }

        const product = await Product.findById({_id:id}).populate({
            path: 'estimatedPrice.userId',
            populate: { path: 'vendorDetails' } // Populate vendorDetails field within user
        })
        .populate({
            path: 'estimatedPrice.price'
        }).populate({
            path: 'estimatedPrice.userId',
            populate: { path: 'profile' } 
        })
        .exec();

        console.log("egg",product)

        return respond(res,"fetch all the shopkeepers who are interested in one product",200,true,product)
    } catch(error) {
        console.log(error.message)
        return respond(res,"error in geting all intrested shopkeepers",500,false)
    }
}

export const editPrice = async(req,res) => {
    try{

        const userId = req.user.id
        const {productId,price} = req.body;

        if(!productId) {
            return respond(res,"Product is not found",400,false)
        }

        const updatedProductPrice = await Product.findOneAndUpdate(
            { _id: productId, "estimatedPrice.userId": userId },
            { $set: { "estimatedPrice.$.price": price } },
            { new: true }
        );

        return respond(res,"Price updated successfully",200,true)
    } catch(error) {
        console.log(error) 
        return respond(res,"Price doesn't get updated",500,false)
    }
}

export const deletePrice = async(req, res)=>{

    try{
        const userId =  req.user.id;
        const { productId } = req.body;

        const productDetails = await Product.findById({productId : productId});

        if (!productDetails) {
            return respond(res, "Product not found", 404, false);
        }


        await Product.findByIdAndUpdate(
           productId,
           {
            $pull:{
                estimatedPrice: { userId : userId, price:price}
            }
           },
           {new: true }
        )

        return respond(res, "Price entry deleted successfully", 200, true);

    }catch(error){
        console.error(error);
        return respond(res, "Failed to delete the price entry", 500, false);
    }
}

export const allInterestedProductsOfUser = async(req,res) =>{
    try{

        const userId = req.user.id;


        const data = await User.findById(userId).populate("products").exec();

        console.log(data);

        return respond(res,"fetching all the products which interested by other shopkeeperes done",200,true,data)
    } catch(error) {
        console.log(error);
        return respond(res,"something went wrong ahile fetching the all products which interested by shopkeeperes",500,false)
    }
}

export const allOtherShopkeepersPrice = async(req,res) => {
    try{
        const {productId} = req.body;
        const userId = req.user.id;

        const product = await Product.find(productId).populate({
            path:"estimatadPrice",
            match:{userId:userId}
        })

        const filteredData = product.filer(product => product.estimatedPrice !== null);

        return respond(res,"fetching the price of other shopkeeperes done",200,true,filteredData)
    }catch(error) {
        return respond(res,"something went wrong ahile fetching the price of other shopkeeperes",500,false)
    }
}

// export const getAllShopKeepers = async(req,res) => {
//     try  {

