import { useState } from 'react'
import Header from './Header'
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const BG_URL =
  'https://assets.nflxext.com/ffe/siteui/vlv3/76c5a455-c62c-46d4-8653-3924728113e3/web/IN-en-20260504-TRIFECTA-perspective_596176fe-3b1e-48ec-8a00-a0acb34e68f1_large.jpg';

const FIREBASE_ERRORS = {
  'auth/user-not-found':     'No account found with this email.',
  'auth/wrong-password':     'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/too-many-requests':  'Too many attempts. Please try again later.',
  'auth/invalid-email':      'Please enter a valid email address.',
  'auth/weak-password':      'Password should be at least 6 characters.',
  'auth/invalid-credential': 'Incorrect email or password.',
};

/* ── password rules ── */
const RULES = [
  { id: 'length',  label: 'At least 8 characters',        test: p => p.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter (A–Z)',    test: p => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'One lowercase letter (a–z)',    test: p => /[a-z]/.test(p) },
  { id: 'number',  label: 'One number (0–9)',              test: p => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$…)', test: p => /[^A-Za-z0-9]/.test(p) },
];

const getStrength = (password) => {
  if (!password) return null;
  const score = RULES.filter(r => r.test(password)).length;
  if (score <= 2) return { label: 'Weak',        bar: 'w-1/4', color: 'bg-red-500',    text: 'text-red-400'    };
  if (score === 3) return { label: 'Fair',        bar: 'w-2/4', color: 'bg-orange-400', text: 'text-orange-400' };
  if (score === 4) return { label: 'Strong',      bar: 'w-3/4', color: 'bg-blue-500',   text: 'text-blue-400'   };
  return              { label: 'Very Strong', bar: 'w-full', color: 'bg-green-500',  text: 'text-green-400'  };
};

/* ── field-level validators ── */
const validateName = v => {
  if (!v.trim()) return 'Full name is required.';
  if (v.trim().length < 2) return 'Name must be at least 2 characters.';
  if (/[0-9]/.test(v)) return 'Name cannot contain numbers.';
  return '';
};
const validateEmail = v => {
  if (!v.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
  return '';
};
const validatePassword = (v, isSignup) => {
  if (!v) return 'Password is required.';
  if (isSignup) {
    const failed = RULES.filter(r => !r.test(v));
    if (failed.length) return `Password missing: ${failed[0].label.toLowerCase()}.`;
  }
  return '';
};

/* ── small components ── */
const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

const FieldError = ({ msg }) =>
  msg ? (
    <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1">
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  ) : null;

const RuleRow = ({ passed, label }) => (
  <li className={`flex items-center gap-2 text-xs transition-colors ${passed ? 'text-green-400' : 'text-zinc-500'}`}>
    {passed ? (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    )}
    {label}
  </li>
);

/* ── main component ── */
const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [submitError, setSubmitError]   = useState('');
  const [loading, setLoading]           = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '' });

  const strength = isSignup ? getStrength(password) : null;

  const touch = (field, value) => {
    setTouched(t => ({ ...t, [field]: true }));
    let err = '';
    if (field === 'name')     err = validateName(value);
    if (field === 'email')    err = validateEmail(value);
    if (field === 'password') err = validatePassword(value, isSignup);
    setFieldErrors(e => ({ ...e, [field]: err }));
  };

  const switchMode = (toSignup) => {
    setIsSignup(toSignup);
    setSubmitError('');
    setName(''); setEmail(''); setPassword('');
    setShowPassword(false);
    setTouched({ name: false, email: false, password: false });
    setFieldErrors({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // force-touch all relevant fields before submitting
    const nameErr  = isSignup ? validateName(name) : '';
    const emailErr = validateEmail(email);
    const passErr  = validatePassword(password, isSignup);
    setTouched({ name: true, email: true, password: true });
    setFieldErrors({ name: nameErr, email: emailErr, password: passErr });
    if (nameErr || emailErr || passErr) return;

    setSubmitError('');
    setLoading(true);
    try {
      if (isSignup) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
          displayName: name.trim(),
          photoURL: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg',
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setSubmitError(FIREBASE_ERRORS[err.code] || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded px-4 py-4 text-white text-sm placeholder-zinc-400 outline-none transition-all ${
      touched[field] && fieldErrors[field]
        ? 'ring-2 ring-red-500/70'
        : 'focus:ring-2 focus:ring-white/25'
    }`;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Header />

      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG_URL} alt="" className="w-full h-full object-cover" style={{ opacity: 0.45 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      </div>

      {/* Form card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md rounded-md px-12 py-12" style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}>

          <h1 className="text-white text-3xl font-bold mb-7 tracking-tight">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h1>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

            {/* Name */}
            {isSignup && (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); if (touched.name) touch('name', e.target.value); }}
                  onBlur={e => touch('name', e.target.value)}
                  placeholder="Full Name"
                  autoComplete="name"
                  className={inputClass('name')}
                  style={{ backgroundColor: '#333' }}
                />
                <FieldError msg={touched.name ? fieldErrors.name : ''} />
              </div>
            )}

            {/* Email */}
            <div>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (touched.email) touch('email', e.target.value); }}
                onBlur={e => touch('email', e.target.value)}
                placeholder="Email or phone number"
                autoComplete="email"
                className={inputClass('email')}
                style={{ backgroundColor: '#333' }}
              />
              <FieldError msg={touched.email ? fieldErrors.email : ''} />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (touched.password) touch('password', e.target.value); }}
                  onBlur={e => touch('password', e.target.value)}
                  placeholder="Password"
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  className={`${inputClass('password')} pr-16`}
                  style={{ backgroundColor: '#333' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors select-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Strength bar — signup only */}
              {isSignup && password.length > 0 && strength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zinc-500 text-xs">Password strength</span>
                    <span className={`text-xs font-semibold ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.bar} ${strength.color}`} />
                  </div>
                </div>
              )}

              <FieldError msg={touched.password ? fieldErrors.password : ''} />

              {/* Rules checklist — signup only */}
              {isSignup && password.length > 0 && (
                <ul className="mt-3 space-y-1.5 pl-0.5">
                  {RULES.map(rule => (
                    <RuleRow key={rule.id} passed={rule.test(password)} label={rule.label} />
                  ))}
                </ul>
              )}
            </div>

            {/* Firebase / submit error */}
            {submitError && (
              <div className="flex items-start gap-2 bg-orange-900/30 border border-orange-500/40 rounded px-4 py-3">
                <svg className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <p className="text-orange-300 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-4 rounded mt-1 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: loading ? '#b0070f' : '#E50914' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#f40612'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#E50914'; }}
            >
              {loading && <Spinner />}
              {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Sign In'}
            </button>

            {/* Remember me / Need help — sign in only */}
            {!isSignup && (
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-zinc-400"
                  />
                  <span className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
                    Remember me
                  </span>
                </label>
                <button type="button" className="text-zinc-400 text-sm hover:text-zinc-300 hover:underline transition-colors">
                  Need help?
                </button>
              </div>
            )}
          </form>

          {/* Mode toggle */}
          <div className="mt-8">
            <p className="text-zinc-500 text-sm">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode(false)} className="text-white font-semibold hover:underline">
                    Sign in now.
                  </button>
                </>
              ) : (
                <>
                  New to Netflix?{' '}
                  <button type="button" onClick={() => switchMode(true)} className="text-white font-semibold hover:underline">
                    Sign up now.
                  </button>
                </>
              )}
            </p>
          </div>

          <p className="text-zinc-600 text-xs mt-4 leading-relaxed">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{' '}
            <button type="button" className="text-blue-600 hover:underline">Learn more.</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
