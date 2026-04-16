import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

export default function DashboardPage() {
  const { user, business, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (!business) { navigate('/setup'); return null }

  const products = (business.product_catalog || []) as any[]
  const faqs = (business.faq_list || []) as any[]
  const isActive = business.is_active
  const plan = business.plan

  const tabs = [
    { id: 'overview', label: '📊 Overview', path: '/dashboard' },
    { id: 'products', label: '📦 Produk', path: '/products' },
    { id: 'chats', label: '💬 Chats', path: '/chats' },
    { id: 'leads', label: '🏷️ Leads', path: '/leads' },
    { id: 'settings', label: '⚙️ Settings', path: '/settings' },
  ]

  const stats = [
    { label: 'Mesej Hari Ini', value: '47', icon: '💬', color: 'bg-blue-50 text-blue-600' },
    { label: 'Leads Baru', value: '12', icon: '🔥', color: 'bg-orange-50 text-orange-600' },
    { label: 'Order Hari Ini', value: '8', icon: '🛒', color: 'bg-green-50 text-green-600' },
    { label: 'Sales Hari Ini', value: 'RM1,240', icon: '💰', color: 'bg-yellow-50 text-yellow-600' },
  ]

  const recentChats = [
    { name: 'Abang Razak', message: 'Nak order 5 sak beras', tag: '🔥 Hot', time: '2 min' },
    { name: 'Kak Siti', message: 'Ada stok minyak masak?', tag: '🌡️ Warm', time: '15 min' },
    { name: 'Encik Tan', message: 'Harga gula berapa?', tag: '❄️ Cold', time: '1 jam' },
    { name: 'Sister Aisha', message: 'Boleh delivery hari Sabtu?', tag: '🔥 Hot', time: '2 jam' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-dark">{business.business_name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className={`flex items-center gap-1 ${isActive ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {isActive ? 'AI Aktif' : 'AI Off'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 capitalize">{plan} Plan</span>
              {business.islamic_mode && <><span className="text-gray-400">•</span><span className="text-green-600">🕌 Islamic Mode</span></>}
            </div>
          </div>
          <button onClick={async () => { await signOut(); navigate('/') }}
            className="text-gray-400 hover:text-gray-600 text-sm">Keluar</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex gap-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => navigate(tab.path)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 ${location.pathname === tab.path ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${s.color}`}>{s.icon}</span>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
              <div className="text-2xl font-bold text-dark">{s.value}</div>
            </div>
          ))}
        </div>

        {/* WhatsApp Connect */}
        {!business.whatsapp_number && (
          <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 mb-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-bold text-dark mb-2">Sambung WhatsApp Anda</h3>
            <p className="text-gray-500 text-sm mb-4">Scan QR code untuk sambung WhatsApp perniagaan. AI terus mula jawab pelanggan.</p>
            <button className="px-6 py-3 bg-accent hover:bg-accent-dark text-dark font-bold rounded-xl transition">
              Sambung WhatsApp 🚀
            </button>
            <p className="text-xs text-gray-400 mt-2">Coming soon — WhatsApp Business API integration</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Chats */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-dark">💬 Chat Terkini</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recentChats.map((chat, i) => (
                <div key={i} className="p-4 flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {chat.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-dark">{chat.name}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.message}</p>
                  </div>
                  <span className="text-xs">{chat.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-dark mb-3">📦 Katalog</h3>
              {products.length > 0 ? (
                <div className="space-y-2">
                  {products.slice(0, 5).map((p: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">{p.name}</span>
                      <span className="font-medium text-primary">{p.price}</span>
                    </div>
                  ))}
                  {products.length > 5 && <p className="text-xs text-gray-400">+{products.length - 5} lagi</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Tiada produk lagi. <button onClick={() => navigate('/products')} className="text-primary">Tambah sekarang</button></p>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-dark mb-3">🤖 AI Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Personaliti</span><span className="font-medium capitalize">{business.ai_personality}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Bahasa</span><span className="font-medium">{business.ai_language}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Islamic Mode</span><span className="font-medium">{business.islamic_mode ? '✅ On' : '❌ Off'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">FAQ</span><span className="font-medium">{faqs.length} soalan</span></div>
              </div>
              <button onClick={() => navigate('/settings')} className="mt-3 text-primary text-sm font-medium hover:underline">Tukar settings →</button>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-bold text-green-800 mb-1">💡 Tips</h3>
              <p className="text-sm text-green-700">Tambah lebih banyak produk dan FAQ supaya AI lebih pandai jual untuk anda!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
