import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import UserActivity from '../models/userActivity.js'


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User related APIs
 */

/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: Authenticate user and get token
 *     tags: [Users]
 *     description: Authenticate a user with email and password and return a token
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 */
const authUser = asyncHandler( async (req,res) => {
     
     const {email, password} = req.body;
     console.log('Hit')

     const user = await User.findOne({email});

     if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
        }else{
            res.status(401);
            throw new Error("Invalid email or password");
        }  
});

/**
 * @swagger
 * /api/users/activity:
 *   post:
 *     summary: Log user activity
 *     tags: [Users]
 *     description: Log user activity with actionType and page information
 *     produces:
 *       - application/json
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - name: actionType
 *         description: Type of action performed
 *         in: formData
 *         required: true
 *         type: string
 *       - name: page
 *         description: Page on which the action was performed
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User activity logged successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Invalid activity data
 */
const logUserActivity = asyncHandler( async (req,res) => {
    const { actionType, page } = req.body;
    const userId = req.user._id;  // Grab the user ID from req.user, populated by the protect middleware

    const userActivity = await UserActivity.create({
        userId,
        actionType,
        page
    });

    if(userActivity){
        res.status(201).json({
            message: 'User activity logged successfully'
        });
    }else{
        res.status(400);
        throw new Error("Invalid activity data");
    }
});



/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user with name, email, and password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *       400:
 *         description: User already exists or invalid user data
 */
const registerUser = asyncHandler( async (req,res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }

    console.log(name, email, password);
});


/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     description: Logout a user by clearing the JWT cookie
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
const logoutUser = asyncHandler( async (req,res) => {
     res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: "User logged out"});
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     description: Get the profile of the authenticated user
 *     produces:
 *       - application/json
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 */
const getUserProfile = asyncHandler( async (req,res) => {
     const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
     }

     res.status(200).json(user);
});


/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     description: Update the profile of the authenticated user
 *     produces:
 *       - application/json
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password (optional)
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *       404:
 *         description: User not found
 */
const updateUserProfile = asyncHandler( async (req,res) => {
     const user = await User.findById(req.user._id);

        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if(req.body.password){
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            });

        }else{
            res.status(404);
            throw new Error("User not found");
        }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    logUserActivity
}