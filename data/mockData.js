// data/mockData.js

export const vaccineData = [
  { id: 1, vaccine: 'BCG',         available: 150, status: 'In Stock'  },
  { id: 2, vaccine: 'Hepatitis B', available: 40,  status: 'Low Stock' },
  { id: 3, vaccine: 'Polio (OPV)', available: 0,   status: 'Out Stock' },
  { id: 4, vaccine: 'DPT',         available: 200, status: 'In Stock'  },
  { id: 5, vaccine: 'MMR',         available: 25,  status: 'Low Stock' },
  { id: 6, vaccine: 'Varicella',   available: 0,   status: 'Out Stock' },
];

export const announcements = [
  { id: 1, title: '🔥 Peak Season Alert',   message: 'March–May requires 1.5× more vaccines. Please schedule early.' },
  { id: 2, title: '💉 New Stock Arriving',  message: 'Polio and Varicella restock expected within 7 days.' },
  { id: 3, title: '📋 Reminder',            message: 'Please bring your vaccination booklet on your next visit.' },
];

export const users = [
  { id: 1, username: 'patient1', password: 'pass123',    name: 'Juan Dela Cruz',    role: 'patient' },
  { id: 2, username: 'patient2', password: 'pass456',    name: 'Maria Santos',      role: 'patient' },
  { id: 3, username: 'patient3', password: 'pass789',    name: 'Jose Reyes',        role: 'patient' },
];

export const vaccinationRecords = [
  { id: 1, vaccine: 'Anti-Rabies Vaccine (ARV)', dose: '1st Dose', date: 'January 15, 2025', facility: 'ABTC - City Health Office', administered: 'Dr. Santos',  color: '#e53935', cardImage: null },
  { id: 2, vaccine: 'Anti-Rabies Vaccine (ARV)', dose: '2nd Dose', date: 'January 22, 2025', facility: 'ABTC - City Health Office', administered: 'Dr. Santos',  color: '#e53935', cardImage: null },
  { id: 3, vaccine: 'BCG',                       dose: '1st Dose', date: 'March 3, 2025',    facility: 'City Health Office, CDO',  administered: 'Nurse Reyes', color: '#1e88e5', cardImage: null },
  { id: 4, vaccine: 'Hepatitis B',               dose: '1st Dose', date: 'March 10, 2025',   facility: 'City Health Office, CDO',  administered: 'Nurse Cruz',  color: '#f57c00', cardImage: null },
];