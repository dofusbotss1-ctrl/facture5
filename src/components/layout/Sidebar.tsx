// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLicense } from '../../contexts/LicenseContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  BarChart3,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileCheck,
  TrendingUp,
  UserCheck,
  Truck,
  Shield,
  FolderKanban
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onUpgrade: () => void;
}

export default function Sidebar({ open, setOpen, onUpgrade }: SidebarProps) {
  const { t } = useLanguage();
  const { licenseType } = useLicense();
  const { user } = useAuth();

  // ------- Abonnement PRO
  const isProActive =
    user?.company?.subscription === 'pro' &&
    user?.company?.expiryDate &&
    new Date(user.company.expiryDate) > new Date();

  const isProExpired =
    user?.company?.subscription === 'pro' &&
    user?.company?.expiryDate &&
    new Date(user.company.expiryDate) <= new Date();

  // Accès aux features PRO uniquement si actif
  const canAccessProFeatures = isProActive;

  // Activation en cours ?
  const isActivationPending = typeof window !== 'undefined' && localStorage.getItem('proActivationPending') === 'true';

  // ------- Permissions
  const hasPermission = (permission: string) => {
    if (user?.isAdmin) return true;
    if (!user?.permissions) return false;
    return Boolean(user.permissions[permission as keyof typeof user.permissions]);
  };

  const handleProFeatureClick = (e: React.MouseEvent, path: string) => {
    if (!canAccessProFeatures) {
      e.preventDefault();
      onUpgrade();
    }
  };

  // ------- Menus
  const primaryMenu = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/dashboard', permission: 'dashboard' },
    { icon: FileText, label: t('invoices'), path: '/invoices', permission: 'invoices' },
    { icon: FileCheck, label: 'Devis', path: '/quotes', permission: 'quotes' },
    { icon: Users, label: t('clients'), path: '/clients', permission: 'clients' },
    { icon: Package, label: t('products'), path: '/products', permission: 'products' },
    { icon: Truck, label: t('Fournisseurs'), path: '/suppliers', permission: 'suppliers' }
  ];

  const gestionMenu = [
    { icon: FolderKanban, label: 'Gestion de Projet', path: '/project-management', isPro: true, permission: 'projectManagement' },
    { icon: Truck, label: 'Gest. Fournisseurs', path: '/supplier-management', isPro: true, permission: 'supplierManagement' },
    { icon: TrendingUp, label: 'Gest. de Stock', path: '/stock-management', isPro: true, permission: 'stockManagement' },
    { icon: BarChart3, label: 'Gest. financière', path: '/reports', isPro: true, permission: 'reports' },
    { icon: UserCheck, label: 'Gest. Humaine', path: '/hr-management', isPro: true, permission: 'hrManagement' },
    { icon: Shield, label: 'Gest. de Compte', path: '/account-management', isPro: true, permission: 'settings' }
  ];

  const settingsMenu = [{ icon: Settings, label: t('settings'), path: '/settings', permission: 'settings' }];

  const visiblePrimary = primaryMenu.filter((i) => hasPermission(i.permission || ''));
  const visibleGestion = gestionMenu.filter((i) => hasPermission(i.permission || ''));
  const visibleSettings = settingsMenu.filter((i) => hasPermission(i.permission || ''));

  // Etat du dossier & hover pour panneau volant en mode réduit
  const [isGestionOpen, setIsGestionOpen] = React.useState(false);
  const [hoverGestion, setHoverGestion] = React.useState(false);

  // ------- Rendu d’un item de menu
  const renderItem = (
    item: {
      icon: any;
      label: string;
      path: string;
      isPro?: boolean;
    },
    depth: number = 0
  ) => {
    const Icon = item.icon;
    const isProFeature = item.isPro;
    const canAccess = !isProFeature || canAccessProFeatures;

    const padding = open ? (depth === 0 ? 'px-3' : 'pl-10 pr-3') : 'px-2';
    const iconSize = open ? 'w-5 h-5' : 'w-6 h-6';

    // Template pour un lien (actif/inactif) avec indicator animé
    const LinkTemplate = (isActive: boolean) => (
      <div
        className={`relative flex items-center ${open ? 'space-x-3' : 'justify-center'} ${padding} py-2.5 rounded-lg transition-all duration-200 group ${
          isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {/* Barre active côté gauche */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-bar"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1.5 rounded-r-full bg-gradient-to-b from-teal-500 to-blue-500"
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            />
          )}
        </AnimatePresence>

        {/* Icône avec micro-anim */}
        <motion.div whileHover={{ rotate: 0.0001, scale: 1.05 }} className="relative z-[1]">
          <Icon className={`${iconSize} flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
        </motion.div>

        {/* Libellé + badge PRO (quand ouvert) */}
        {open && (
          <div className="relative z-[1] flex items-center space-x-2">
            <span className="font-medium">{item.label}</span>
            {item.isPro && canAccess && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold border bg-orange-50 text-orange-700 border-orange-300">
                PRO
              </span>
            )}
          </div>
        )}

        {/* Halo animé derrière l'item actif */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-halo"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500"
              style={{ opacity: 0.12 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    );

    if (canAccess) {
      return (
        <NavLink
          key={item.path}
          to={item.path}
          title={!open ? item.label : undefined}
          className={({ isActive }) =>
            `relative overflow-hidden rounded-lg ${isActive ? 'shadow-lg' : ''}`
          }
        >
          {({ isActive }) => LinkTemplate(isActive)}
        </NavLink>
      );
    }

    // Inaccessible (PRO non actif / expiré) -> bouton qui ouvre upgrade
    return (
      <button
        key={item.path}
        onClick={(e) => handleProFeatureClick(e, item.path)}
        title={!open ? `${item.label} (PRO)` : undefined}
        className={`w-full relative overflow-hidden rounded-lg`}
      >
        <div className={`relative flex items-center ${open ? 'space-x-3' : 'justify-center'} ${padding} py-2.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all`}>
          <Icon className={`${iconSize} flex-shrink-0 text-red-500`} />
          {open && (
            <div className="flex items-center space-x-2">
              <span className="font-medium">{item.label}</span>
              {/* 🔒 rouge : tu l’avais demandé pour l'abonnement expiré / non accessible */}
              <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">🔒</span>
            </div>
          )}
        </div>
      </button>
    );
  };

  // Variants animation
  const collapseVariants = {
    open: { width: 256 },
    closed: { width: 64 }
  };

  const subMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    show: { height: 'auto', opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  return (
    <motion.aside
      initial={false}
      animate={open ? 'open' : 'closed'}
      variants={collapseVariants}
      className="fixed inset-y-0 left-0 z-50 border-r border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl"
    >
      {/* Bande verticale décorative (léger gradient bleu) */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-teal-500 to-blue-600" />

      {/* Header */}
      <div className={`flex items-center justify-between h-14 ${open ? 'px-6' : 'px-3'} border-b border-gray-200`}>
        <div className="flex items-center space-x-3">
          <motion.div whileHover={{ rotate: 10 }} className="w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg grid place-items-center">
            <Building2 className="w-5 h-5 text-white" />
          </motion.div>
          {open && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Facture.ma</h1>
              <p className="text-xs text-gray-500">ERP Morocco (V.1.25.5)</p>
            </div>
          )}
        </div>
        <div className="hidden lg:block">
          <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            {open ? <ChevronLeft className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`mt-6 ${open ? 'px-3' : 'px-2'} relative h-[calc(100%-7.5rem)] overflow-y-auto`}>
        <ul className="space-y-2">
          {/* Menu principal */}
          {visiblePrimary.map((item) => (
            <li key={item.path}>{renderItem(item)}</li>
          ))}

          {/* Dossier Gestion */}
          {visibleGestion.length > 0 && (
            <li
              onMouseEnter={() => setHoverGestion(true)}
              onMouseLeave={() => setHoverGestion(false)}
              className="relative"
            >
              <button
                onClick={() => open && setIsGestionOpen((v) => !v)}
                className={`w-full flex items-center ${open ? 'space-x-3 px-3' : 'justify-center px-2'} py-2.5 rounded-lg transition-all duration-200 group text-gray-700 hover:bg-gray-100`}
                title={!open ? 'Gestion' : undefined}
              >
                {/* Icône + pastille en mode réduit */}
                <div className="relative">
                  <FolderKanban className={`${open ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0`} />
                  {!open && (
                    <span
                      className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-white ${
                        isProActive ? 'bg-orange-400' : 'bg-red-500'
                      }`}
                    />
                  )}
                </div>

                {/* Libellé + badge si ouvert */}
                {open && (
                  <>
                    <span className="font-semibold">Gestion</span>
                    {/* Badge : PRO orange / 🔒 si expiré / PRO rouge si Free */}
                    {isProActive ? (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold border bg-orange-50 text-orange-700 border-orange-300">
                        PRO
                      </span>
                    ) : isProExpired ? (
                      <span className="ml-2 inline-flex items-center text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                        🔒
                      </span>
                    ) : (
                     <span className="ml-2 inline-flex items-center text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                        🔒
                      </span>
                    )}
                    <span className="ml-auto text-xs text-gray-500">{visibleGestion.length}</span>
                    {isGestionOpen ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </>
                )}
              </button>

              {/* Sous-menus (version intérieure quand la sidebar est ouverte) */}
              <AnimatePresence initial={false}>
                {open && isGestionOpen && (
                  <motion.ul
                    key="gestion-open"
                    variants={subMenuVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mt-1 space-y-1"
                  >
                    {visibleGestion.map((item) => (
                      <li key={item.path}>{renderItem(item, 1)}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Panneau volant (hover) quand la sidebar est réduite */}
              <AnimatePresence>
                {!open && hoverGestion && (
                  <motion.div
                    key="gestion-flyout"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-full top-0 ml-2 w-64 rounded-xl border border-gray-200 bg-white shadow-2xl p-2"
                  >
                    <div className="px-2 py-2 text-xs font-semibold text-gray-600">Gestion</div>
                    <ul className="space-y-1">
                      {visibleGestion.map((item) => (
                        <li key={item.path}>{renderItem(item, 1)}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}

          {/* Paramètres */}
          {visibleSettings.map((item) => (
            <li key={item.path}>{renderItem(item)}</li>
          ))}
        </ul>
      </nav>

      {/* Bandeau bas (licence / rôle) */}
      <div className={`absolute bottom-4 ${open ? 'left-3 right-3' : 'left-2 right-2'}`}>
        {user && (
          <div
            className={`mb-3 ${open ? 'p-2' : 'p-1'} rounded-lg text-center ${open ? 'text-xs' : 'text-[10px]'} ${
              user.email === 'admin@facture.ma'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                : user.isAdmin
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
            }`}
          >
            {open
              ? user.email === 'admin@facture.ma'
                ? '🔧 Admin Plateforme'
                : user.isAdmin
                ? '👑 Administrateur'
                : '👤 Utilisateur'
              : user.email === 'admin@facture.ma'
              ? '🔧'
              : user.isAdmin
              ? '👑'
              : '👤'}
          </div>
        )}

        {/* Carte d’état Pro / Upgrade */}
        {isProActive ? (
          <div className={`bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg ${open ? 'p-3' : 'p-2'} text-white text-center`}>
            <div className={`${open ? 'text-xs' : 'text-[10px]'} font-medium ${open ? 'mb-1' : ''}`}>{open ? '👑 Pro' : '👑'}</div>
            {user?.company?.expiryDate &&
              (() => {
                const currentDate = new Date();
                const expiry = new Date(user.company.expiryDate);
                const timeDiff = expiry.getTime() - currentDate.getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                return (
                  <div className={`${open ? 'text-xs' : 'text-[8px]'} ${daysRemaining <= 5 ? 'animate-pulse font-bold' : 'opacity-90'}`}>
                    {daysRemaining <= 5 && daysRemaining > 0 ? (
                      <span className="text-yellow-200">
                        {open ? `⚠️ Expire dans ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''}` : '⚠️'}
                      </span>
                    ) : daysRemaining <= 0 ? (
                      <span className="text-red-200">{open ? '❌ Expiré' : '❌'}</span>
                    ) : (
                      <span>
                        {open
                          ? `Expire le: ${expiry.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`
                          : expiry.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' })}
                      </span>
                    )}
                  </div>
                );
              })()}
          </div>
        ) : isActivationPending ? (
          <div className={`bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg ${open ? 'p-3' : 'p-2'} text-white text-center`}>
            <div className={`${open ? 'text-xs' : 'text-[10px]'} font-medium ${open ? 'mb-1' : ''}`}>{open ? '⏳ Activation en cours' : '⏳'}</div>
            {open && <div className="text-xs opacity-90">Traitement sous 2h</div>}
          </div>
        ) : user?.isAdmin ? (
          <button
            onClick={onUpgrade}
            title={!open ? 'Acheter version Pro' : undefined}
            className={`w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-lg ${open ? 'p-3' : 'p-2'} text-white text-center transition-all duration-200 hover:shadow-lg`}
          >
            <div className={`${open ? 'text-xs' : 'text-[10px]'} font-medium`}>{open ? '🆓 Free - Acheter version Pro' : '🆓'}</div>
          </button>
        ) : (
          <div className={`bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg ${open ? 'p-3' : 'p-2'} text-white text-center`}>
            <div className={`${open ? 'text-xs' : 'text-[10px]'} font-medium`}>{open ? '👤 Compte Utilisateur' : '👤'}</div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
