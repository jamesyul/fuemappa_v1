// --- FICHERO: backend/controllers/authController.js ---
import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const authController = {
  // --- REGISTRO DE USUARIO ---
  signup: async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    try {
      const { data: existingUser } = await supabase.from('users').select('id').eq('email', email).single();
      if (existingUser) {
        return res.status(409).json({ message: 'Ya existe un usuario con este email' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{
            email,
            password: hashedPassword, // Ahora esto funcionará porque la columna existe
            name,
            role: 'integrante_departamento'
        }])
        .select('id, name, email, role, departmentId')
        .single();

      if (error) throw error;

      const token = jwt.sign(
        { id: newUser.id, role: newUser.role, departmentId: newUser.departmentId },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
      
      res.status(201).json({ user: newUser, token });

    } catch (err) {
      console.error('Signup Error:', err.message);
      res.status(500).json({ message: 'Error del servidor durante el registro', details: err.message });
    }
  },

  // --- INICIO DE SESIÓN ---
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const { data: user, error } = await supabase.from('users').select('*').eq('email', email).single();
      if (error || !user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password); // Compara con la columna 'password'
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, departmentId: user.departmentId },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
      
      const { password: _, ...userResponse } = user;
      res.status(200).json({ user: userResponse, token });

    } catch (err) {
      console.error('Login Error:', err.message);
      res.status(500).json({ message: 'Error del servidor durante el login', details: err.message });
    }
  },
};