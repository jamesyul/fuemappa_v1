// --- FICHERO: backend/controllers/authController.js ---
import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const authController = {
  // ... (la función de login se mantiene igual) ...

  signup: async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }
    
    try {
      // Opcional: Verificar si el usuario ya existe
      const { data: existingUser } = await supabase.from('users').select('id').eq('email', email).single();
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }

      // IMPORTANTE: Hashear la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Crear el nuevo usuario en la tabla 'users'
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{ 
            email, 
            password: password_hash, // Guardamos el hash, no la contraseña original
            name, 
            role: 'integrante_departamento' // Rol por defecto
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);

      // Crear un token JWT para el nuevo usuario para que inicie sesión automáticamente
      const token = jwt.sign(
        { id: newUser.id, role: newUser.role, departmentId: newUser.departmentId },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      const { password: _, ...userResponse } = newUser;
      res.status(201).json({ user: userResponse, token });

    } catch (err) {
      res.status(500).json({ message: 'Server error during signup', details: err.message });
    }
  },
  
  // (La función de login va aquí)
  login: async (req, res) => {
    // ...
  }
};