import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/colors/red');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-stone-600">Redirecting to Red page...</p>
      </div>
    </div>
  );
};

export default RedPage;
