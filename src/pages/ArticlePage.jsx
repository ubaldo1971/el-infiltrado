/**
 * ArticlePage — Página completa de un artículo con diseño tipo periódico.
 */
import { useParams, useNavigate } from 'react-router-dom';
import { newsArticles, ads } from '../data/store';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import FloatingButtons from '../components/FloatingButtons';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';

export default function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Try to find article in regular articles first, then in ads
    let article = newsArticles.getAll().find((a) => a.id === id);
    let isSponsored = false;

    if (!article) {
        // Check if it's a sponsored ad article (id format: ad-XXXX)
        const adId = id.startsWith('ad-') ? id.replace('ad-', '') : id;
        const ad = ads.getAll().find((a) => a.id === adId);
        if (ad) {
            const sectionCategoryMap = {
                politics: 'Política',
                economy: 'Economía',
                sports: 'Deportes',
                technology: 'Tecnología',
                culture: 'Cultura',
            };
            article = {
                id: `ad-${ad.id}`,
                title: ad.title,
                excerpt: ad.description,
                category: sectionCategoryMap[ad.sectionKey] || ad.section || 'General',
                author: ad.publisherName || 'Anunciante',
                image: ad.photos?.[0] || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop',
                allPhotos: ad.photos || [],
                readTime: 'Patrocinado',
                createdAt: ad.createdAt,
                sponsored: true,
                socialNetworks: {
                    facebookUrl: ad.facebookUrl,
                    twitterUrl: ad.twitterUrl,
                    instagramUrl: ad.instagramUrl
                }
            };
            isSponsored = true;
        }
    }

    // 404 state
    if (!article) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-6xl font-black text-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>404</h1>
                    <p className="text-text-muted text-lg mb-6">Artículo no encontrado</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-all"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    // Get related articles (same category, excluding current)
    const related = newsArticles.getPublished()
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    // Format date
    const formattedDate = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString('es-MX', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        })
        : 'Fecha no disponible';

    // Generate full body content from excerpt (since we don't have full body stored)
    const bodyContent = article.body || article.excerpt || '';

    const handleShare = (network) => {
        const url = window.location.href;
        const text = article.title;
        let shareUrl = '';

        switch (network) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' \n' + url)}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            <TopBar />
            <Header />
            <Navigation />
            <FloatingButtons />

            {/* ── Back button bar ── */}
            <div className="bg-white border-b border-border">
                <div className="max-w-4xl mx-auto px-6 md:px-10 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium group"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Regresar
                    </button>
                </div>
            </div>

            {/* ── Hero Image ── */}
            <div className="relative w-full h-64 md:h-96 lg:h-[28rem] overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category + Sponsored badges */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                        {article.category}
                    </span>
                    {(article.sponsored || isSponsored) && (
                        <span className="bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                            Patrocinado
                        </span>
                    )}
                </div>
            </div>

            {/* ── Article Content ── */}
            <div className="max-w-4xl mx-auto px-6 md:px-10" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Article header */}
                    <div className="p-6 sm:p-8 md:p-12 flex flex-col items-center text-center">
                        {/* Title */}
                        <h1
                            className="text-2xl md:text-3xl lg:text-4xl font-black text-navy leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {article.title}
                        </h1>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center justify-center gap-4 pb-6 border-b border-border w-full">
                            {/* Author avatar */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white text-sm font-bold">
                                    {(article.author || 'A')[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-navy">{article.author}</p>
                                    <p className="text-xs text-text-muted capitalize">{formattedDate}</p>
                                </div>
                            </div>

                            {/* Social info from author if available */}
                            {article.socialNetworks && (article.socialNetworks.facebookUrl || article.socialNetworks.twitterUrl || article.socialNetworks.instagramUrl) && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full border border-border">
                                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider mr-1">Sigue al autor</span>
                                    {article.socialNetworks.facebookUrl && (
                                        <a href={article.socialNetworks.facebookUrl.startsWith('http') ? article.socialNetworks.facebookUrl : `https://${article.socialNetworks.facebookUrl}`} target="_blank" rel="noopener noreferrer" 
                                            className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
                                        </a>
                                    )}
                                    {article.socialNetworks.twitterUrl && (
                                        <a href={article.socialNetworks.twitterUrl.startsWith('http') ? article.socialNetworks.twitterUrl : `https://${article.socialNetworks.twitterUrl}`} target="_blank" rel="noopener noreferrer"
                                            className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </a>
                                    )}
                                    {article.socialNetworks.instagramUrl && (
                                        <a href={article.socialNetworks.instagramUrl.startsWith('http') ? article.socialNetworks.instagramUrl : `https://${article.socialNetworks.instagramUrl}`} target="_blank" rel="noopener noreferrer"
                                            className="w-6 h-6 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-gradient-to-tr hover:from-orange-500 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-all">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="flex-1" />

                            {/* Reading time */}
                            <div className="flex items-center gap-4 text-xs text-text-muted">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {article.readTime || '5 min'} lectura
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Article body */}
                    <div className="prose prose-lg max-w-none px-6 pb-8 sm:px-8 sm:pb-10 md:px-12 md:pb-12">
                        {/* Lead paragraph (excerpt) */}
                        <p className="text-lg text-text-secondary leading-relaxed font-medium mb-6" style={{ borderLeft: '4px solid var(--color-accent)', paddingLeft: '1.25rem' }}>
                            {article.excerpt}
                        </p>

                        {/* Full body content */}
                        {bodyContent && bodyContent !== article.excerpt && (
                            <div className="text-text-primary text-base leading-relaxed space-y-4">
                                {bodyContent.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        )}

                        {/* If no additional body, show placeholder content */}
                        {(!bodyContent || bodyContent === article.excerpt) && (
                            <div className="text-text-primary text-base leading-relaxed space-y-4">
                                <p>{article.excerpt}</p>
                            </div>
                        )}

                        {/* Photo gallery for sponsored articles with multiple photos */}
                        {article.allPhotos && article.allPhotos.length > 1 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    📷 Galería de Imágenes
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {article.allPhotos.map((photo, idx) => (
                                        <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-border">
                                            <img
                                                src={photo}
                                                alt={`${article.title} - Imagen ${idx + 1}`}
                                                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Article footer with share buttons */}
                    <div className="border-t border-border p-6 sm:p-8 md:px-12 md:py-6">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                <span className="font-semibold text-text-secondary">Compartir:</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleShare('facebook')} className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition-opacity" title="Facebook">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
                                </button>
                                <button onClick={() => handleShare('twitter')} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity" title="X (Twitter)">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </button>
                                <button onClick={() => handleShare('whatsapp')} className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-80 transition-opacity" title="WhatsApp">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Articles ── */}
                {related.length > 0 && (
                    <div className="mt-12 mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-accent rounded-full" />
                            <h2
                                className="text-xl font-black text-text-primary uppercase tracking-wide"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Artículos Relacionados
                            </h2>
                            <div className="flex-1 h-px bg-border/50" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((a) => (
                                <ArticleCard key={a.id} article={a} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
