import React from 'react';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'sonner';

const ReservationPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <h1>Réservation</h1>
        <p>Vous devez être connecté pour voir cette page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Réservation</h1>
      <p>Bienvenue, {user.email} !</p>
    </div>
  );
};

export default ReservationPage;
