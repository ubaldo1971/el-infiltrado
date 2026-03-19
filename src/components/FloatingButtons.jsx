/**
 * FloatingButtons — Botones flotantes 3D sobre el hero.
 * "Suscribirse" → scroll al formulario de suscripción
 * "Publicar Anuncio" → navega al formulario de anuncio
 */
import { useNavigate } from 'react-router-dom';

export default function FloatingButtons() {
    const navigate = useNavigate();

    const scrollToSubscription = () => {
        const el = document.getElementById('subscription-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="fixed right-5 bottom-8 z-50 flex flex-col gap-3">
            {/* ── Suscribirse ── */}
            <button
                onClick={scrollToSubscription}
                className="
          group relative px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider
          text-white bg-gradient-to-br from-emerald-500 to-emerald-700
          shadow-[0_6px_0_0_#065f46,0_8px_20px_rgba(16,185,129,0.35)]
          hover:shadow-[0_4px_0_0_#065f46,0_6px_15px_rgba(16,185,129,0.4)]
          hover:translate-y-[2px]
          active:shadow-[0_1px_0_0_#065f46,0_2px_5px_rgba(16,185,129,0.3)]
          active:translate-y-[5px]
          transition-all duration-150 ease-out
          flex items-center gap-2
        "
            >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Suscribirse
                {/* Brillo animado */}
                <span className="absolute inset-0 rounded-2xl overflow-hidden">
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700" />
                </span>
            </button>

            {/* ── Publicar Anuncio ── */}
            <button
                onClick={() => navigate('/publicar-anuncio')}
                className="
          group relative px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider
          text-white bg-gradient-to-br from-amber-500 to-orange-600
          shadow-[0_6px_0_0_#c2410c,0_8px_20px_rgba(245,158,11,0.35)]
          hover:shadow-[0_4px_0_0_#c2410c,0_6px_15px_rgba(245,158,11,0.4)]
          hover:translate-y-[2px]
          active:shadow-[0_1px_0_0_#c2410c,0_2px_5px_rgba(245,158,11,0.3)]
          active:translate-y-[5px]
          transition-all duration-150 ease-out
          flex items-center gap-2
        "
            >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Publicar Anuncio
                <span className="absolute inset-0 rounded-2xl overflow-hidden">
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700" />
                </span>
            </button>
        </div>
    );
}
