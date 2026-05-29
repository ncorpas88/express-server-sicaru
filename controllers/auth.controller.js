const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      })
    }

    const foundUser = await User.findOne({ email })

    if (foundUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Password incorrecto",
      })
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    }

    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    )

    res.status(200).json({
      authToken,
    })
  } catch (error) {
    next(error)
  }
}