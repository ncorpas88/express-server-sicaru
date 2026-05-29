const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Verificar si existe header
    if (!authHeader) {
      return res.status(401).json({
        errorMessage: "Token no proporcionado",
      });
    }

    // Verificar formato Bearer
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        errorMessage: "Formato de token inválido",
      });
    }

    // Obtener token
    const token = authHeader.split(" ")[1];

    // Verificar token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Guardar payload
    req.payload = payload;

    next();
  } catch (error) {
    res.status(401).json({
      errorMessage: "Token inválido o expirado",
    });
  }
}

function verifyAdmin(req, res, next) {
  // Verificar si es admin
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(403).json({
      errorMessage: "Acceso denegado: solo administradores",
    });
  }
}

module.exports = {
  verifyToken,
  verifyAdmin,
};
