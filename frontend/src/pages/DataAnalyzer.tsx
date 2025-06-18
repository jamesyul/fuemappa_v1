import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { processCsvUrl } from '../services/analyzer.service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const DataAnalyzer: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [data, setData] = useState<any[]>([]);
  // --- NUEVOS ESTADOS ---
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  // --- FIN NUEVOS ESTADOS ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !['admin', 'jefe_departamento'].includes(user.role)) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleProcessUrl = async () => {
    if (!url) {
      setError('Por favor, introduce una URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setData([]);
    setHeaders([]);
    setSelectedMetric('');
    try {
      const parsedData = await processCsvUrl(url);
      if (parsedData.length > 0) {
        setData(parsedData);
        // --- LÓGICA MEJORADA: Obtener cabeceras y seleccionar la primera métrica ---
        const availableHeaders = Object.keys(parsedData[0]).filter(h => h !== 'timestamp'); // Excluimos el timestamp de las métricas a graficar
        setHeaders(availableHeaders);
        if (availableHeaders.length > 0) {
          setSelectedMetric(availableHeaders[0]); // Seleccionamos la primera por defecto
        }
      } else {
        setError('El CSV está vacío o no se pudo procesar.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al procesar el CSV.');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePdf = () => {
    if (data.length === 0) return;
    const doc = new jsPDF();
    const tableHeaders = Object.keys(data[0]);
    const tableBody = data.map(row => tableHeaders.map(header => row[header]));

    (doc as any).autoTable({
      head: [tableHeaders],
      body: tableBody,
      startY: 20,
    });
    doc.text("Reporte de Datos CSV", 14, 15);
    doc.save("reporte_csv.pdf");
  };

  const generateExcel = () => {
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "reporte_csv.xlsx");
  };

  if (!user || !['admin', 'jefe_departamento'].includes(user.role)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analizador de Datos CSV</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Introduce la URL del CSV de Google Drive"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
          />
          <button
            onClick={handleProcessUrl}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 w-full sm:w-auto disabled:bg-indigo-300"
          >
            {isLoading ? 'Procesando...' : 'Adjuntar CSV'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Cambié el botón de Visualizar por el selector de métrica */}
        <div className="bg-white p-4 rounded-lg shadow-md">
            <label htmlFor="metric-select" className="block text-sm font-medium text-gray-700">Visualizar Métrica</label>
            <select
                id="metric-select"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                disabled={data.length === 0}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:opacity-50"
            >
                {headers.map(header => <option key={header} value={header}>{header}</option>)}
            </select>
        </div>
        <button onClick={generatePdf} disabled={data.length === 0} className="bg-white p-4 rounded-lg shadow-md text-center font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Generar PDF Report</button>
        <button onClick={generateExcel} disabled={data.length === 0} className="bg-white p-4 rounded-lg shadow-md text-center font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Generar Excel</button>
      </div>

      {data.length > 0 && selectedMetric && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Visualización de: {selectedMetric}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* --- GRÁFICO MEJORADO: La clave de datos es ahora dinámica --- */}
              <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" name={selectedMetric} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DataAnalyzer;