import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/AuthSlice';


const useAuth = (allowedRoles) => {
  const user = useSelector(selectCurrentUser);
  if (!user) return false; // Not authenticated

  const { role} = user;
  return allowedRoles.includes(role) 
};

export default useAuth;
