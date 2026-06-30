import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User, Phone, Sparkles, KeyRound } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { activeModal, setActiveModal, login, register, t } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (activeModal !== 'login' && activeModal !== 'register') return null;

  const isLogin = activeModal === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please populate all fields.');
      return;
    }

    if (isLogin) {
      const res = login(email, password);
      if (res.success) {
        setSuccessMsg('Logged in successfully!');
        setTimeout(() => {
          setActiveModal(null);
          setSuccessMsg('');
          setEmail('');
          setPassword('');
        }, 800);
      } else {
        setErrorMsg(res.error || 'Invalid credentials.');
      }
    } else {
      if (!fullName || !phoneNumber) {
        setErrorMsg('Please populate all fields.');
        return;
      }
      const res = register(fullName, email, phoneNumber, password);
      if (res.success) {
        setSuccessMsg('Registered successfully! 500 ฿ bonus loaded.');
        setTimeout(() => {
          setActiveModal(null);
          setSuccessMsg('');
          setEmail('');
          setPassword('');
          setFullName('');
          setPhoneNumber('');
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setActiveModal(null);
            setErrorMsg('');
            setSuccessMsg('');
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-50 transition-colors"
          id="close-auth-modal-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title logo */}
        <div className="flex flex-col items-center justify-center text-center pb-5 border-b border-slate-50 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center text-lg font-black shadow-md shadow-amber-500/10 mb-2">
            GLO
          </div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            {isLogin ? t('btnLogin') : t('btnRegister')}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {isLogin ? 'Access your saved tickets and personal balance.' : 'Create an account to manage digital tickets securely.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Status Alert logs */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1">
              <Sparkles className="h-4 w-4 text-emerald-500 animate-pulse" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Registration Fields only */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-amber-500 outline-none"
                    id="reg-name-input"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., 0812345678"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-amber-500 outline-none"
                    id="reg-phone-input"
                  />
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </>
          )}

          {/* Email field */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., user@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-amber-500 outline-none"
                id="auth-email-input"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-amber-500 outline-none"
                id="auth-password-input"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors"
            id="auth-submit-btn"
          >
            {isLogin ? t('btnLogin') : t('btnRegister')}
          </button>
        </form>

        {/* Quick Toggler */}
        <div className="mt-5 pt-4 border-t border-slate-50 text-center">
          {isLogin ? (
            <p className="text-[11px] text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setActiveModal('register');
                  setErrorMsg('');
                }}
                className="text-amber-600 font-bold hover:underline"
                id="reg-toggle-btn"
              >
                Register Now
              </button>
            </p>
          ) : (
            <p className="text-[11px] text-slate-400">
              Already registered?{' '}
              <button
                onClick={() => {
                  setActiveModal('login');
                  setErrorMsg('');
                }}
                className="text-amber-600 font-bold hover:underline"
                id="login-toggle-btn"
              >
                Login here
              </button>
            </p>
          )}

          {/* Admin bypass hint */}
          <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-slate-400 bg-slate-50 p-2 rounded-lg">
            <KeyRound className="h-3.5 w-3.5 text-amber-500" />
            <span>Admin Login: <strong>admin@glo.gov</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
