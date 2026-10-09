import { useLogout } from '../../hooks/auth/useLogout';

const LogoutButton = () => {
  const { isLoading, handleLogout } = useLogout();

  return (
    <button onClick={handleLogout} disabled={isLoading} className='bg-yellow-400 text-black px-4 py-1 rounded font-semibold cursor-pointer'>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
