const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const { response } = require('../app.js');

exports.register = (req,res) => {
    try {
        let email = req.body.email

        if (!req.body.email || !req.body.password) {
            return res.status(406).json({"error":"Bad input"})
        }

        User.findOne({email}).then(async (response) => {
            if (!response) {
                let password = await bcrypt.hash(req.body.password,5)

                let user = new User();
                user.email = email
                user.password = password

                user.save().then(() => {
                    return res.status(200).json({"error":"Success! Your are now a registered user."})
                }
                ).catch((err) => {
                    console.log(err)
                    return res.status(500).json({"error":"Registration was unsuccessful though to database error."})
                })
            }
            else{
                return res.status(406).json({"error":"Email is already in use!"})
            }
        })           
        .catch((err) => {
            console.log(err)
            return res.status(500).json({"error":"Database error, please try again later."})
        })    
    } catch (error) {
        console.log(error)
        return res.status(500).json({"error":"Something went wrong, registration aborted."})
    }
}
exports.login = (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        console.log(password)
        if (!email || !password) {
            return res.status(406).json({"error":"Bad input"})
        }

        User.findOne({ email }).then(async (response) => {
            if (response) {
                const isPasswordCorrect = await bcrypt.compare(password, response.password)
                if (isPasswordCorrect) {
                    let session = ''
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    const charactersLength = characters.length;
                    const sessionLength = 30 
                    for (let index = 0; index < sessionLength; index++) {
                        session = session+characters.charAt(Math.floor(Math.random() * 
                        charactersLength))
                    }
                    res.cookie('LOCAL_KEY', session)
                    User.updateOne({ email }, { session } )
                    .then(() => { 
                        return res.status(200).json({"error":"Success! Logging in."})
                     })
                    .catch((error) => {
                        console.log(error)
                        return res.status(500).json({"error":"Unsuccessful login though to server issue. Please try again later."})
                    })
                }
                else{
                    return res.status(406).json({ "error": "Incorrect password!" });
                }
            }
            else{
                return res.status(406).json({"error":"Incorrect Email address."})
            }
        })           
        .catch((err) => {
            console.log(err)
            return res.status(406).json({"error":"Database error, please try again later."})
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({"error":"Something went wrong, login aborted."})
    }
}
exports.isLoggedIn = (req,res) => {
    const session = req.cookies['LOCAL_KEY']
    if (!session) {
        return res.status(401).json({"error":"No logged in user."})
    }
    User.findOne({ session }).then((resp)=>{
        return res.status(200).json(resp._id)
    }).catch(()=>{
        return res.status(401).json(false)
    })
}
exports.logOut = (req,res) => {
    res.clearCookie('LOCAL_KEY');
    return res.status(200).json({ "message": "Successful logout." });
}