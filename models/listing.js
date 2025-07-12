const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
 title:{
    type:String,
    required:true,},
 description:String,
 image:{url:String,
  filename:String,
       },
  price:Number,
  location: String,
  country:String,
  reviews:[{
   type :Schema.Types.ObjectId,
   ref:"Review",
  },],
  owner:{
  type:Schema.Types.ObjectId,
  ref:"User",
  },
  geometry:{
    type:{
      type:String,
      enum:['Point'],
      required:true
    },
    coordinates:{
   type:[Number],
   required:true,    
  }
  },
  category:{
    type:String,
           },
  keywords:{
    type:String,
  },         
                            });

//used to delete all the associated reviews for a lisitng
//when the listing is deleted all the associated reviws will also get deleted
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
await Review.deleteMany({_id:{$in:listing.reviews}});
  }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

