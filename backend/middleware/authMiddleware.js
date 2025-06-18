import jwt from 'jsonwebtoken';

// Middleware para verificar el rol del usuario
export const checkRole = (roles) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Comprobamos si el rol del usuario está en la lista de roles permitidos
    if (roles.includes(decoded.role)) {
      req.user = decoded; // Opcional: añadimos los datos del usuario a la petición
      next(); // El usuario tiene el rol correcto, continuamos
    } else {
      // El usuario no tiene el rol necesario
      return res.status(403).json({ message: 'Acceso prohibido. Permisos insuficientes.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};