import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

/**
 * @description  User login
 * @route        POST /api/users/login
 * @access       Public
 */
const login = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(404)
        throw new Error('Please add all fields!')
    }

    const user = await User.findOne({email: email })
    if (!user) {
        res.status(404)
        throw new Error('Invalid Email!')
    }

    const isCheck = await bcrypt.compare(password, user.password)
    if (!isCheck) {
        res.status(404)
        throw new Error('Invalid Password')
    } 

    res.status(200).json({
        msg: "Login successfull!",
        success: true,
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
    })

});


/**
 * @description  New User
 * @route        POST /api/users
 * @access       Public
 */
const register = asyncHandler(async (req, res) => {
    
    const { name, email, password, password2 } = req.body;


    if (!name || !email || !password || !password2){
        res.status(400) 
        throw Error("please add all fields");
    }
    
    if (password !== password2){
        res.status(400) 
        throw new Error("Password doesn't match");
    }
    

    const user = await User.findOne({ email });
    if (user) {
        res.status(400)
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error("something went wrong with bcrypt"); 
    }

    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) {
        res.status(400)
        throw new Error("something went wrong with hashing password");
    }

    const userData = new User({
        name,
        email,
        password: hashPassword
    })

    const savedUser = await userData.save(); 

    if (savedUser) {
        
        res.status(201).json({ 
            msg: "Register successfull!",
            success:  true,
            token: generateToken(savedUser._id),
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin
            }
        })
    }
});


/**
 * @description  Get user profile
 * @route        GET /api/users/profile
 * @access       Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
});



/**
 * @description  Update user profile
 * @route        PUY /api/users/profile
 * @access       Public
 */
 const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error("something went wrong with bcrypt"); 
    }

    const hashPassword = await bcrypt.hash(req.body.password, salt);
    if (!hashPassword) {
        res.status(400)
        throw new Error("something went wrong with hashing password");
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
        user.password = hashPassword || user.password
    }

    const updatedUser = await user.save();

    res.status(201).json({ 
        msg: "Updated successfull!",
        success:  true,
        token: generateToken(updatedUser._id),
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        }
    })

});





/**
 * @description  Get users
 * @route        GET /api/users
 * @access       Private/Admin
 */
 const getUsers = asyncHandler(async (req, res) => {
    
    const users = await User.find({});
    res.json(users)

});



/**
 * @description  Delete users
 * @route        DELETE /api/users/:id
 * @access       Private/Admin
 */
 const deleteUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    }else {
        res.status(404)
        throw new Error('User not found')
    }

});




// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})




// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
  
        const updatedUser = await user.save()
  
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


export {
    login,
    register,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}