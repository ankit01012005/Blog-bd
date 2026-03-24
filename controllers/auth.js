const User = require("../model/user")
const jwt = require("jsonwebtoken")

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    })
}

// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            })
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered.",
            })
        }

        // Create new user
        const user = new User({ name, email, password })
        await user.save()

        // Generate token
        const token = generateToken(user._id)

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Signup failed.",
            error: error.message,
        })
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            })
        }

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            })
        }

        // Check password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            })
        }

        // Generate token
        const token = generateToken(user._id)

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed.",
            error: error.message,
        })
    }
}

// LOGOUT
const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    })
}

module.exports = { signup, login, logout }
