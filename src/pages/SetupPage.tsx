import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SetupPage() {
  const { business, updateBusiness } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [personality, setPersonality] = useState(business?.ai_personality || 'friendly')
  const [language, setLanguage] = useState(business?.ai_language || 'bm_en')
  const [islamicMode, setIslamicMode] = useState(business?.islamic_mode || false)
  const [greeting, setGreeting] = useState(business?.greeting_message || '')
  const [products, setProducts] = useState<{ name: string; price: string; desc: string }[]>([{ name: '', price: '', desc: '' }])
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([{ q: '', a: '' }])
  const [saving, setSaving] = useState(false)

  const addProduct = () => setProducts([...products, { name: '', price: '', desc: '' }])
  const removeProduct = (i: number) => setProducts(products.filter((_, idx) => idx !== i))
  const updateProduct = (i: number, field: string, val: string) => {
    const updated = [...products]; updated[i] = { ...updated[i], [field]: val }; setProducts(updated)
  }

  const addFaq = () => setFaqs([...faqs, { q: '', a: '' }])
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i))
  const updateFaq = (i: number, field: string, val: string) => {
    const updated = [...faqs]; updated[i] = { ...updated[i], [field]: val }; setFaqs(updated)
  }

  const handleComplete = async () => {
    setSaving(true)
    await updateBusiness({
      ai_personality: personality,
      ai_language: language,
      islamic_mode: islamicMode,
      greeting_message: greeting,
      product_catalog: products.filter(p => p.name),
      faq_list: faqs.filter(f => f.q),
    })
    setSaving(false)
    navigate('/dashboard')
  }

  const personalities = [
    { id: 'friendly', label: '😊 Friendly & Casual', desc: 'Macam kawan chat, relax, guna emoji' },
    { id: 'professional', label: '💼 Professional', desc: 'Formal, teratur, business-like' },
    { id: 'persuasive', label: '🔥 Persuasive Sales', desc: 'Agresif jual, pushy sikit, urgency' },
    { id: 'islamic', label: '🕌 Islamic Business', desc: 'Sopan, tak push haram, berkat' },
  ]

  const languages = [
    { id: 'bm_en', label: '🇲🇾 BM + English' },
    { id: 'bm_en_zh', label: '🇲🇾 BM + English + 🇨🇳 Mandarin' },
    { id: 'bm_en_ar', label: '🇲🇾 BM + English + 🇸🇦 Arabic' },
    { id: 'all', label: '🌍 Semua 4 Bahasa' },
  ]

  return (
    <div className="min-h-screen bg-surface p-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full transition ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold mb-2">🤖 Personaliti AI Anda</h2>
            <p className="text-gray-500 mb-6">Macam mana AI anda bercakap dengan pelanggan?</p>
            <div className="space-y-3 mb-6">
              {personalities.map(p => (
                <button key={p.id} onClick={() => { setPersonality(p.id); if (p.id === 'islamic') setIslamicMode(true) }}
                  className={`w-full p-4 rounded-xl text-left transition border-2 ${personality === p.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'}`}>
                  <div className="font-bold">{p.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{p.desc}</div>
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bahasa</label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map(l => (
                  <button key={l.id} onClick={() => setLanguage(l.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition border-2 ${language === l.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Greeting Message (pilihan)</label>
              <textarea value={greeting} onChange={e => setGreeting(e.target.value)} rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder="Contoh: Assalamualaikum! Selamat datang ke Kedai Pak Ahmad. Ada apa boleh saya bantu? 😊" />
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition">
              Seterusnya →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold mb-2">📦 Katalog Produk</h2>
            <p className="text-gray-500 mb-6">Masukkan produk anda. AI akan hafal dan jual semuanya.</p>
            <div className="space-y-4 mb-6">
              {products.map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">Produk {i + 1}</span>
                    {products.length > 1 && (
                      <button onClick={() => removeProduct(i)} className="text-red-400 text-xs hover:text-red-600">Buang</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={p.name} onChange={e => updateProduct(i, 'name', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary outline-none" placeholder="Nama produk" />
                    <input value={p.price} onChange={e => updateProduct(i, 'price', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary outline-none" placeholder="Harga (RM28.90)" />
                  </div>
                  <input value={p.desc} onChange={e => updateProduct(i, 'desc', e.target.value)}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary outline-none" placeholder="Penerangan ringkas (pilihan)" />
                </div>
              ))}
            </div>
            <button onClick={addProduct} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition text-sm font-medium">
              + Tambah Produk
            </button>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">← Kembali</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition">Seterusnya →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold mb-2">❓ Soalan Lazim</h2>
            <p className="text-gray-500 mb-6">AI akan jawab soalan ni automatik. Tambah mana yang relevan.</p>
            <div className="space-y-4 mb-6">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">FAQ {i + 1}</span>
                    {faqs.length > 1 && (
                      <button onClick={() => removeFaq(i)} className="text-red-400 text-xs hover:text-red-600">Buang</button>
                    )}
                  </div>
                  <input value={f.q} onChange={e => updateFaq(i, 'q', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary outline-none mb-2" placeholder="Soalan (cth: Ada delivery?)" />
                  <input value={f.a} onChange={e => updateFaq(i, 'a', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary outline-none" placeholder="Jawapan (cth: Ya, delivery RM5 untuk kawasan 5km)" />
                </div>
              ))}
            </div>
            <button onClick={addFaq} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition text-sm font-medium">
              + Tambah FAQ
            </button>

            <div className="bg-green-50 rounded-xl p-4 mt-6">
              <h3 className="font-bold text-green-800 mb-2">✅ Siap! Apa yang berlaku sekarang:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• AI sudah tahu nama kedai, produk, dan harga anda</li>
                <li>• AI sudah tahu gaya cakap yang anda nak</li>
                <li>• AI sudah tahu jawapan FAQ</li>
                <li>• Sambung WhatsApp di dashboard, AI terus kerja!</li>
              </ul>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">← Kembali</button>
              <button onClick={handleComplete} disabled={saving}
                className="flex-1 py-3 bg-accent hover:bg-accent-dark text-dark rounded-xl font-bold transition disabled:opacity-50">
                {saving ? 'Menyimpan...' : 'Siap! Pergi Dashboard 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
