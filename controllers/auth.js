const User = require("../model/user")
const jwt = require("jsonwebtoken")

// Generate JWT Token
const generateToken = (userId) => {
    try {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
    } catch (error) {
        throw new Error("Failed to generate token")
    }
}

// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
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
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                createdAt: user.createdAt
            },
        })
    } catch (error) {
        console.error("Signup error:", error)
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
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            },
        })
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({
            success: false,
            message: "Login failed.",
            error: error.message,
        })
    }
}

// LOGOUT
const logout = (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        })
    } catch (error) {
        console.error("Logout error:", error)
        res.status(500).json({
            success: false,
            message: "Logout failed.",
            error: error.message,
        })
    }
}

module.exports = { signup, login, logout }
