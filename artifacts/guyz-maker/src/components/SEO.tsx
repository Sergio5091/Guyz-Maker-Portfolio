import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const defaultSEO = {
  title: 'Guyz Maker - Ingénierie & Innovation | IoT, Domotique & Automatisation au Bénin',
  description: 'Guyz Maker : Expert en ingénierie IoT, domotique et automatisation au Bénin. De l\'idée au produit intelligent. INOVA Makerspace, Optimatics, Aura Controle.',
  keywords: 'Guyz Maker, ingénierie Bénin, IoT, domotique, automatisation, Cotonou, innovation, fabrication, makerspace, développement matériel, smart home',
  ogImage: '/opengraph.jpg',
  ogType: 'website',
};

const pageSEO: Record<string, Partial<SEOProps>> = {
  '/': {
    title: 'Guyz Maker - Ingénierie & Innovation | IoT, Domotique & Automatisation au Bénin',
    description: 'Guyz Maker : Expert en ingénierie IoT, domotique et automatisation au Bénin. De l\'idée au produit intelligent. INOVA Makerspace, Optimatics, Aura Controle.',
    keywords: 'Guyz Maker, ingénierie Bénin, IoT, domotique, automatisation, Cotonou, innovation, fabrication, makerspace, développement matériel, smart home',
  },
  '/projects': {
    title: 'Projets Réalisés - Guyz Maker | IoT, Domotique & Automatisation',
    description: 'Découvrez nos projets IoT, domotique et automatisation réalisés au Bénin. Systèmes intelligents, prototypes innovants et solutions techniques.',
    keywords: 'projets IoT, domotique Bénin, automatisation, systèmes intelligents, prototypes, innovations techniques, Guyz Maker projets',
  },
  '/services': {
    title: 'Services & Expertises - Guyz Maker | INOVA Makerspace, Optimatics, Aura Controle',
    description: 'Nos services : INOVA Makerspace (prototypage IoT), Optimatics (digitalisation), Aura Controle (domotique) et formations techniques.',
    keywords: 'services IoT, prototypage Bénin, makerspace, digitalisation, domotique, automatisation, formation technique, INOVA Makerspace',
  },
  '/blog': {
    title: 'Blog - Chroniques du Maker | Guyz Maker',
    description: 'Chroniques du Maker : Documentation publique, apprentissages techniques et visions sur la tech en Afrique. Articles sur IoT, ingénierie et innovation.',
    keywords: 'blog tech Bénin, chroniques maker, IoT Afrique, ingénierie, documentation technique, apprentissage tech, innovation Bénin',
  },
  '/about': {
    title: 'À Propos - Guyz Maker | Ingénieur Innovateur au Bénin',
    description: 'Guyz Maker : Parcours d\'ingénieur au Bénin, de INOVA Display à INOVA Makerspace. Expert en IoT, domotique et automatisation.',
    keywords: 'Guyz Maker parcours, ingénieur Bénin, INOVA Display, INOVA Makerspace, BLOLAB, Cotonou, expertise IoT, domotique',
  },
  '/contact': {
    title: 'Contact - Guyz Maker | Ingénierie & Innovation au Bénin',
    description: 'Contactez Guyz Maker pour vos projets IoT, domotique et automatisation au Bénin. De l\'idée au produit intelligent.',
    keywords: 'contact Guyz Maker, ingénieur Bénin, projet IoT, domotique Cotonou, automatisation, innovation technique, Bénin',
  },
};

export function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType, 
  canonicalUrl,
  noIndex = false 
}: SEOProps) {
  const [location] = useLocation();
  
  const pageConfig = pageSEO[location] || {};
  const finalTitle = title || pageConfig.title || defaultSEO.title;
  const finalDescription = description || pageConfig.description || defaultSEO.description;
  const finalKeywords = keywords || pageConfig.keywords || defaultSEO.keywords;
  const finalOgImage = ogImage || pageConfig.ogImage || defaultSEO.ogImage;
  const finalOgType = ogType || pageConfig.ogType || defaultSEO.ogType;
  const finalCanonicalUrl = canonicalUrl || `https://guyzmaker.com${location}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Guyz Maker" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={`https://guyzmaker.com${finalOgImage}`} />
      <meta property="og:type" content={finalOgType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="Guyz Maker" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={`https://guyzmaker.com${finalOgImage}`} />
      
      {/* Canonical */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Additional Meta */}
      <meta name="language" content="fr" />
      <meta name="geo.region" content="BJ" />
      <meta name="geo.placename" content="Cotonou" />
      <meta name="ICBM" content="6.3945;2.4319" />
    </Helmet>
  );
}

export default SEO;
