import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setIsAuthenticated(true);

      // redirect only if user is on login/home/root
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/home') {
        if (role === 'student') {
          navigate('/dashboard', { replace: true });
        } else if (role === 'teacher') {
          navigate('/dashboardt', { replace: true });
        }
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
