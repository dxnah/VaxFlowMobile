import { useEffect, useState } from 'react';

export function useDashboardData() {
  const [patientCount, setPatientCount] = useState(0);
  const [capacity] = useState(160);
  const [isPeakSeason, setIsPeakSeason] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Never');

  useEffect(() => {
    const month = new Date().getMonth();
    setIsPeakSeason([5, 6, 7].includes(month)); // June, July, August
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  return {
    patientCount,
    capacity,
    isPeakSeason,
    lastUpdated,
    setPatientCount,
    setLastUpdated,
  };
}