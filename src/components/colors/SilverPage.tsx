import React from 'react';
import { useNavigate } from 'react-router-dom';

const SilverPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/colors/silver');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto"></div>
        <p className="mt-4 text-stone-600">Redirecting to Silver page...</p>
      </div>
    </div>
  );
};

export default SilverPage;
