const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const QueryData = require("../models/querySchema");
const Contact = require("../models/ContactSchema");

const { parse } = require("path");
const { Console } = require("console");
const FeedbackData = require("../models/feedbackSchema");
const ReportData = require("../models/reportSchema");

const CommentData = require("../models/commentSchema");
const UserImage = require("../models/ImageSchema");
const passport = require("passport");

const app = express();
app.use(cookieParser());
const router = express.Router();

//##################### Admin ###############################



// //////////////////////////////total user find API


router.get("/usersCount", async (req, res) => {
  User.find((err, docs) => {
    if (docs) {
      res.send({ status: 200, data: docs });

    } else {
      res.send({ status: 500, error: err });
    }
  });
});


// //////////////////////////////total query find API


router.get("/queryCount", async (req, res) => {
  QueryData.find((err, docs) => {
    if (docs) {
      res.send({ status: 200, data: docs });
    } else {
      res.send({ status: 500, error: err });
    }
  });
});


///////////////////////// show user query to admin API //////////////////////

router.get("/showquery", async (req, res) => {
  QueryData.find((err, docs) => {
    if (docs) {
      res.send({ status: 200, data: docs });
    } else {
      res.send({ status: 500, error: err });
    }
  });
});

///////////////////////////////////////////////////////////  usersList API //////////////////////////////////////////////////

router.get("/usersList", async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, Email: 1, id: 1 });
    res.send(users);
  } catch (error) {
    console.error("Error fetching users list:", error);
    res.status(500).send({ status: 500, error: error });
  }
});

///////////////////////////////////////////////////////////  Report Category API //////////////////////////////////////////////////

router.get("/queryCategory", async (req, res) => {
  ReportData.find((err, docs) => {
    if (docs) {
      res.send({ status: 200, data: docs });
    } else {
      console.log("err ========", err);
      res.send({ status: 500, error: err });
    }
  });
});

///////////////////////////////////////////////////////////  Get Feedback Data API //////////////////////////////////////////////////

router.get("/findfeedback", async (req, res) => {
  FeedbackData.find((err, docs) => {
    if (docs) {
      res.send({ status: 200, data: docs });
      // console.log("Mydata--------------", docs)
    } else {
      console.log("err ========", err);
      res.send({ status: 500, error: err });
    }
  });
});

/////////////////////////////////////////////////////////  Get queries //////////////////////////////////////////////////

router.get("/findreport", async (req, res) => {
  ReportData.find((err, docs) => {
    if (docs) {
      res.send({ status: 200, data: docs });
      // console.log('docs ========', docs)
    } else {
      console.log("err ========", err);
      res.send({ status: 500, error: err });
    }
  });
});



router.get("/queriesCount", async (req, res) => {
  const queryCount = QueryData.countDocuments;
  res.send({ queryCount });
});


///////////////////////////////// Get users with date ////////////////////////////

router.get("/finduserwithdate", async (req, res) => {
  try {
    const users = await User.find({}, { Date: 1, Category:1, Email:1, id: 1 });
    const formattedUsers = users.map(user => {
      const formattedDate = formatDate(user.Date); // Format the date using a helper function
      return { id: user.id, Date: formattedDate, Category: user.Category };
    });
    res.send(formattedUsers);
  } catch (error) {
    console.error("Error fetching find user with date:", error);
    res.status(500).send({ status: 500, error: error });
  }
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}



//////////////// delete document from MO DB ///////////////

const { ObjectId } = require('bson');

router.delete('/deletequery/:id', async (req, res) => {
  try {

    const postId = req.params.id;   

    const validPostId = ObjectId(postId)
    
    console.log("muuuuuuuuu", validPostId)

    // Delete the post from the database
    await QueryData.findByIdAndDelete(validPostId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



//######################  Client #########################

// =============== Image Uplaod ===================
router.post("/Upload", async (req, res) => {
  // const myFile= req.body;
  // try{
  //   const newImage = await UserImage.create(myFile)
  //   newImage.save();

  //   // const commentData = new UserImage({body});
  //   // commentData.save();
  //   console.log("Image Upload ho gyi")
  //   return res.status(201).json({msg: "Image Uploaded Successfully"});

  // }catch(err)
  // {
  //   return res.status(409).json({message: err.message})
  // }

  try {
    const { postImage, Title } = req.body;
    // console.log(" myFILELLLLLLLLLLL ====  ");

    const commentData = new UserImage({ postImage, Title });
    await commentData.save();
    res.status(201).json({ msg: "New image uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

let userExist = "";
router.get("/OwnQuestion", Authenticate, async (req, res) => {
  //  localStorage.getItem('user',JSON.stringify(Email));

  // console.log(userExist.name);
  const userData = await QueryData.find({ UserID: userExist.Email }).sort({
    _id: -1,
  });
  // const userData = await QueryData.find().sort({ _id: -1 });

  if (userData) {
    // console.log(userData);
  }
  res.send(userData);
});

router.get("/OwnQuestionn", Authenticate, async (req, res) => {
  // console.log("helo Own Question2 page");
  //  localStorage.getItem('user',JSON.stringify(Email));

  // console.log(userExist.name);
  const userData = await User.findOne({ Email: userExist.Email });
  // const userData = await QueryData.find().sort({ _id: -1 });

  if (userData) {
    // console.log(userData);
  }
  res.send(userData);
});

router.get("/OwnProfileDetails", Authenticate, async (req, res) => {
  const userData = await User.findOne({ Email: "191119@students.au.edu.pk" });
  if (userData) {
    res.send(userData);
  }
});

router.get("/Question", Authenticate, async (req, res) => {
  console.log("helo about page");
  // const userExist = await QueryData.find({ UserID: "tech54qi@gmail.com" }).sort({ _id: -1 });
  const userExist = await QueryData.find().sort({ _id: -1 });

  if (userExist) {
    // console.log(userExist);
  }
  res.send(userExist);
});

router.get("/FetchReport", Authenticate, async (req, res) => {
  // const userExist = await QueryData.find({ UserID: "tech54qi@gmail.com" }).sort({ _id: -1 });
  const userExist = await ReportData.find().sort({ _id: -1 });
  console.log("-------------------------------");

  if (userExist) {
    // console.log(userExist);
  }
  res.send(userExist);
});

router.get("/getData", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

let contactData;
router.post("/contact", Authenticate, async (req, res) => {
  const { name, Email, Subject, Message } = req.body;
  // console.log("----------------" + name + Email + Subject + Message);

  try {
    if (!name || !Email || !Subject || !Message) {
      // console.log("filled contact form");
      return res.json("please filled the data");
    } else {
      contactData = new Contact({ name, Email, Subject, Message });
      contactData.save();
      res.status(201).json({ message: "Your Contact Successfully Posted" });
      // console.log("Your Contact Successfully Posted");
    }
  } catch (error) {
    console.log(error);
  }
});

//-------------- Comment API------------------

let commentData;
router.post("/comment", async (req, res) => {
  const { ID, PostID, comment } = req.body;
  // console.log(ID + "----" + PostID + "---" + comment);
  try {
    if (!ID || !PostID || !comment) {
      // console.log("Missing Answer Data");
      res.status(400).json({ error: "Please Filled the Field Properly" });
    } else {
      let quer = await QueryData.findOne({ PostID: PostID });
      if (quer) {
        const userMessage = await quer.addMessage(ID, PostID, comment);
        console.log("*************************");

        await quer.save();

        res.status(201).json({ message: "Comment Successfully" });
      }
      // commentData = new CommentData({ ID, PostID, Answer });
      // commentData.save();
      // res.status(201).json({ message: "Your Comment Successfully Posted" });
      // console.log("Your Comment Successfully Posted");
    }
  } catch (err) {
    console.log(err);
  }
});

//------------------- Forgot Pass Change ------------------

router.post("/forgot_pass_save", async (req, res) => {
  const { Email, New_Password, Confirm_Password } = req.body;

  try {
    const userData = await User.findOne({ Email: Email });
    if (userData) {
      // console.log(userData.Email);
      const filter = { Email: Email };
      this.New_Password = await bcrypt.hash(New_Password, 12);
      this.Confirm_Password = await bcrypt.hash(Confirm_Password, 12);
      const update = {
        Password: this.New_Password,
        Confirm_Password: this.Confirm_Password,
      };
      let userr = await User.findOneAndUpdate(filter, update);

      res.status(201).json({ message: "Your Data Successfully Posted" });
      console.log("Your Data Successfully Posted");
    }
  } catch (err) {
    console.log(err);
  }
});

// --------------- Change Password -----------------

router.post("/change_pass", async (req, res) => {
  // console.log("chagneeeeeeeeeeee");
  const { Email, Password, New_Password, Confirm_Password } = req.body;
  try {
    const userData = await User.findOne({ Email: Email });
    if (userData) {
      console.log(userData.Email);
      const isMatch = await bcrypt.compare(Password, userData.Password);
      // console.log("pass: " + Password + "user pass: "+ userData.Password);
      if (!isMatch) {
        console.log("pass incorrect");

        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        // console.log(Email);
        const filter = { Email: Email };
        this.New_Password = await bcrypt.hash(New_Password, 12);
        this.Confirm_Password = await bcrypt.hash(Confirm_Password, 12);
        const update = {
          Password: this.New_Password,
          Confirm_Password: this.Confirm_Password,
        };
        // console.log("change pass mein hash se pehle =======");
        // await update.save();
        let userr = await User.findOneAndUpdate(filter, update);
        // console.log("-0-0 --- " + userr);
        // await userr.save();
        res.status(201).json({ message: "Your Data Successfully Posted" });
        console.log("Your Data Successfully Posted");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//------------------ Update Profile------------------
let updateData;
router.post("/UpdateProfile", async (req, res) => {
  const { Email, name, Password, Phone, Gender, Website, Github, Twitter } =
    req.body;

  try {
    console.log(Email);
    const userData = await User.findOne({ Email: Email });
    // const userData = await QueryData.find().sort({ _id: -1 });

    if (userData) {
      console.log("haaaaaaaaaaaaaaaaaaaaaaa" + Gender + "33");

      const filter = { Email: Email };
      const update = {
        Phone: Phone,
        Gender: Gender,
        Website: Website,
        Github: Github,
        Twitter: Twitter,
      };

      await User.findOneAndUpdate(filter, update);
      res.status(201).json({ message: "Your Data Successfully Posted" });
      console.log("Your Data Successfully Posted");
    }
    // updateData = new User({Phone});
    // updateData.save();
  } catch (err) {
    console.log(err);
  }
});

//-----------Report API-------------------------

let reportData;
router.post("/report", async (req, res) => {
  const { ID, Category, Feedback } = req.body;
  console.log(ID + Category + Feedback);
  try {
    if (!ID || !Category || !Feedback) {
      console.log("Missing Feedback Data");
      res.status(400).json({ error: "Please Filled the Field Properly" });
    } else {
      reportData = new ReportData({ ID, Category, Feedback });
      reportData.save();
      res.status(201).json({ message: "Your Feedback Successfully Posted" });
      console.log("Your Feedback Successfully Posted");
    }
  } catch (err) {
    console.log(err);
  }
});

//-----------Feedback API-------------------------

let feedbackData;
router.post("/feedback", async (req, res) => {
  const { ID, Category, Feedback } = req.body;
  try {
    if (!ID || !Category || !Feedback) {
      console.log("Missing Feedback Data");
      res.status(400).json({ error: "Please Filled the Field Properly" });
    } else {
      feedbackData = new FeedbackData({ ID, Category, Feedback });
      feedbackData.save();
      res.status(201).json({ message: "Your Feedback Successfully Posted" });
      console.log("Your Feedback Successfully Posted");
    }
  } catch (err) {
    console.log(err);
  }
});

// ------------- Query Post API ------------------

let queryData;
router.post("/Question", async (req, res) => {
  const {
    UserID,
    UserName,
    PostID,
    QueryCategory,
    QueryTitle,
    QueryDetails,
    QueryTags,
  } = req.body;

  try {
    if (
      !UserID ||
      !PostID ||
      !UserName ||
      !QueryCategory ||
      !QueryTitle ||
      !QueryDetails ||
      !QueryTags
    ) {
      console.log("Missing Data");
      console.log(
        UserID +
          UserName +
          PostID +
          QueryCategory +
          QueryTitle +
          QueryDetails +
          QueryTags
      );

      return res
        .status(400)
        .json({ error: "Please Filled the Field Properly" });
    } else {
      // const userExist = await QueryData.findOne({ UserID: "tech54qi@gmail.com" });
      // console.log(userExist);

      queryData = new QueryData({
        UserID,
        UserName,
        PostID,
        QueryCategory,
        QueryTitle,
        QueryDetails,
        QueryTags,
      });
      await queryData.save();

      res.status(201).json({ message: "Your Query Successfully Posted" });
      console.log("Your Query Successfully Posted");
    }
  } catch (err) {
    console.log(err);
  }
});

//------------------Query upvote ---------------------

router.post("/QueryUpvote", async (req, res) => {
  const { PostID, Upvote, Devote } = req.body;

  try {
    let like = Upvote;
    like = like + 1;
    let dislike = Devote;
    dislike = dislike + 1;
    console.log(
      "000000000" + PostID + "Like:::" + like + "Dislike:::" + dislike
    );
    // const userExist = await QueryData.findOne({ UserID: "tech54qi@gmail.com" });
    // console.log(userExist);
    const filter = { PostID: PostID };
    const update = { Upvote: like, Devote: dislike };

    await QueryData.findOneAndUpdate(filter, update);
    // queryData = new QueryData({

    //   PostID,
    //   Upvote
    // });
    // await queryData.save();

    res.status(201).json({ message: "Your Query Successfully Posted" });
    console.log("Your Query Successfully Posted");
  } catch (err) {
    console.log(err);
  }
});

// ---------------- Forgot Pass -------------------

router.post("/Forgot_Pass", async (req, res) => {
  const { Email } = req.body;
  try {
    if (!Email) {
      return res
        .status(400)
        .json({ error: "please filled the field properly" });
    }

    if (Email.endsWith("@students.au.edu.pk")) {
      const userExist = await User.findOne({ Email: Email });
      if (userExist) {
        console.log(Email);
        // user = new User({ name, Email, Password, Confirm_Password, Photo });
        // await user.save();

        // console.log(  `===================    ${user._id} ++ ${user.Email} ==========` );

        // token = await user.generateAuthToken();
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        console.log("----" + token);

        // const token = await new Token({userId: user._id,token: crypto.randomBytes(32).toString("hex") }).save();

        const url = `${process.env.BASE_URL}/users/${Email}/forgot_pass/${token}`;
        await sendEmail(Email, "Password Reset Mail", url);

        // console.log("user reg successfully");
        return res
          .status(201)
          .json({ message: "An email send to your account please verify." });
      }
    } else {
      return res.status(400).json({ error: "Invalid Data" });
    }
  } catch (err) {
    console.log(err);
  }
});

// ------------- SIGN UP -------------
let user;
let token;

router.post("/signup", async (req, res) => {
  const { name, Email, Password, Confirm_Password } = req.body;

  try {
    if (!name || !Email || !Password || !Confirm_Password) {
      return res
        .status(400)
        .json({ error: "please filled the field properly" });
    }

    if (Email.endsWith("@students.au.edu.pk")) {
      const userExist = await User.findOne({ Email: Email });
      if (userExist) {
        // console.log("Email already Exist");

        return res.status(400).json({ error: "Email already Exist" });
      } else if (Password != Confirm_Password) {
        // console.log("pass not match");

        return res.status(400).json({ error: "Password are not Matching" });
      } else {
        let Photo = "../images/avatar.png";
        user = new User({ name, Email, Password, Confirm_Password, Photo });
        console.log("hash mein jane se pehle ++++++++");
        await user.save();

        // console.log(  `===================    ${user._id} ++ ${user.Email} ==========` );

        token = await user.generateAuthToken();

        // const token = await new Token({userId: user._id,token: crypto.randomBytes(32).toString("hex") }).save();

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        await sendEmail(user.Email, "Verification Mail", url);

        // console.log("user reg successfully");
        return res
          .status(201)
          .json({ message: "An email send to your account please verify." });
      }
    } else {
      return res.status(400).json({ error: "Invalid Data" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Invalid Data" });
  }
});

// ---------------

router.get("/users/:id/verify/:token", async (req, res) => {
  try {
    console.log(
      " //////////////// *** " + req.params.id + "iiiii" + req.params.token
    );
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid Link" });
    }

    console.log("22222222222222 ++ " + user._id);

    const token = await User.findOne({
      _id: user._id,
      "Tokens.token": req.params.token,
    });

    console.log("333333333333333333333");

    if (!token) {
      console.log("[[[[[[[[[[[[  Token dont exist");
      return res.status(400).send({ message: "Invalid Link" });
    }

    if (token) {
      console.log("[[[[[[[[[[[[  Token  exist");
    }

    const filter = { _id: user._id };
    const update = { verified: true };

    await User.findOneAndUpdate(filter, update);

    // await User.updateOne({
    //   id: user._id,
    //   verified: true,
    // });

    //  await token.remove();

    res.status(200).send({ message: "Email Verified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Internal Server Eror" });
  }
});

//----------Login Route-----

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  // const user = await User.findOne({ _id: req.params.id });

  try {
    if (!Email || !Password) {
      console.log("missing login credentials");

      return res
        .status(400)
        .json({ error: "please filled the field properly" });
    }

    userExist = await User.findOne({ Email: Email });
    if (userExist) {
      console.log("Email already Exist");
      const isMatch = await bcrypt.compare(Password, userExist.Password);

      if (!isMatch) {
        console.log("pass incorrect");

        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const verify = userExist.verified;
      console.log(verify);

      if (!verify) {
        token = await userExist.generateAuthToken();
        const url = `${process.env.BASE_URL}users/${userExist._id}/verify/${token}`;
        await sendEmail(userExist.Email, "verify Email", url);
        console.log("An Email sent to your account please Verifyyyyyyyyyy");
        return res
          .status(403)
          .send({ message: "An Email sent to your account please Verify" });
      } else {
        token = await userExist.generateAuthToken();
        res.cookie("jwToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.cookie("Name", userExist.name, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: false,
        });

        res.cookie("Email", userExist.Email, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: false,
        });

        // console.log("" + userExist);
        console.log("successfully login");

        return res.status(200).json(
          // { message: "User Signin Successfully" }
          userExist
        );
      }
    } else {
      console.log("email is incorrect");

      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  console.log("hello to logout page");
  res.clearCookie("jwToken", { path: "/" });
  res.status(200).send("Logout Successfully");
});

let resp;

router.get("/login/success", async (req, res) => {
  console.log("----------------------------");
  if (req.user) {
    console.log(req.user);
    // console.log("----------------------------");

    // console.log(req.user.name);
    // 	console.log("----------------------------");

    // console.log(req.user.emails[0].value);
    // resp = req.user;
    // console.log("33");

    // user = new User({ name: req.user.name.givenName,
    //   Email: req.user.emails[0].value,
    //   Password,
    //   Confirm_Password,
    //   Photo: req.user.picture,
    //   Verified: "True",
    //  });
    // console.log("hash mein jane se pehle ++++++++");
    // await user.save();

    res.cookie("Name", req.user.name.givenName, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: false,
    });

    res.cookie("Email", req.user.emails[0].value, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: false,
    });

    return res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    return res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  console.log("+++++++++++++++++++");
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "http://localhost:3001/signup/",
  })
);

module.exports = router;
