import Papa from 'papaparse';
import axios from 'axios';

// Función MEJORADA: Acepta más formatos de URL de Google Drive
const getGoogleDriveDirectLink = (url) => {
  let fileId = null;
  
  // Intenta extraer el ID del formato de compartición: /file/d/FILE_ID/view...
  let match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    fileId = match[1];
  } else {
    // Intenta extraer el ID del formato de la vista de Google Sheets: /spreadsheets/d/FILE_ID/edit...
    match = url.match(/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const sheetId = match[1];
      // Para Google Sheets, la URL de descarga es diferente
      return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    }
  }

  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  return null; // Devuelve null si no se pudo extraer un ID válido
};


export const analyzerController = {
  processCsvFromUrl: async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'Se requiere una URL.' });
    }

    const directUrl = getGoogleDriveDirectLink(url);
    if (!directUrl) {
        return res.status(400).json({ message: 'La URL de Google Drive proporcionada no es válida. Asegúrate de que sea un enlace para compartir un fichero o una hoja de cálculo.' });
    }
    
    try {
      const response = await axios.get(directUrl, {
        // Añadir cabecera para simular un navegador, a veces ayuda con G-Drive
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
      });
      const csvText = response.data;

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            return res.status(500).json({ message: 'Error al parsear el CSV', details: results.errors });
          }
          res.status(200).json(results.data);
        },
        error: (error) => {
            res.status(500).json({ message: 'Error en el parseo del CSV', details: error.message });
        }
      });

    } catch (error) {
      console.error('Error procesando la URL del CSV:', error);
      res.status(500).json({ message: 'Error del servidor al procesar el fichero CSV. Verifica que los permisos de compartición son correctos ("Cualquier persona con el enlace").', details: error.message });
    }
  },
};