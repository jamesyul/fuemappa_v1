// --- FICHERO: backend/controllers/authController.js ---
import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const authController = {
  signup: async (req, res) => {
    const { email, password, name, invitationCode } = req.body;

    if (!email || !password || !name || !invitationCode) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
      // CORRECCIÓN: Limpiamos y preparamos el código de invitación
      const cleanInvitationCode = invitationCode.trim();
      console.log(`Searching for invitation code: "${cleanInvitationCode}"`); // Para depuración

      // Usamos .ilike() para una búsqueda case-insensitive y con el código limpio
      const { data: codeData, error: codeError } = await supabase
        .from('invitation_codes')
        .select('*')
        .eq('code', cleanInvitationCode) // <-- AHORA BUSCA EL CÓDIGO LIMPIO
        .single();

      if (codeError || !codeData) {
        return res.status(404).json({ message: 'El código de invitación no es válido' });
      }
      if (codeData.is_used) {
        return res.status(410).json({ message: 'Este código de invitación ya ha sido utilizado' });
      }

      // ... (El resto del código de la función se mantiene igual)
      // 2. Verificar si el usuario ya existe...
      const { data: existingUser } = await supabase.from('users').select('id').eq('email', email).single();
      if (existingUser) {
        return res.status(409).json({ message: 'Ya existe un usuario con este email' });
      }

      // 3. Hashear la contraseña...
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 4. Crear el nuevo usuario...
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
            email,
            password: hashedPassword,
            name,
            role: codeData.role,
            departmentId: codeData.departmentId
        }])
        .select('id, name, email, role, departmentId')
        .single();
      if (insertError) throw insertError;
      
      // 5. Marcar el código como usado...
      await supabase.from('invitation_codes').update({ is_used: true }).eq('id', codeData.id);

      // 6. Crear el token JWT...
      const token = jwt.sign(
        { id: newUser.id, role: newUser.role, departmentId: newUser.departmentId },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.status(201).json({ user: newUser, token });

    } catch (err) {
      console.error('>>> SIGNUP ERROR:', err);
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

  // --- AÑADIR ESTA NUEVA FUNCIÓN ---
  getProfile: async (req, res) => {
    // El middleware checkRole ya ha decodificado el token y añadido req.user
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, role, departmentId')
        .eq('id', req.user.id)
        .single();

      if (error || !user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error('Get Profile Error:', err.message);
      res.status(500).json({ message: 'Error del servidor al obtener el perfil.' });
    }
  },
};