import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export default function ResetPasswordPage() {
  const { token }  = useParams();
  const navigate   = useNavigate();
  const [password, setPassword]   = useState('');
  const [confirm,  setConfirm]    = useState('');
  const [loading,  setLoading]    = useState(false);
  const [done,     setDone]       = useState(false);
  const [err,      setErr]        = useState('');

  const submit = async () => {
    if (!password || !confirm) { setErr('Please fill both fields'); return; }
    if (password.length < 6)   { setErr('Password must be at least 6 characters'); return; }
    if (password !== confirm)  { setErr('Passwords do not match'); return; }

    setLoading(true); setErr('');
    try {
      await axios.put(`${API}/auth/reset-password/${token}`, { password });
      setDone(true);
    } catch (e) {
      setErr(e.response?.data?.message || 'Invalid or expired link. Please request a new one.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'var(--white)', borderRadius:12, padding:'40px 36px', width:'100%', maxWidth:420, boxShadow:'var(--shadow2)', border:'1px solid var(--cream3)' }}>

        {!done ? (
          <>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:28, marginBottom:6 }}>
              Set New Password
            </div>
            <div style={{ fontSize:13, color:'var(--grey)', marginBottom:28 }}>
              Choose a strong password for your LUXE account.
            </div>

            <div className="input-group">
              <label className="input-label">New Password</label>
              <input
                className="input-field"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                className="input-field"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
            </div>

            {err && (
              <div style={{ color:'var(--danger)', fontSize:13, marginBottom:16, background:'#FDEDEC', padding:'8px 12px', borderRadius:4 }}>
                {err}
              </div>
            )}

            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={submit}
              disabled={loading}
            >
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </>
        ) : (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:26, marginBottom:10 }}>
              Password Reset!
            </div>
            <div style={{ fontSize:13, color:'var(--grey)', marginBottom:24 }}>
              Your password has been changed successfully. You can now sign in with your new password.
            </div>
            <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}