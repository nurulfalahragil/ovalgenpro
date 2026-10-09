import React, { useState, useEffect } from 'react';

// Standalone SVG Icons
const Icons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>,
  Image: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Video: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>,
  History: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Wand: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Alert: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Mic: () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>,
  Clapper: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.4-1.1.2-2.4 1.3-2.8l13.7-4.9c1.1-.4 2.4.2 2.8 1.3z"></path><path d="m6.2 5.3 3.1 4.7"></path><path d="m12.2 3.1 3.1 4.7"></path><path d="M3 11h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
};

const OPTIONS = {
  backgrounds: [
    "Ikuti deskripsi prompt", "Studio profesional", "Kamar tidur minimalis", "Ruang tamu elegan",
    "Dapur modern", "Kamar mandi mewah", "Kafe estetik", "Toko/Butik premium",
    "Meja kantor", "Outdoor alam", "Taman bunga", "Pantai tropis",
    "Jalan perkotaan (Street style)", "Latar putih polos (E-commerce)", "Latar gelap premium"
  ],
  angles: [
    "Eye-level", "Low angle", "High angle", "Bird's-eye view", "Top-down",
    "Close-up", "Extreme close-up", "Medium shot", "Medium close-up",
    "Wide shot", "Over-the-shoulder", "Side profile", "Mirror reflection", "POV"
  ],
  styles: [
    "Storyboard", "UGC (Natural & Autentik)", "Mirror Check", "POV Experience", "Testimonial",
    "Unboxing", "Before & After", "Product Showcase", "Lifestyle", "Flat Lay",
    "Cinematic Commercial", "Editorial Fashion", "Beauty Campaign", "Mirror Selfie",
    "Get Ready With Me (GRWM)", "Product Close-up", "Influencer Review", "Premium Minimalist"
  ],
  ratios: [
    { label: "9:16 (Story/Reels/TikTok)", value: "9:16" },
    { label: "1:1 (Square Feed)", value: "1:1" },
    { label: "16:9 (Landscape YouTube)", value: "16:9" },
    { label: "4:5 (Portrait Feed)", value: "4:5" },
    { label: "3:4 (Portrait Photo)", value: "3:4" }
  ],
  durations: ["10", "15", "20", "30"],
  storyboardStyles: ["Lifestyle (Keseharian)", "Unboxing", "Before & After", "Testimonial", "Tutorial / How-to", "Product Showcase", "Cinematic Scene"],
  storyboardGrids: ["2 Panel (Atas Bawah 1x2)", "2 Panel (Kiri Kanan 2x1)", "3 Panel (Grid 3x1)", "4 Panel (Grid 2x2)", "6 Panel (Grid 3x2)"]
};

// Preset sample products for instant testing
const SAMPLE_PRODUCTS = [
  {
    name: "Luxury Perfume",
    category: "Fragrance",
    desc: "Aura Noir Eau de Parfum, dark indigo glass bottle with gold metallic cap and luxury typographic label.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient><linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></linearGradient><linearGradient id="cap" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#ca8a04"/></linearGradient></defs><rect width="400" height="400" fill="url(#bg)"/><ellipse cx="200" cy="340" rx="90" ry="18" fill="#000" opacity="0.4"/><rect x="175" y="90" width="50" height="30" rx="4" fill="url(#cap)"/><rect x="188" y="120" width="24" height="20" fill="#e2e8f0"/><rect x="140" y="140" width="120" height="180" rx="16" fill="url(#glass)" stroke="#fef08a" stroke-width="3"/><rect x="155" y="180" width="90" height="100" rx="6" fill="#1e1b4b" opacity="0.85"/><text x="200" y="215" fill="#fde047" font-family="serif" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="3">AURA NOIR</text><text x="200" y="235" fill="#f8fafc" font-family="sans-serif" font-size="10" text-anchor="middle" letter-spacing="2">EAU DE PARFUM</text><text x="200" y="255" fill="#cbd5e1" font-family="sans-serif" font-size="9" text-anchor="middle">50ml / 1.7 FL.OZ</text></svg>`
  },
  {
    name: "Glowing Serum",
    category: "Skincare",
    desc: "Hydra Glow Niacinamide 10% Dropper bottle, frosted teal glass with clean minimalist typography.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#042f2e"/><stop offset="100%" stop-color="#021a1a"/></linearGradient><linearGradient id="bottle" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2dd4bf"/><stop offset="100%" stop-color="#0d9488"/></linearGradient></defs><rect width="400" height="400" fill="url(#bg)"/><ellipse cx="200" cy="340" rx="70" ry="15" fill="#000" opacity="0.5"/><path d="M190 70 Q200 60 210 70 L210 110 L190 110 Z" fill="#e2e8f0"/><rect x="175" y="110" width="50" height="20" rx="3" fill="#cbd5e1"/><rect x="155" y="130" width="90" height="190" rx="14" fill="url(#bottle)"/><rect x="165" y="170" width="70" height="110" rx="6" fill="#ffffff" opacity="0.95"/><text x="200" y="205" fill="#0f766e" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle">HYDRA GLOW</text><text x="200" y="225" fill="#334155" font-family="sans-serif" font-size="9" text-anchor="middle" font-weight="bold">NIACINAMIDE 10%</text><text x="200" y="245" fill="#64748b" font-family="sans-serif" font-size="8" text-anchor="middle">BARRIER SUPPORT</text><text x="200" y="265" fill="#0f766e" font-family="sans-serif" font-size="8" text-anchor="middle">30 ML</text></svg>`
  },
  {
    name: "Wireless Headphone",
    category: "Gadget",
    desc: "Pulse Pro ANC Matte black & purple headphones with ergonomic ear cups and brushed aluminum accents.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#18181b"/><stop offset="100%" stop-color="#09090b"/></linearGradient><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#6366f1"/></linearGradient></defs><rect width="400" height="400" fill="url(#bg)"/><ellipse cx="200" cy="340" rx="100" ry="20" fill="#000" opacity="0.6"/><path d="M120 200 C 120 100, 280 100, 280 200" stroke="#3f3f46" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M140 160 C 150 115, 250 115, 260 160" stroke="#71717a" stroke-width="8" fill="none"/><rect x="95" y="190" width="50" height="90" rx="22" fill="url(#metal)"/><rect x="255" y="190" width="50" height="90" rx="22" fill="url(#metal)"/><ellipse cx="120" cy="235" rx="15" ry="30" fill="#18181b"/><ellipse cx="280" cy="235" rx="15" ry="30" fill="#18181b"/><text x="200" y="325" fill="#a855f7" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" text-anchor="middle">PULSE PRO ANC</text></svg>`
  }
];

const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

const getMimeTypeFromBase64 = (base64: string): string => {
  const match = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  return match ? match[1] : 'image/jpeg';
};

const getBase64DataOnly = (base64: string): string => {
  return base64.split(',')[1] || base64;
};

// Types for Generated Prompts
interface GeneratedPromptData {
  id: string;
  timestamp: string;
  productName?: string;
  productPreview?: string;
  config: any;
  imagePrompt: {
    summary: string;
    detailedPrompt: string;
    midjourneyPrompt: string;
    fluxPrompt: string;
    negativePrompt: string;
    storyboardPanels?: string[];
  };
  videoPrompt: {
    directorPromptFull: string;
    concept: string;
    scenes: Array<{
      sceneNumber: string;
      timeRange: string;
      action: string;
      camera?: string;
      textOverlay?: string;
    }>;
    voiceOverScript: string;
    hookText?: string;
  };
}

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<'image-prompt' | 'video-prompt' | 'history'>('image-prompt');
  const [mobileView, setMobileView] = useState<'form' | 'result'>('form');
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);

  // Input Data State
  const [productImg, setProductImg] = useState<{ file?: File; preview: string; base64: string; name?: string } | null>(null);
  const [charImg, setCharImg] = useState<{ file?: File; preview: string; base64: string } | null>(null);
  const [promptText, setPromptText] = useState('');

  // Configuration State
  const [config, setConfig] = useState({
    background: OPTIONS.backgrounds[0],
    angle: OPTIONS.angles[0],
    style: OPTIONS.styles[0],
    ratio: '9:16',
    duration: '15',
    textOverlay: true,
    voiceOver: true,
    voiceOverType: 'narrator',
    storyboardStyle: OPTIONS.storyboardStyles[0],
    storyboardParts: '1',
    storyboardGrids: '4 Panel (Grid 2x2)'
  });

  // Processing State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPromptData, setCurrentPromptData] = useState<GeneratedPromptData | null>(null);

  // History State
  const [history, setHistory] = useState<GeneratedPromptData[]>(() => {
    try {
      const saved = localStorage.getItem('oval_studio_prompt_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('oval_studio_prompt_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save prompt history', e);
    }
  }, [history]);

  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setToast({ message, type });
  };

  const copyToClipboard = (text: string, label: string = 'Prompt') => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} disalin ke clipboard!`, 'success');
    }).catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast(`${label} disalin ke clipboard!`, 'success');
      } catch (err) {
        showToast('Gagal menyalin.', 'error');
      }
      document.body.removeChild(textArea);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'character') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showToast('Ukuran file maksimal 8MB.', 'error');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      const previewUrl = URL.createObjectURL(file);
      const imgData = { file, preview: previewUrl, base64, name: file.name };
      if (type === 'product') setProductImg(imgData);
      else setCharImg(imgData);
      showToast(`${type === 'product' ? 'Foto produk' : 'Foto karakter'} siap dianalisis!`, 'success');
    } catch (err) {
      showToast('Gagal membaca gambar.', 'error');
    }
  };

  const loadSampleProduct = (sample: typeof SAMPLE_PRODUCTS[0]) => {
    const base64 = `data:image/svg+xml;base64,${btoa(sample.svg)}`;
    setProductImg({
      preview: base64,
      base64: base64,
      name: sample.name
    });
    setPromptText(sample.desc);
    showToast(`Produk contoh "${sample.name}" dimuat!`, 'success');
  };

  // Generate Prompts Action (Calls /api/generate-prompts)
  const handleGeneratePrompts = async () => {
    if (!productImg) {
      showToast('Silakan unggah foto produk atau pilih produk sampel terlebih dahulu.', 'error');
      return;
    }

    setIsGenerating(true);
    setMobileView('result');

    try {
      const payload = {
        productImage: {
          mimeType: getMimeTypeFromBase64(productImg.base64),
          data: getBase64DataOnly(productImg.base64)
        },
        characterImage: charImg ? {
          mimeType: getMimeTypeFromBase64(charImg.base64),
          data: getBase64DataOnly(charImg.base64)
        } : null,
        promptText,
        config
      };

      const res = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      
      const newPromptRecord: GeneratedPromptData = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('id-ID'),
        productName: productImg.name || 'Produk Iklan',
        productPreview: productImg.preview,
        config: { ...config, hasCharacter: !!charImg },
        imagePrompt: data.imagePrompt,
        videoPrompt: data.videoPrompt
      };

      setCurrentPromptData(newPromptRecord);
      setHistory(prev => [newPromptRecord, ...prev]);
      setActiveTab('image-prompt');
      showToast('Prompt Text-to-Image & Text-to-Video berhasil dibuat!', 'success');

    } catch (error: any) {
      console.error('Error generating prompts:', error);
      let errMsg = error.message || 'Gagal menghasilkan prompt AI. Silakan coba lagi.';
      try {
        if (errMsg.startsWith('{')) {
          const parsed = JSON.parse(errMsg);
          if (parsed?.error?.message) {
            errMsg = parsed.error.message;
          } else if (parsed?.error && typeof parsed.error === 'string') {
            errMsg = parsed.error;
          }
        }
      } catch {
        // use raw string
      }
      if (errMsg.includes('503') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE')) {
        errMsg = 'Server AI sedang mengalami lonjakan antrean (503). Silakan klik tombol "Generate Prompt AI" lagi untuk mencoba kembali.';
      }
      showToast(errMsg, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const UploaderBox = ({
    title,
    imgData,
    onUpload,
    onRemove,
    required,
    id
  }: {
    title: string;
    imgData: any;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    required: boolean;
    id: string;
  }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-purple-500/50 transition-colors">
      <div className="flex justify-between items-center mb-2.5">
        <h3 className="font-semibold text-slate-200 flex items-center text-xs sm:text-sm">
          {title} {required && <span className="text-rose-500 ml-1">*</span>}
        </h3>
        {imgData && (
          <button
            type="button"
            onClick={onRemove}
            className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
            title="Hapus gambar"
          >
            <Icons.Trash />
          </button>
        )}
      </div>

      {!imgData ? (
        <div className="border-2 border-dashed border-white/20 rounded-xl p-5 text-center relative hover:bg-white/5 transition-colors cursor-pointer group">
          <input
            type="file"
            id={id}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/jpeg,image/png,image/webp"
            onChange={onUpload}
          />
          <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none text-slate-400 group-hover:text-purple-400 transition-colors">
            <Icons.Upload />
            <div className="text-xs">
              <span className="font-semibold text-white">Unggah Foto Referensi</span>
            </div>
            <p className="text-[10px] text-slate-500">AI menganalisis bentuk & kemasan</p>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden group border border-white/10 bg-black/60 aspect-square flex items-center justify-center">
          <img src={imgData.preview} alt={title} className="max-h-full max-w-full object-contain" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <label htmlFor={`replace-${id}`} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg cursor-pointer text-xs font-medium transition-colors">
              Ganti
            </label>
            <input type="file" id={`replace-${id}`} className="hidden" accept="image/*" onChange={onUpload} />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-sans selection:bg-purple-500/30 flex flex-col md:flex-row h-screen overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-20 lg:w-64 bg-[#0d1017] border-r border-white/10 p-4 flex md:flex-col justify-between md:justify-start flex-shrink-0 z-20 
        ${mobileView === 'result' ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Brand */}
        <div className="flex items-center space-x-3 mb-0 md:mb-8 lg:mb-10 justify-center lg:justify-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
            <span className="text-white font-black text-sm tracking-wider">OS</span>
          </div>
          <div className="hidden lg:block text-left">
            <h1 className="text-white font-bold tracking-wide text-sm">OVAL STUDIO</h1>
            <p className="text-[10px] text-purple-400 font-semibold tracking-wider uppercase">AI Prompt Studio</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 items-center md:items-stretch">
          <button
            onClick={() => setMobileView('form')}
            className={`flex items-center justify-center lg:justify-start space-x-3 p-2.5 lg:p-3 rounded-xl transition-all font-semibold text-xs lg:text-sm
              ${mobileView === 'form' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Form Generator Prompt"
          >
            <Icons.Wand />
            <span className="hidden lg:inline">Generator Prompt</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('image-prompt');
              setMobileView('result');
            }}
            className={`flex items-center justify-center lg:justify-start space-x-3 p-2.5 lg:p-3 rounded-xl transition-all font-medium text-xs lg:text-sm
              ${activeTab === 'image-prompt' && mobileView === 'result' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Prompt Text-to-Image"
          >
            <Icons.Image />
            <span className="hidden lg:inline">Prompt Text-to-Image</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('video-prompt');
              setMobileView('result');
            }}
            className={`flex items-center justify-center lg:justify-start space-x-3 p-2.5 lg:p-3 rounded-xl transition-all font-medium text-xs lg:text-sm
              ${activeTab === 'video-prompt' && mobileView === 'result' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Prompt Text-to-Video"
          >
            <Icons.Video />
            <span className="hidden lg:inline">Prompt Text-to-Video</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('history');
              setMobileView('result');
            }}
            className={`flex items-center justify-center lg:justify-start space-x-3 p-2.5 lg:p-3 rounded-xl transition-all font-medium text-xs lg:text-sm
              ${activeTab === 'history' && mobileView === 'result' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Riwayat Prompt"
          >
            <Icons.History />
            <span className="hidden lg:inline">Riwayat Prompt</span>
            {history.length > 0 && (
              <span className="hidden lg:inline-block ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold">
                {history.length}
              </span>
            )}
          </button>
        </nav>

        {/* Information Box */}
        <div className="hidden lg:block mt-auto pt-4 border-t border-white/10">
          <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-left">
            <div className="flex items-center space-x-1.5 text-purple-300 text-xs font-bold mb-1">
              <Icons.Sparkles />
              <span>Prompt Dual-Engine</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Menghasilkan prompt gambar (Midjourney/Flux) & video director (Veo/Sora/Kling/Runway) siap pakai.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col md:flex-row w-full h-full relative overflow-hidden">
        
        {/* Loading Progress Bar */}
        {isGenerating && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800 z-50 pointer-events-none overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 animate-pulse w-full"></div>
          </div>
        )}

        {/* LEFT COLUMN: Input Form */}
        <div className={`w-full md:w-1/2 lg:w-[46%] h-full flex-col border-r border-white/10 bg-[#090b11] overflow-y-auto custom-scrollbar
          ${mobileView === 'form' ? 'flex' : 'hidden md:flex'}`}>
          
          <div className="p-4 sm:p-6 lg:p-7 space-y-5">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5">Konfigurasi Prompt Iklan</h2>
                <p className="text-xs sm:text-sm text-slate-400">Atur parameter produk untuk menghasilkan prompt Text-to-Image & Text-to-Video.</p>
              </div>
              <div className="md:hidden">
                {currentPromptData && (
                  <button
                    type="button"
                    onClick={() => setMobileView('result')}
                    className="px-3 py-1.5 bg-purple-600/30 text-purple-300 rounded-lg text-xs font-semibold border border-purple-500/40"
                  >
                    Lihat Hasil
                  </button>
                )}
              </div>
            </header>

            {/* Quick Sample Presets */}
            <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-300 flex items-center space-x-1.5">
                  <Icons.Sparkles /> <span>Coba Cepat Produk Sampel:</span>
                </span>
                <span className="text-[10px] text-slate-500">1-Klik Pakai</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PRODUCTS.map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => loadSampleProduct(sample)}
                    className="p-2 rounded-xl bg-black/40 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/40 text-left transition-all group"
                  >
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 truncate">{sample.name}</p>
                    <p className="text-[10px] text-slate-500">{sample.category}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Image References Upload */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <UploaderBox
                title="Produk Utama"
                id="prod-upload"
                required={true}
                imgData={productImg}
                onUpload={(e) => handleImageUpload(e, 'product')}
                onRemove={() => setProductImg(null)}
              />
              <UploaderBox
                title="Karakter / Model (Opsional)"
                id="char-upload"
                required={false}
                imgData={charImg}
                onUpload={(e) => handleImageUpload(e, 'character')}
                onRemove={() => setCharImg(null)}
              />
            </div>

            {/* Additional Prompt Text */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <label className="block font-semibold text-slate-200 mb-1 text-xs sm:text-sm">
                Instruksi Tambahan (Opsional)
              </label>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Contoh: Tekankan pantulan mewah pada botol, lighting lembut golden hour, model tersenyum natural..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none h-20 transition-all mt-1"
              />
            </div>

            {/* Configurations */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Latar Belakang</label>
                <select
                  value={config.background}
                  onChange={(e) => setConfig({...config, background: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:ring-2 focus:ring-purple-500/50 outline-none"
                >
                  {OPTIONS.backgrounds.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Style Iklan</label>
                  <select
                    value={config.style}
                    onChange={(e) => setConfig({...config, style: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:ring-2 focus:ring-purple-500/50 outline-none"
                  >
                    {OPTIONS.styles.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Sudut Kamera</label>
                  <select
                    value={config.angle}
                    onChange={(e) => setConfig({...config, angle: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:ring-2 focus:ring-purple-500/50 outline-none"
                  >
                    {OPTIONS.angles.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {config.style === 'Storyboard' && (
                <div className="bg-purple-900/15 border border-purple-500/30 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icons.Image />
                    <h4 className="text-xs sm:text-sm font-bold text-purple-300">Pengaturan Grid Storyboard</h4>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-purple-200/80 mb-1.5">Gaya Narasi Storyboard</label>
                    <select
                      value={config.storyboardStyle}
                      onChange={(e) => setConfig({...config, storyboardStyle: e.target.value})}
                      className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-2 text-xs sm:text-sm text-purple-100 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    >
                      {OPTIONS.storyboardStyles.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-purple-200/80 mb-1.5">Jumlah Part</label>
                      <select
                        value={config.storyboardParts}
                        onChange={(e) => setConfig({...config, storyboardParts: e.target.value})}
                        className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-2 text-xs sm:text-sm text-purple-100 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      >
                        {["1", "2", "3", "4"].map(p => <option key={p} value={p}>{p} Part</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-purple-200/80 mb-1.5">Panel / Grid</label>
                      <select
                        value={config.storyboardGrids}
                        onChange={(e) => setConfig({...config, storyboardGrids: e.target.value})}
                        className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-2 text-xs sm:text-sm text-purple-100 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      >
                        {OPTIONS.storyboardGrids.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Aspek Rasio</label>
                  <select
                    value={config.ratio}
                    onChange={(e) => setConfig({...config, ratio: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:ring-2 focus:ring-purple-500/50 outline-none"
                  >
                    {OPTIONS.ratios.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Target Durasi Video</label>
                  <select
                    value={config.duration}
                    onChange={(e) => setConfig({...config, duration: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:ring-2 focus:ring-purple-500/50 outline-none"
                  >
                    {OPTIONS.durations.map(d => <option key={d} value={d}>{d} Detik</option>)}
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-3 border-t border-white/10 space-y-3.5">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={config.textOverlay}
                      onChange={(e) => setConfig({...config, textOverlay: e.target.checked})}
                      className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md bg-black/40 checked:bg-purple-600 checked:border-purple-600 transition-all cursor-pointer"
                    />
                    <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                      <Icons.Check />
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    Sertakan Teks Hook Overlay (Caption Iklan)
                  </span>
                </label>

                <div className="space-y-2.5">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={config.voiceOver}
                        onChange={(e) => setConfig({...config, voiceOver: e.target.checked})}
                        className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md bg-black/40 checked:bg-purple-600 checked:border-purple-600 transition-all cursor-pointer"
                      />
                      <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                        <Icons.Check />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      Naskah Voice Over (Bahasa Indonesia sesuai durasi)
                    </span>
                  </label>

                  {config.voiceOver && (
                    <div className="pl-8 flex space-x-4 animate-in fade-in slide-in-from-top-2">
                      <label className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="voType"
                          value="narrator"
                          checked={config.voiceOverType === 'narrator'}
                          onChange={(e) => setConfig({...config, voiceOverType: e.target.value})}
                          className="w-4 h-4 accent-purple-500 bg-black/40 border-white/20 cursor-pointer"
                        />
                        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Narator Luar</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="voType"
                          value="lipsync"
                          checked={config.voiceOverType === 'lipsync'}
                          onChange={(e) => setConfig({...config, voiceOverType: e.target.value})}
                          className="w-4 h-4 accent-purple-500 bg-black/40 border-white/20 cursor-pointer"
                        />
                        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Lipsync (Bicara di Kamera)</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pb-8">
              <button
                type="button"
                onClick={handleGeneratePrompts}
                disabled={isGenerating || !productImg}
                className={`w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center space-x-2.5 transition-all shadow-xl
                  ${isGenerating || !productImg
                    ? 'bg-slate-800 cursor-not-allowed opacity-60 text-slate-400'
                    : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/25 active:scale-[0.98]'}`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Merumuskan Prompt AI...</span>
                  </>
                ) : (
                  <>
                    <Icons.Wand />
                    <span>Generate Prompt AI</span>
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 text-xs mt-2.5">
                Menghasilkan prompt siap pakai untuk Midjourney/Flux (Image) dan Veo/Sora/Kling (Video).
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results (Image Prompt & Video Prompt) */}
        <div className={`w-full md:w-1/2 lg:w-[54%] h-full flex-col bg-[#0b0d14]
          ${mobileView === 'result' ? 'flex' : 'hidden md:flex'}`}>
          
          {/* Header Tabs */}
          <div className="h-16 border-b border-white/10 flex items-center px-4 bg-slate-900/70 backdrop-blur-md sticky top-0 z-10 justify-between">
            <button
              type="button"
              onClick={() => setMobileView('form')}
              className="md:hidden p-2 -ml-1 text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <Icons.ChevronLeft />
              <span className="text-xs">Form</span>
            </button>

            <div className="flex space-x-1.5 sm:space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab('image-prompt')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center space-x-1.5
                  ${activeTab === 'image-prompt' ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 shadow-inner' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Icons.Image /> <span>Prompt Text-to-Image</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('video-prompt')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center space-x-1.5
                  ${activeTab === 'video-prompt' ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-inner' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Icons.Video /> <span>Prompt Text-to-Video</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center space-x-1.5
                  ${activeTab === 'history' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Icons.History /> <span>Riwayat ({history.length})</span>
              </button>
            </div>
          </div>

          {/* Right Panel Body */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar relative">
            
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-24">
                <div className="w-14 h-14 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <h3 className="text-base font-bold text-white mb-1">Menganalisis Visual & Merancang Prompt</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  AI sedang membedah identitas produk, label, kemasan, pencahayaan komersial, dan menyusun prompt Text-to-Image serta naskah adegan Text-to-Video...
                </p>
              </div>
            ) : !currentPromptData && activeTab !== 'history' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-24 border-2 border-dashed border-white/5 rounded-2xl p-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mb-4">
                  <Icons.Wand />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">Belum Ada Prompt yang Dibuat</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4">
                  Unggah gambar produk Anda di sebelah kiri (atau klik salah satu sampel) lalu klik &quot;Generate Prompt AI&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setMobileView('form')}
                  className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 rounded-lg text-xs font-semibold border border-purple-500/40"
                >
                  Buka Form Input
                </button>
              </div>
            ) : null}

            {/* TAB: TEXT-TO-IMAGE PROMPT */}
            {currentPromptData && activeTab === 'image-prompt' && !isGenerating && (
              <div className="space-y-5 animate-in fade-in duration-300">
                
                {/* Header Summary Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    {currentPromptData.productPreview && (
                      <img
                        src={currentPromptData.productPreview}
                        alt="Product Ref"
                        className="w-12 h-12 object-contain bg-black/40 rounded-xl border border-white/10 p-1 flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white">Prompt Iklan Komersial (Text-to-Image)</h3>
                      <p className="text-xs text-slate-400">{currentPromptData.imagePrompt.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                      {currentPromptData.config.style}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      {currentPromptData.config.ratio}
                    </span>
                  </div>
                </div>

                {/* Midjourney v6.1 Ready Prompt Card */}
                <div className="bg-[#101422] border border-indigo-500/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Format Midjourney v6.1</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentPromptData.imagePrompt.midjourneyPrompt, 'Prompt Midjourney')}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Icons.Copy /> <span>Salin Midjourney</span>
                    </button>
                  </div>
                  <div className="bg-black/50 border border-white/5 rounded-xl p-3.5 font-mono text-xs sm:text-[13px] text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
                    {currentPromptData.imagePrompt.midjourneyPrompt}
                  </div>
                </div>

                {/* Flux.1 / Natural Language Prompt Card */}
                <div className="bg-[#12111d] border border-purple-500/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider">Format Flux.1 / Natural Photography</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentPromptData.imagePrompt.fluxPrompt, 'Prompt Flux')}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Icons.Copy /> <span>Salin Flux</span>
                    </button>
                  </div>
                  <div className="bg-black/50 border border-white/5 rounded-xl p-3.5 font-mono text-xs sm:text-[13px] text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
                    {currentPromptData.imagePrompt.fluxPrompt}
                  </div>
                </div>

                {/* Detailed Shot Breakdown */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Deskripsi Visual Terperinci</h4>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentPromptData.imagePrompt.detailedPrompt, 'Deskripsi Terperinci')}
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 p-1"
                    >
                      <Icons.Copy /> <span>Salin</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/40 rounded-xl p-3 border border-white/5">
                    {currentPromptData.imagePrompt.detailedPrompt}
                  </p>
                </div>

                {/* Storyboard Panels (if applicable) */}
                {currentPromptData.imagePrompt.storyboardPanels && currentPromptData.imagePrompt.storyboardPanels.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-2">
                      <Icons.Clapper /> <span>Panel Storyboard ({currentPromptData.imagePrompt.storyboardPanels.length} Panel)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentPromptData.imagePrompt.storyboardPanels.map((panel, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-3 space-y-1.5 relative group">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                              Panel #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(panel, `Panel #${idx + 1}`)}
                              className="text-slate-400 hover:text-white p-1"
                            >
                              <Icons.Copy />
                            </button>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{panel}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Negative Prompt */}
                <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Negative Prompt (Hindari Artefak)</h4>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentPromptData.imagePrompt.negativePrompt, 'Negative Prompt')}
                      className="px-2.5 py-1 bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 rounded-lg text-xs font-medium flex items-center space-x-1"
                    >
                      <Icons.Copy /> <span>Salin</span>
                    </button>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 text-xs text-rose-200 font-mono">
                    {currentPromptData.imagePrompt.negativePrompt}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: TEXT-TO-VIDEO PROMPT */}
            {currentPromptData && activeTab === 'video-prompt' && !isGenerating && (
              <div className="space-y-5 animate-in fade-in duration-300">
                
                {/* Header Summary Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Icons.Clapper />
                      <span>Director Text-to-Video Prompt ({currentPromptData.config.duration} Detik)</span>
                    </h3>
                    <p className="text-xs text-slate-400">{currentPromptData.videoPrompt.concept}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(currentPromptData.videoPrompt.directorPromptFull, 'Seluruh Prompt Video Director')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-lg active:scale-95"
                  >
                    <Icons.Copy /> <span>Salin Seluruh Prompt Director</span>
                  </button>
                </div>

                {/* Voice Over Script Card */}
                {currentPromptData.config.voiceOver && currentPromptData.videoPrompt.voiceOverScript && (
                  <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icons.Mic />
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                          Naskah Voice Over ({currentPromptData.config.voiceOverType === 'lipsync' ? 'Lipsync Talent' : 'Narator Luar'} • {currentPromptData.config.duration}s)
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(currentPromptData.videoPrompt.voiceOverScript, 'Naskah Voice Over')}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                      >
                        <Icons.Copy /> <span>Salin Naskah VO</span>
                      </button>
                    </div>
                    <div className="bg-black/50 border border-white/5 rounded-xl p-3.5 text-xs sm:text-sm text-indigo-100 italic leading-relaxed">
                      &quot;{currentPromptData.videoPrompt.voiceOverScript}&quot;
                    </div>
                  </div>
                )}

                {/* Scene-by-Scene Timeline Breakdown */}
                {currentPromptData.videoPrompt.scenes && currentPromptData.videoPrompt.scenes.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <Icons.Clock />
                        <span>Pembagian Adegan (Scene-by-Scene Timeline)</span>
                      </h4>
                      <span className="text-[11px] text-slate-400">Total {currentPromptData.config.duration} Detik</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {currentPromptData.videoPrompt.scenes.map((scene, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 hover:border-purple-500/40 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-white bg-purple-600/30 px-2.5 py-0.5 rounded-full border border-purple-500/40">
                                {scene.sceneNumber || `Scene ${idx + 1}`}
                              </span>
                              <span className="text-xs text-purple-300 font-mono font-semibold flex items-center space-x-1">
                                <Icons.Clock /> <span>{scene.timeRange}</span>
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(`${scene.sceneNumber} (${scene.timeRange}): ${scene.action} | Camera: ${scene.camera || '-'} | Text: ${scene.textOverlay || '-'}`, `Scene ${idx + 1}`)}
                              className="text-slate-400 hover:text-white p-1"
                              title="Salin Adegan Ini"
                            >
                              <Icons.Copy />
                            </button>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                            {scene.action}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                            {scene.camera && (
                              <div className="bg-black/30 rounded-lg p-2 text-slate-400">
                                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Kamera:</span>
                                {scene.camera}
                              </div>
                            )}
                            {scene.textOverlay && (
                              <div className="bg-black/30 rounded-lg p-2 text-purple-200">
                                <span className="text-purple-400 font-semibold block text-[10px] uppercase">Teks Hook Overlay:</span>
                                {scene.textOverlay}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Complete Director Prompt Raw Display */}
                <div className="bg-[#0f111b] border border-white/10 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Full Director Prompt (Sections A s/d L)
                    </h4>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentPromptData.videoPrompt.directorPromptFull, 'Seluruh Prompt Director')}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Icons.Copy /> <span>Salin Semua</span>
                    </button>
                  </div>
                  <div className="bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-xs sm:text-[13px] text-slate-300 leading-relaxed max-h-[450px] overflow-y-auto custom-scrollbar whitespace-pre-wrap select-all">
                    {currentPromptData.videoPrompt.directorPromptFull}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Riwayat Prompt Tersimpan</h3>
                    <p className="text-xs text-slate-400">Semua prompt Text-to-Image & Video yang pernah Anda buat.</p>
                  </div>
                  {history.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Hapus seluruh riwayat prompt?')) {
                          setHistory([]);
                          localStorage.removeItem('oval_studio_prompt_history');
                          showToast('Riwayat dibersihkan', 'info');
                        }
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 p-1.5 rounded-lg hover:bg-rose-500/10"
                    >
                      <Icons.Trash /> <span>Bersihkan</span>
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 border border-dashed border-white/10 rounded-2xl">
                    <Icons.History />
                    <p className="mt-3 text-sm">Belum ada riwayat prompt yang disimpan.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center space-x-3">
                          {item.productPreview && (
                            <img
                              src={item.productPreview}
                              alt="Preview"
                              className="w-12 h-12 rounded-lg object-contain bg-black/40 border border-white/10 p-1 flex-shrink-0"
                            />
                          )}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-white">{item.productName}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {item.imagePrompt?.summary || 'Prompt Iklan Komersial'}
                            </p>
                            <div className="flex space-x-2 mt-1.5">
                              <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                {item.config?.style}
                              </span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                {item.config?.duration}s • {item.config?.ratio}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPromptData(item);
                              setActiveTab('image-prompt');
                              setMobileView('result');
                              showToast('Prompt dibuka!', 'info');
                            }}
                            className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white rounded-lg text-xs font-semibold transition-all border border-purple-500/30"
                          >
                            Buka Prompt
                          </button>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.imagePrompt.midjourneyPrompt, 'Prompt Midjourney')}
                            className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs transition-colors"
                            title="Salin Midjourney"
                          >
                            <Icons.Copy />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Toast Notification Layer */}
      {toast && (
        <div className={`fixed bottom-5 right-5 p-4 rounded-xl border shadow-2xl flex items-center space-x-3 transition-all z-50 animate-in slide-in-from-bottom-5 backdrop-blur-md
          ${toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-600 text-emerald-100' : 
            toast.type === 'error' ? 'bg-rose-950/90 border-rose-600 text-rose-100' : 'bg-slate-900/90 border-slate-700 text-slate-100'}`}
        >
          {toast.type === 'success' && <Icons.Check />}
          {toast.type === 'error' && <Icons.Alert />}
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}} />
    </div>
  );
}
