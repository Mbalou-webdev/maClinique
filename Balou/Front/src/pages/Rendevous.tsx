import React from 'react';
import AppointmentList from '../component/appointments/Appointments'

const RendezVous: React.FC = () => {
  return (
    <div>
      <h1>📆 Page des Rendez-vous</h1>
      <AppointmentList />
    </div>
  );
};

export default RendezVous;
