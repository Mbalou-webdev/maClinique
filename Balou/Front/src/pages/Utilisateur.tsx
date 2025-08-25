import React from 'react';
import UtilisateurList from '../component/inscriptions/Inscriptions';

const Utilisateur: React.FC = () => {
  return (
    <div>
      <h1>👥 Page des Utilisateurs</h1>
      <UtilisateurList />
    </div>
  );
};

export default Utilisateur;