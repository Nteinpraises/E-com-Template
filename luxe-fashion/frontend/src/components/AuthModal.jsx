import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export default function AuthModal() {
  const { authOpen, setAuthOpen, login, register, forgotPassword } = useApp();
  const [tab,         setTab]         = useState('login');
  const [forgot,      setForgot]      = useState(false);
  const [forgotSent,  setForgotSent]  = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [err,         setErr]         = useState('');
  const [form,        setForm]        = useState({ name:'', email:'', password:'' });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const reset = () => {
    setForm({ name:'', email:'', password:'' });
    setErr(''); setForgot(false); setForgotSent(false); setLoading(false);
  };

  const close = () => { setAuthOpen(false); reset(); };

  const handleLogin = async () => {
    if (!form.email || !form.password) { setErr('Please fill all fields'); return; }
    setLoading(true); setErr('');
    try {
      await login(form.email, form.password);
      reset();
    } catch (e) {
      setErr(e.response?.data?.message || 'Invalid email or password');
    } finally { setLoading(false); }
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) { setErr('Please fill all fields'); return; }
    if (form.password.length < 6) { setErr('Password must be at least 6 characters'); return; }
    setLoading(true); setErr('');
    try {
      await register(form.name, form.email, form.password);
      reset();
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const handleForgot = async () => {
    if (!form.email) { setErr('Enter your email address'); return; }
    setLoading(true); setErr('');
    try {
      await forgotPassword(form.email);
      setForgotSent(true);
    } catch (e) {
      setErr('Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  const fillDemo = (type) => {
    if (type === 'user')  setForm({ name:'', email:'user@luxe.com',  password:'user123'  });
    if (type === 'admin') setForm({ name:'', email:'admin@luxe.com', password:'admin123' });
    setErr('');
  };

  if (!authOpen) return null;

  return (
    <div className="modal-overlay open" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {/* HEAD */}
        <div className="modal-head">
          <div>
            <div className="modal-title">
              {forgot ? (forgotSent ? 'Check Your Email' : 'Reset Password') :
               tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </div>
            <div style={{ fontSize:13, color:'var(--grey)', marginTop:4 }}>LUXE Men's Fashion</div>
          </div>
          <button className="icon-btn" onClick={close}><Icon name="x" /></button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {!forgot ? (
            <>
              {/* TABS */}
              <div className="tabs">
                <div className={`tab ${tab === 'login' ? 'active' : ''}`}
                     onClick={() => { setTab('login'); setErr(''); }}>Sign In</div>
                <div className={`tab ${tab === 'register' ? 'active' : ''}`}
                     onClick={() => { setTab('register'); setErr(''); }}>Create Account</div>
              </div>

              {tab === 'register' && (
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input className="input-field" placeholder="John Doe" value={form.name} onChange={set('name')} />
                </div>
              )}
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
              </div>

              {err && (
                <div style={{ color:'var(--danger)', fontSize:13, marginBottom:12, background:'#FDEDEC', padding:'8px 12px', borderRadius:4 }}>
                  {err}
                </div>
              )}

              <button
                className="btn btn-primary btn-full btn-lg"
                onClick={tab === 'login' ? handleLogin : handleRegister}
                disabled={loading}
              >
                {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              {tab === 'login' && (
                <div style={{ textAlign:'center', marginTop:14 }}>
                  <span
                    style={{ fontSize:13, color:'var(--grey)', textDecoration:'underline', cursor:'pointer' }}
                    onClick={() => { setForgot(true); setErr(''); }}
                  >
                    Forgot your password?
                  </span>
                </div>
              )}

              <div className="divider">or use demo account</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <button className="btn btn-ghost" onClick={() => fillDemo('user')}>Demo User</button>
                <button className="btn btn-ghost" style={{ borderColor:'var(--accent)', color:'var(--accent)' }}
                        onClick={() => fillDemo('admin')}>Admin Demo</button>
              </div>
            </>
          ) : (
            <>
              {!forgotSent ? (
                <>
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
                  </div>
                  {err && (
                    <div style={{ color:'var(--danger)', fontSize:13, marginBottom:12, background:'#FDEDEC', padding:'8px 12px', borderRadius:4 }}>
                      {err}
                    </div>
                  )}
                  <button className="btn btn-primary btn-full btn-lg" onClick={handleForgot} disabled={loading}>
                    {loading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                  <div style={{ textAlign:'center', marginTop:14 }}>
                    <span style={{ fontSize:13, color:'var(--grey)', textDecoration:'underline', cursor:'pointer' }}
                          onClick={() => { setForgot(false); setErr(''); }}>
                      Back to sign in
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ textAlign:'center', padding:'20px 0' }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>📧</div>
                  <p style={{ fontSize:13, color:'var(--grey)', marginBottom:20, lineHeight:1.7 }}>
                    Check your inbox and click the link to reset your password.
                    If you don't see it, check your spam folder.
                  </p>
                  <button className="btn btn-primary btn-full" onClick={close}>Done</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}