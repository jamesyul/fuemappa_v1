import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { processCsvUrl } from '../services/analyzer.service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Configuración para el dashboard de gráficos (se mantiene)
const metricsToPlot = [
  { dataKey: 'Speed', unit: 'km/h', stroke: '#3b82f6', type: 'monotone' }, // Azul
  { dataKey: 'Throttle', unit: '%', stroke: '#10b981', type: 'step' },      // Verde
  { dataKey: 'Brake', unit: ' (0/1)', stroke: '#ef4444', type: 'step' },    // Rojo
  { dataKey: 'RPM', unit: '', stroke: '#f59e0b', type: 'monotone' },        // Ámbar
];

const DataAnalyzer: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // La lógica de seguridad y de procesamiento de datos no cambia
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
    try {
      const parsedData = await processCsvUrl(url);
      if (parsedData && Array.isArray(parsedData) && parsedData.length > 0) {
        setData(parsedData);
      } else {
        setError('El CSV está vacío o tiene un formato no válido.');
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
    doc.text("Reporte de Telemetría", 14, 15);
    autoTable(doc, {
      head: [Object.keys(data[0])],
      body: data.map(row => Object.values(row)),
      startY: 20,
    });
    doc.save("reporte_telemetria.pdf");
  };

  const generateExcel = () => {
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Telemetría");
    XLSX.writeFile(workbook, "reporte_telemetria.xlsx");
  };

  if (!user || !['admin', 'jefe_departamento'].includes(user.role)) {
    return null;
  }

  // --- JSX CON EL ESTILO CLARO Y CONSISTENTE ---
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analizador de Telemetría</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Introduce la URL del CSV de telemetría de Google Drive"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
          <button
            onClick={handleProcessUrl}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 w-full sm:w-auto disabled:bg-indigo-300"
          >
            {isLoading ? 'Procesando...' : 'Cargar Datos'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button onClick={generatePdf} disabled={data.length === 0} className="bg-white p-4 rounded-lg shadow-md text-center font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Generar Reporte PDF
        </button>
        <button onClick={generateExcel} disabled={data.length === 0} className="bg-white p-4 rounded-lg shadow-md text-center font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Generar Reporte Excel
        </button>
      </div>

      {data.length > 0 && (
        <div className="space-y-8">
          {metricsToPlot.map((metric) => (
            // Cada gráfico irá en su propia tarjeta blanca
            <div key={metric.dataKey} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{metric.dataKey}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} syncId="telemetrySync" margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Time" stroke="#6b7280" label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -15 }} />
                  <YAxis stroke="#6b7280" label={{ value: metric.unit, angle: -90, position: 'insideLeft', offset: 10 }}/>
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                  <Legend />
                  <Line
                    // @ts-ignore
                    type={metric.type}
                    dataKey={metric.dataKey}
                    stroke={metric.stroke}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataAnalyzer;