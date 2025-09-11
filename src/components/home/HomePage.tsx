import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileText,
  Package,
  BarChart3,
  Download,
  Check,
  Star,
  ArrowRight,
  Shield,
  ShieldCheck,
  Globe,
  Users,
  Phone,
  Mail,
  MapPin,
  Gift,
  BadgeCheck,
  CalendarDays,
  PlayCircle,
  Landmark,
  ClipboardList,
  Briefcase,
  Calculator,
  PenLine,
  Wand2,
  QrCode,
  MessageSquare,
  Bell,
  Wallet,
  FolderKanban
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  // --- Features (grille principale)
  const features = [
    {
      icon: FileText,
      title: 'Devis & modèles',
      description:
        'Créez vos devis en 1 clic, conversion en facture, numérotation auto. 1 modèle en Gratuit, 5 modèles en Pro, signature électronique (Pro).'
    },
    {
      icon: Package,
      title: 'Stock & fournisseurs',
      description:
        'Suivi entrées/sorties, seuils & alertes, fiches fournisseurs, bons de commande, pièces jointes et RIB.'
    },
    {
      icon: BarChart3,
      title: 'Tableaux de bord & ventes',
      description:
        'KPIs clairs (CA, TVA, impayés), top produits/clients, prévisions et comparatifs période/par période.'
    },
    {
      icon: Landmark,
      title: 'Paiement par virement (CIH)',
      description:
        'Affichez votre RIB CIH sur la facture, QR Code RIB, bouton “J’ai payé”, preuve de virement et rapprochement.'
    },
    {
      icon: Download,
      title: 'Export comptable & PDF bilingue',
      description:
        'Documents FR/AR, exports Excel/CSV (journal ventes, TVA), sauvegardes et archivage légal.'
    },
    {
      icon: Shield,
      title: 'Sécurité & conformité',
      description:
        'Hébergement au Maroc, RGPD, chiffrement, gestion des rôles & permissions, logs d’audit.'
    }
  ];

  // --- Témoignages
  const testimonials = [
    {
      name: 'Ahmed Bennani',
      company: 'Électronique Casa',
      text: 'Facture.ma a révolutionné ma gestion. +2h gagnées chaque jour !',
      rating: 5
    },
    {
      name: 'Fatima El Alami',
      company: 'Boutique Mode Rabat',
      text: 'Simple, rapide et conforme à la loi marocaine. Parfait pour PME.',
      rating: 5
    },
    {
      name: 'Omar Tazi',
      company: 'Restaurant Le Jardin',
      text: 'Le suivi de stock m’évite les ruptures. Mes clients sont ravis.',
      rating: 5
    }
  ];

  // --- FAQ
  const faqs = [
    {
      q: "L’essai gratuit dure combien de temps ?",
      a: 'Vous avez 1 mois gratuit, sans carte bancaire et sans engagement.'
    },
    {
      q: 'Puis-je annuler à tout moment ?',
      a: 'Oui. Vous pouvez annuler l’abonnement en un clic depuis votre espace.'
    },
    {
      q: 'Mes données sont-elles sécurisées ?',
      a: 'Oui. Hébergement au Maroc, sauvegardes régulières et chiffrement TLS/at-rest.'
    },
    {
      q: 'Facture.ma est-il conforme à la loi marocaine ?',
      a: 'Oui. Toutes les mentions obligatoires (ICE, IF, RC, TVA) sont intégrées.'
    }
  ];

  // --- Animations
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* blobs décoratifs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-teal-300/30 to-blue-300/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-300/30 to-red-300/30 blur-3xl animate-pulse" />

      {/* Barre annonce */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <p className="text-sm sm:text-base font-semibold">
            🎁 Vous avez <span className="underline decoration-white/60">1 mois d’essai gratuit</span> — Sans carte bancaire — Annulation à tout moment
          </p>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md text-sm font-semibold transition"
          >
            Commencer maintenant <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Facture.ma</h1>
                <p className="text-xs text-gray-500">ERP Morocco</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-teal-600 font-medium">Accueil</a>
              <a href="#fonctionnalites" className="text-gray-700 hover:text-teal-600 font-medium">Fonctionnalités</a>
              <a href="#cih" className="text-gray-700 hover:text-teal-600 font-medium">Virement CIH</a>
              <a href="#modules" className="text-gray-700 hover:text-teal-600 font-medium">Modules</a>
              <a href="#tarifs" className="text-gray-700 hover:text-teal-600 font-medium">Tarifs</a>
              <a href="#faq" className="text-gray-700 hover:text-teal-600 font-medium">FAQ</a>
              <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium">Connexion</Link>
            </nav>

            <Link
              to="/login"
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Essai 1 mois gratuit
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="accueil" className="bg-gradient-to-br from-teal-50 to-blue-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center bg-white border border-teal-200 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                <BadgeCheck className="w-4 h-4 mr-1" /> Conforme Maroc
              </span>
              <span className="inline-flex items-center bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 mr-1" /> Sécurité bancaire
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              La facturation marocaine, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">simple et professionnelle</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Éditez vos factures, gérez votre stock et encaissez par <strong>virement bancaire (CIH)</strong>.  
              Commencez aujourd’hui — <strong>1 mois gratuit</strong>, sans carte bancaire.
            </p>

            <ul className="space-y-2 text-gray-700 mb-8">
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-teal-600" /> Mentions légales (ICE, IF, RC, TVA)</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-teal-600" /> Export comptable & PDF FR/AR</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-teal-600" /> Rôles, permissions & journal d’audit</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Gift className="w-5 h-5" />
                Commencer mon essai (1 mois)
              </Link>
              <a
                href="#tarifs"
                className="inline-flex items-center justify-center gap-2 border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <CalendarDays className="w-5 h-5" />
                Voir les tarifs
              </a>
            </div>

            <p className="mt-3 text-sm text-gray-500">Sans carte bancaire • Annulable à tout moment</p>
          </motion.div>

          {/* Mock UI */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between text-white mb-2">
                    <span className="font-semibold">Tableau de bord</span>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-white">
                    <div>
                      <p className="text-2xl font-bold">45 280</p>
                      <p className="text-sm opacity-90">MAD ce mois</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">127</p>
                      <p className="text-sm opacity-90">Factures</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">FAC-2025-001</span>
                    <span className="text-green-600 font-semibold">2 450 MAD</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">FAC-2025-002</span>
                    <span className="text-green-600 font-semibold">1 890 MAD</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-md">
                <PlayCircle className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-700">Démo interactive</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fonctionnalités principales */}
      <section id="fonctionnalites" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Tout ce dont votre entreprise a besoin
            </h2>
            <p className="text-lg text-gray-600">
              Inspiré des meilleurs standards SaaS au Maroc — simple, rapide, conforme.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Paiement par virement CIH (démo & étapes) */}
      <section id="cih" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-8 border border-amber-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="w-7 h-7 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">Virement bancaire CIH intégré</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Affichez automatiquement votre <strong>RIB CIH</strong> sur les factures, générez un <strong>QR Code RIB</strong> et laissez le client
              déclarer son virement via “<em>J’ai payé</em>”. Vous validez le règlement après réception — simple et pro.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
                  <QrCode className="w-5 h-5" /> RIB & QR Code
                </div>
                <p className="text-sm text-amber-900/90">Le RIB CIH et un QR sont insérés sur la facture PDF.</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
                  <Wallet className="w-5 h-5" /> Bouton “J’ai payé”
                </div>
                <p className="text-sm text-amber-900/90">Le client confirme son virement et ajoute la preuve.</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
                  <Check className="w-5 h-5" /> Rapprochement
                </div>
                <p className="text-sm text-amber-900/90">Vous validez la facture payée après vérification.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules & tâches détaillés */}
      <section id="modules" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Modules & tâches incluses</h2>
            <p className="text-lg text-gray-600">Tout ce qu’il faut pour piloter vos opérations au quotidien</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Devis */}
            <motion.div {...fadeUp} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Devis</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><ClipboardList className="w-4 h-4 mt-0.5 text-teal-600" /> Création, duplication, validité & conditions.</li>
                <li className="flex items-start gap-2"><PenLine className="w-4 h-4 mt-0.5 text-teal-600" /> Signature électronique (Pro) avec journal d’audit.</li>
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 mt-0.5 text-teal-600" /> Conversion en facture en 1 clic, statuts & relances.</li>
                <li className="flex items-start gap-2"><MessageSquare className="w-4 h-4 mt-0.5 text-teal-600" /> Envoi email/WhatsApp avec lien de suivi.</li>
              </ul>
            </motion.div>

            {/* Facturation */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Facturation</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-teal-600" /> Mentions légales Maroc (ICE, IF, RC, TVA).</li>
                <li className="flex items-start gap-2"><Landmark className="w-4 h-4 mt-0.5 text-teal-600" /> Virement CIH : RIB/QR, preuve & rapprochement.</li>
                <li className="flex items-start gap-2"><Download className="w-4 h-4 mt-0.5 text-teal-600" /> PDF bilingue FR/AR et envoi sécurisé.</li>
              </ul>
            </motion.div>

            {/* Gestion financière */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gestion financière</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><BarChart3 className="w-4 h-4 mt-0.5 text-teal-600" /> Suivi des paiements, impayés & échéances.</li>
                <li className="flex items-start gap-2"><Download className="w-4 h-4 mt-0.5 text-teal-600" /> Export comptable (journal ventes, TVA).</li>
                <li className="flex items-start gap-2"><Bell className="w-4 h-4 mt-0.5 text-teal-600" /> Rappels automatiques & relances intelligentes.</li>
              </ul>
            </motion.div>

            {/* Gestion humaine (RH) */}
            <motion.div {...fadeUp} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gestion humaine (RH)</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><ClipboardList className="w-4 h-4 mt-0.5 text-teal-600" /> Fiches employés, rôles & permissions.</li>
                <li className="flex items-start gap-2"><CalendarDays className="w-4 h-4 mt-0.5 text-teal-600" /> Absences, congés & affectation des tâches.</li>
                <li className="flex items-start gap-2"><MessageSquare className="w-4 h-4 mt-0.5 text-teal-600" /> Notes internes & mentions sur dossiers.</li>
              </ul>
            </motion.div>

            {/* Fournisseurs */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fournisseurs</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><ClipboardList className="w-4 h-4 mt-0.5 text-teal-600" /> Bons de commande & réception.</li>
                <li className="flex items-start gap-2"><Landmark className="w-4 h-4 mt-0.5 text-teal-600" /> RIBs, conditions & historiques d’achats.</li>
              </ul>
            </motion.div>

            {/* Stock */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Stock</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-teal-600" /> Mouvements, inventaires & variantes.</li>
                <li className="flex items-start gap-2"><Bell className="w-4 h-4 mt-0.5 text-teal-600" /> Seuils & alertes de réapprovisionnement.</li>
              </ul>
            </motion.div>

            {/* Projets */}
            <motion.div {...fadeUp} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Projets</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><ClipboardList className="w-4 h-4 mt-0.5 text-teal-600" /> Tâches, responsables & deadlines.</li>
                <li className="flex items-start gap-2"><BarChart3 className="w-4 h-4 mt-0.5 text-teal-600" /> Avancement & budget par projet.</li>
              </ul>
            </motion.div>

            {/* Rapports & TVA */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Rapports & TVA</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><Calculator className="w-4 h-4 mt-0.5 text-teal-600" /> Déclaration TVA, ventes, top clients.</li>
                <li className="flex items-start gap-2"><Download className="w-4 h-4 mt-0.5 text-teal-600" /> Exports Excel/CSV prêts pour le comptable.</li>
              </ul>
            </motion.div>

            {/* Templates & Branding */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Templates & Branding</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 mt-0.5 text-teal-600" /> 1 template (Gratuit), 5 templates (Pro).</li>
                <li className="flex items-start gap-2"><PenLine className="w-4 h-4 mt-0.5 text-teal-600" /> Logo, couleurs et signature électronique (Pro).</li>
              </ul>
            </motion.div>

            {/* Automations & Rappels */}
            <motion.div {...fadeUp} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automations & rappels</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><MessageSquare className="w-4 h-4 mt-0.5 text-teal-600" /> Relances automatiques des impayés.</li>
                <li className="flex items-start gap-2"><CalendarDays className="w-4 h-4 mt-0.5 text-teal-600" /> Notifications d’échéance & tâches.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Tarifs simples & transparents</h2>
            <p className="text-lg text-gray-600">Commencez gratuitement — <strong>1er mois offert</strong></p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Gratuit */}
            <motion.div {...fadeUp} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Gratuit</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">0 MAD</div>
                <p className="text-gray-600">Pour démarrer</p>
              </div>
              <ul className="space-y-3 mb-8 text-gray-800">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 10 factures</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 10 devis</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 10 fournisseurs</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 10 clients</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 20 produits</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 1 utilisateur</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> 1 template facture & devis</li>
              </ul>
              <Link
                to="/login"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold text-center block transition"
              >
                Commencer gratuitement
              </Link>
            </motion.div>

            {/* Pro */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="relative bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                  1er mois gratuit
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-1">Pro</h3>
                <div className="text-4xl font-bold mb-1">299 MAD</div>
                <p className="opacity-90">par mois</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Factures, devis, fournisseurs, clients, produits <strong>illimités</strong></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> 6 utilisateurs</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> 5 templates</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Signature électronique</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Gestion fournisseur</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Gestion stock</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Gestion projet</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Gestion financière</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-yellow-300" /> Gestion humaine</li>
              </ul>
              <Link
                to="/login"
                className="w-full bg-white text-teal-600 hover:bg-gray-100 py-3 px-6 rounded-lg font-semibold text-center block transition"
              >
                Démarrer l’essai Pro (1 mois)
              </Link>
              <p className="mt-3 text-center text-white/90 text-sm">Sans carte bancaire • Annulable à tout moment</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Ils nous font confiance</h2>
            <p className="text-lg text-gray-600">+1000 entreprises marocaines utilisent Facture.ma</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.05 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">PME</p>
              </div>
              <div className="text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">Commerces</p>
              </div>
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">Distributeurs</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.details key={i} {...fadeUp} className="bg-white border border-gray-200 rounded-lg p-5">
                <summary className="cursor-pointer font-semibold text-gray-900">{f.q}</summary>
                <p className="mt-2 text-gray-700">{f.a}</p>
              </motion.details>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              Démarrer mon essai gratuit (1 mois) <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-2 text-sm text-gray-500">Sans CB • Annulation à tout moment</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Facture.ma</h3>
                  <p className="text-sm text-gray-400">ERP Morocco</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                La solution ERP marocaine qui simplifie votre gestion : facturation, stock, ventes — tout en un.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+212 522 123 456</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>contact@facture.ma</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Avenue Mohammed V<br />Casablanca, Maroc</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@facture.ma</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+212 522 123 456</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Facture.ma. Tous droits réservés. Made with ❤️ in Morocco 🇲🇦</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
