import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { login, logout, register } from '../../api/client';
import { Lock, LogIn, LogOut, Edit3, UserPlus } from 'lucide-react';

export const AdminControls = () => {
  const { isEditMode, toggleEditMode } = useContent();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      setUser(data.user);
      setShowLogin(false);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      const data = await register(username, password, email);
      setUser(data.user);
      setShowLogin(false);
      setIsRegistering(false);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    if (isEditMode) toggleEditMode();
  };

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowLogin(true)}
          className="fixed bottom-4 right-4 p-3 bg-gray-900/80 backdrop-blur text-white rounded-full shadow-xl border border-white/10 hover:bg-blue-600 transition-colors z-50"
        >
          <Lock size={20} />
        </button>

        {showLogin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-white/10 p-6 rounded-xl w-full max-w-sm shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
                {isRegistering ? 'Register' : 'Login'}
              </h2>
              <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                {isRegistering && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                  />
                  {isRegistering && <p className="text-xs text-gray-500 mt-1">Min 8 chars</p>}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex flex-col gap-4 mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    {isRegistering ? 'Create Account' : 'Login'}
                  </button>

                  <div className="flex justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {isRegistering ? 'Already have an account?' : 'Create an account'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLogin(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <div className="bg-gray-900/90 backdrop-blur border border-white/10 p-2 rounded-xl shadow-xl flex flex-col gap-2">
        <div className="text-xs text-gray-400 text-center mb-1">
          {user.username}
        </div>

        <button
          onClick={toggleEditMode}
          className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${isEditMode ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          title="Toggle Edit Mode"
        >
          <Edit3 size={20} />
          {isEditMode && <span className="text-sm font-bold">Editing On</span>}
        </button>

        <button
          onClick={handleLogout}
          className="p-3 bg-gray-800 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};
