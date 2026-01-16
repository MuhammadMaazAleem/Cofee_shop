import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state: any) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err: any) {
            alert(err?.data?.message || err.error);
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-12 bg-secondary-latte flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-serif font-bold text-primary-espresso mb-6 text-center">Sign In</h1>
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none" 
                          placeholder="you@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                      className="w-full bg-primary-espresso text-white py-3 rounded-lg font-bold hover:bg-primary-brown transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div className="text-center text-sm text-gray-500">
                        Don't have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-accent-gold font-bold cursor-pointer hover:underline">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
