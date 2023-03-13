const jwt=  require("jsonwebtoken");
const User = require("../models/userSchema");



const Authenticate = async (req,res,next) => {

   
    

    try{
        console.log("++++++++++++++++++++++++++++++");

        const token = req.cookies.jwToken;
        console.log(req.cookies.jwToken);
        console.log("----------------------- ----------------------");

        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);


        console.log(User._id);
        const rootUser = await User.findOne({_id: verifyToken._id, "Tokens.token": token});
        console.log('==================================')
        console.log(rootUser);

        if(!rootUser) { throw new Error("User not Found")};

        req.token=token; 
        req.rootUser=rootUser;
        req.userID=rootUser._id;

        next();


    }
    catch(err){
        res.status(401).send("Unauthorized: No Token Provided");
        console.log(err);
    }


}


module.exports =Authenticate;