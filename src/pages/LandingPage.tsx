import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const { user, business } = useAuth()
  const navigate = useNavigate()

  if (user) {
    navigate(business ? '/dashboard' : '/setup')
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              AI yang bekerja 24/7 untuk perniagaan anda
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              WhatsApp AI Salesman<br />
              <span className="text-primary">Siap Guna. Zero Belajar.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Sambung WhatsApp, upload produk, AI terus jual untuk anda. Balas pelanggan, follow up, tutup jualan — semua automatik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-accent hover:bg-accent-dark text-dark font-bold rounded-xl text-lg transition shadow-lg hover:shadow-xl">
                Mula Percuma 🚀
              </button>
              <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-lg transition border border-white/20">
                Lihat Demo ▶️
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">14 hari percuma. Tanpa kad kredit.</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">3 Langkah. 5 Minit. Siap.</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Tiada kelas. Tiada training. Hanya sambung dan biar AI buat kerja.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '📱', title: 'Sambung WhatsApp', desc: 'Scan QR code, WhatsApp perniagaan anda terus connect dengan AI' },
              { step: '2', icon: '📦', title: 'Upload Produk', desc: 'Masukkan nama produk, harga, gambar. AI hafal semua.' },
              { step: '3', icon: '🤖', title: 'AI Mula Kerja', desc: 'Auto-reply, follow up, tag leads, alert boss. 24/7.' },
            ].map(item => (
              <div key={item.step} className="text-center p-8 rounded-2xl bg-surface border border-gray-100 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{item.icon}</div>
                <div className="text-sm font-bold text-primary mb-2">LANGKAH {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">AI Yang Bukan Sekadar Chatbot</h2>
          <p className="text-gray-500 text-center mb-12">Dia jual. Dia follow up. Dia tutup deal.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💬', title: 'AI Auto-Reply', desc: 'Balas setiap mesej dalam 3 saat. Pelanggan tak perlu tunggu.' },
              { icon: '🛒', title: 'AI Jual Produk', desc: 'Cadang produk, terima order, hantar invoice — semua automatik.' },
              { icon: '🔄', title: 'AI Follow Up', desc: 'Follow up lead yang tak reply. 1 hari, 3 hari, 7 hari — auto.' },
              { icon: '🏷️', title: 'AI Tag Leads', desc: 'Auto categorise: Hot 🔥, Warm 🌡️, Cold ❄️. Tahu siapa perlu dikejar.' },
              { icon: '🔔', title: 'Boss Alert', desc: 'Notifikasi segera bila ada hot lead atau order besar masuk.' },
              { icon: '📊', title: 'Dashboard Live', desc: 'Siapa chat, siapa beli, berapa sales — semua nampak real-time.' },
              { icon: '🕌', title: 'Islamic Mode', desc: 'AI tak push haram, tak hard-sell waktu solat, ingatkan zakat. Pilihan.' },
              { icon: '🗣️', title: '4 Bahasa', desc: 'BM, English, Mandarin, Arab. Auto-detect bahasa pelanggan.' },
              { icon: '📈', title: 'AI Insights', desc: 'Produk paling laris, waktu paling ramai, conversion rate — AI analisa.' },
            ].map(f => (
              <div key={f.title} className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Lihat AI Bekerja</h2>
          <div className="bg-dark rounded-2xl p-4 md:p-6 max-w-sm mx-auto">
            <div className="bg-[#075e54] rounded-xl p-3 text-white text-sm font-medium mb-4">
              📱 Kedai Pak Ahmad
            </div>
            <div className="space-y-3">
              {/* Customer message */}
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-xl rounded-tr-none px-4 py-2 text-sm max-w-[80%]">
                  Hai, ada stok beras 10kg?
                </div>
              </div>
              {/* AI reply */}
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-sm">
                  Waalaikumussalam! 😊 Ya, kami ada beras 10kg jenama Cap Rambutan. Harga RM28.90/sak. Nak berapa sak?
                </div>
              </div>
              {/* Customer */}
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-xl rounded-tr-none px-4 py-2 text-sm max-w-[80%]">
                  2 sak boleh? Harga lagi murah tak?
                </div>
              </div>
              {/* AI reply */}
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-sm">
                  2 sak boleh! 🎉 Kalau ambil 2 sak, harga RM27.90/sak jek — jimat RM2! Total RM55.80. Nak saya hantar invoice?
                </div>
              </div>
              {/* Customer */}
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-xl rounded-tr-none px-4 py-2 text-sm max-w-[80%]">
                  Ok boleh!
                </div>
              </div>
              {/* AI reply */}
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-sm">
                  Baik! 🧾 Invoice dihantar. Boleh bayar via FPX/TNG. Alamat penghantaran kat mana ya?
                  <div className="mt-1 text-[10px] text-gray-400">🤖 AI Salesman • Tagged: 🔥 Hot Lead</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 gradient-hero text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Harga Berani Murah</h2>
          <p className="text-gray-300 text-center mb-12">Lebih murah dari gaji staff. Lebih rajin dari staff. Tak cuti.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'AI Salesman', price: '99', period: '/bulan', features: ['Auto-reply 24/7', 'Jual produk automatik', 'AI Tag Leads', 'Boss Alert', 'Dashboard Live', '3 bahasa'], popular: false },
              { name: 'AI Marketing', price: '149', period: '/bulan', features: ['Semua Salesman +', 'WhatsApp Blast', 'Auto Follow Up', 'Promo Campaigns', '4 bahasa', 'AI Insights'], popular: true },
              { name: 'All-in-One', price: '199', period: '/bulan', features: ['Semua Marketing +', 'Islamic Mode', 'Arabic language', 'Multi-number', 'Priority support', 'API access'], popular: false },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.popular ? 'bg-primary ring-4 ring-accent scale-105' : 'bg-white/10 border border-white/20'}`}>
                {plan.popular && <div className="text-center mb-4"><span className="bg-accent text-dark text-xs font-bold px-3 py-1 rounded-full">PALING POPULAR</span></div>}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">RM{plan.price}</span>
                  <span className="text-gray-300 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/signup')} className={`w-full py-3 rounded-xl font-bold transition ${plan.popular ? 'bg-accent hover:bg-accent-dark text-dark' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}>
                  Mula Percuma
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Berhenti Ketinggalan Pelanggan</h2>
          <p className="text-gray-500 mb-8">Setiap minit anda tak reply, pelanggan pergi kat competitor. Biar AI jaga.</p>
          <button onClick={() => navigate('/signup')} className="px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-lg transition shadow-lg">
            Mula Sekarang — Percuma 14 Hari 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-gray-400 py-8 text-center text-sm">
        <p>© 2026 AI Salesman by VibeCoderLab.ai — WhatsApp AI untuk peniaga Malaysia</p>
      </footer>
    </div>
  )
}
