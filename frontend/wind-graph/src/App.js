import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import api from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const parseNumber = (num) => parseFloat(num.replace(',', '.'));
const parseDate = (dateStr) => new Date(dateStr.replace(',', ''));

const App = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2016-01-01')); 
  const [endDate, setEndDate] = useState(new Date('2016-01-02'));     
  const [turbineId, setTurbineId] = useState('Turbine1');

  const fetchData = useCallback(async () => {

    const response = await api.get('/data', {
      params: {
        turbine_id: turbineId,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      },
    });

    const formattedData = response.data.map(item => ({
      ...item,
      'Dat/Zeit': parseDate(item['Dat/Zeit']),
      'Wind': parseNumber(item['Wind']),
      'Leistung': parseNumber(item['Leistung']),
    }));
    
    setData(formattedData);
  }, [turbineId, startDate, endDate]);

  useEffect(() => {
    fetchData();    
  }, [fetchData]);

  
  return (
    <div className="container">
      <h1>Turbine Data Visualization</h1>
      
      <div style={{ display: "flex", gap: "1em"}}>
        <div style={{ display: "flex", gap: ".3em"}}>
          <label>Turbine ID:</label>
          <select value={turbineId} onChange={(e) => setTurbineId(e.target.value)}>
            <option value="Turbine1">Turbine1</option>
            <option value="Turbine2">Turbine2</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: ".3em"}}>
          <label>Start Date:</label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            showTimeSelect 
            dateFormat="dd MMM yyyy h:mm aa"
          />
        </div>

        <div style={{ display: "flex", gap: ".3em"}}>
          <label>End Date:</label>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            showTimeSelect 
            dateFormat="dd MMM yyyy h:mm aa"
          />
        </div>
      </div>

      <ResponsiveContainer width="90%" height={400} style={{ marginTop: '2em'}}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="Wind" name="Wind Speed" unit="m/s" style={{ fontSize: "14px", color: "#0d0d0d"}}/>
          <YAxis type="number" dataKey="Leistung" name="Power" unit="kW" domain={[0, 'auto']} style={{ fontSize: "14px", color: "#0d0d0d"}} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />                  
          <Scatter name="Power curve plot" data={data} fill="#800040" />
        </ScatterChart>    
      </ResponsiveContainer>
    </div>
  )

}

export default App;

