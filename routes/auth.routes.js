const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const { verifyToken } = require("../middlewares/auth.middlewares");

// =========================
// SIGNUP
// =========================
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validar campos
  if (!username || !email || !password) {
    return res.status(400).json({
      errorMessage: "Todos los campos son obligatorios",
    });
  }

  // Validar contraseña
  const regexPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (!regexPassword.test(password)) {
    return res.status(400).json({
      errorMessage:
        "La contraseña debe tener entre 8 y 16 caracteres, incluir un número y un carácter especial",
    });
  }

  try {
    // Verificar si email ya existe
    const foundByEmail = await User.findOne({ email });
    if (foundByEmail) {
      return res.status(400).json({
        errorMessage: "Ya existe un usuario con ese email",
      });
    }

    // Verificar si username ya existe
    const foundByUsername = await User.findOne({ username });
    if (foundByUsername) {
      return res.status(400).json({
        errorMessage: "Ese nombre de usuario ya está en uso",
      });
    }

    // Encriptar contraseña
    const hashPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,

      // IMPORTANTE
      role: "customer",
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",

      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // Validar campos
  if (!email || !password) {
    return res.status(400).json({
      errorMessage: "Todos los campos son obligatorios",
    });
  }

  try {
    // Buscar usuario
    const foundUser = await User.findOne({
      email,
    });

    if (!foundUser) {
      return res.status(400).json({
        errorMessage: "Usuario no registrado",
      });
    }

    // Comparar contraseña
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        errorMessage: "La contraseña no es válida",
      });
    }

    // Crear payload JWT
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };

    // Crear token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",

      expiresIn: "7d",
    });

    // Respuesta
    res.status(200).json({
      authToken,

      user: {
        _id: foundUser._id,

        username: foundUser.username,

        email: foundUser.email,

        role: foundUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// =========================
// VERIFY TOKEN
// =========================
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    payload: req.payload,
  });
});

module.exports = router;
