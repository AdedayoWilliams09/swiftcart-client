import React from 'react';

const AdminTable = ({ columns, data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col} className="px-4 py-2 border-b">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td key={col} className="px-4 py-2 border-b">{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminTable;