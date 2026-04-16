import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const { signUp, signIn } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signup' | 'login'>('signup')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('kedai_runcit')

  const businessTypes = [
    { id: 'kedai_runcit', label: '🏪 Kedai Runcit', emoji: '🏪' },
    { id: 'restoran', label: '🍜 Restoran / Kafe', emoji: '🍜' },
    { id: 'fashion', label: '👗 Fashion / Pakaian', emoji: '👗' },
    { id: 'service', label: '🔧 Servis / Repair', emoji: '🔧' },
    { id: 'online', label: '📦 Online Shop', emoji: '📦' },
    { id: 'koperasi', label: '🏢 Koperasi', emoji: '🏢' },
    { id: 'pendidikan', label: '📚 Pendidikan / Training', emoji: '📚' },
    { id: 'lain', label: '🔵 Lain-lain', emoji: '🔵' },
  ]

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, name, businessName, businessType)
      navigate('/setup')
    } catch (err: any) {
      setError(err.message || 'Signup gagal')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 w-full max-w-md animate-fade-up shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🤖</div>
          <h1 className="text-2xl font-bold text-dark">{mode === 'signup' ? 'Daftar Perniagaan Anda' : 'Masuk ke Dashboard'}</h1>
          <p className="text-gray-500 text-sm mt-1">{mode === 'signup' ? '5 minit setup, AI terus kerja' : 'Selamat kembali!'}</p>
        </div>

        {mode === 'signup' ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Anda</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ahmad bin Ali" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perniagaan</label>
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Kedai Pak Ahmad" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Perniagaan</label>
              <div className="grid grid-cols-2 gap-2">
                {businessTypes.map(bt => (
                  <button key={bt.id} type="button" onClick={() => setBusinessType(bt.id)}
                    className={`p-2 rounded-xl text-xs font-medium transition text-left ${businessType === bt.id ? 'bg-primary/10 border-2 border-primary text-primary' : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'}`}>
                    {bt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="ahmad@kedai.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Min 6 karakter" />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition disabled:opacity-50">
              {loading ? 'Memproses...' : 'Daftar & Mula Percuma 🚀'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition disabled:opacity-50">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError('') }}
            className="text-primary hover:text-primary-dark text-sm font-medium">
            {mode === 'signup' ? 'Sudah ada akaun? Masuk' : 'Tiada akaun? Daftar'}
          </button>
        </div>
      </div>
    </div>
  )
}
