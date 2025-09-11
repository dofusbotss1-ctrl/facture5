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
  ChevronDown, // ✅ pour le dossier Gestion
  FileCheck,
  TrendingUp,
  UserCheck,
  Truck,
  Shield,
  FolderKanban
} from 'lucide-react';

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

  // ➕ PRO expiré (spécifique à ta demande)
  const isProExpired =
    user?.company?.subscription === 'pro' &&
    user?.company?.expiryDate &&
    new Date(user.company.expiryDate) <= new Date();

  // Accès aux features PRO uniquement si actif
  const canAccessProFeatures = isProActive;

  // Activation en cours ?
  const isActivationPending = localStorage.getItem('proActivationPending') === 'true';

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

  const [isGestionOpen, setIsGestionOpen] = React.useState(false);

  // ------- Rendu d’un item
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

    const basePadding = open ? (depth === 0 ? 'px-3' : 'pl-10 pr-3') : 'px-2';
    const iconSize = open ? 'w-5 h-5' : 'w-6 h-6';

    if (canAccess) {
      return (
        <NavLink
          key={item.path}
          to={item.path}
          title={!open ? item.label : undefined}
          className={({ isActive }) =>
            `flex items-center ${open ? 'space-x-3' : 'justify-center'} ${basePadding} py-2.5 rounded-lg transition-all duration-200 group ${
              isActive ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Icon className={`${iconSize} flex-shrink-0`} />
          {open && (
            <div className="flex items-center space-x-2">
              <span className="font-medium">{item.label}</span>
              {item.isPro && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-orange-400 text-orange-900">PRO</span>
              )}
            </div>
          )}
        </NavLink>
      );
    }

    // Inaccessible (PRO mais non actif : essai Free OU PRO expiré)
    return (
      <button
        key={item.path}
        onClick={(e) => handleProFeatureClick(e, item.path)}
        title={!open ? `${item.label} (PRO)` : undefined}
        className={`w-full flex items-center ${open ? 'space-x-3' : 'justify-center'} ${basePadding} py-2.5 rounded-lg transition-all duration-200 group text-gray-500 hover:bg-red-50 hover:text-red-600`}
      >
        <Icon className={`${iconSize} flex-shrink-0 text-red-500`} />
        {open && (
          <div className="flex items-center space-x-2">
            <span className="font-medium">{item.label}</span>
            {/* 🔒 pour les items PRO non accessibles */}
            <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">🔒</span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${
        open ? 'w-50 translate-x-0' : 'w-16 translate-x-0'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between h-14 ${open ? 'px-6' : 'px-3'} border-b border-gray-200`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
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
      <nav className={`mt-6 ${open ? 'px-3' : 'px-2'}`}>
        <ul className="space-y-2">
          {/* Menu principal */}
          {visiblePrimary.map((item) => (
            <li key={item.path}>{renderItem(item)}</li>
          ))}

          {/* Dossier Gestion */}
          {visibleGestion.length > 0 && (
            <li>
              <button
                onClick={() => setIsGestionOpen((v) => !v)}
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

                {/* Libellé + badge en mode ouvert */}
                {open && (
                  <>
                    <span className="font-semibold">Gestion</span>

                    {/* ✅ Badge : PRO orange (actif) / 🔒 rouge (expiré) / PRO rouge (Free) */}
                    {isProActive ? (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold border bg-orange-50 text-orange-700 border-orange-300">
                        PRO
                      </span>
                    ) : isProExpired ? (
                      <span className="ml-2 inline-flex items-center text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                        🔒
                      </span>
                    ) : (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold border bg-red-50 text-red-700 border-red-300">
                        PRO
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

              {/* Sous-menus */}
              {isGestionOpen && (
                <ul className="mt-1 space-y-1">
                  {visibleGestion.map((item) => (
                    <li key={item.path}>{renderItem(item, 1)}</li>
                  ))}
                </ul>
              )}
            </li>
          )}

          {/* Paramètres */}
          {visibleSettings.map((item) => (
            <li key={item.path}>{renderItem(item)}</li>
          ))}
        </ul>
      </nav>

      {/* Bandeau bas (licence / rôle) */}
      <div className={`absolute bottom-6 ${open ? 'left-3 right-3' : 'left-2 right-2'}`}>
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
    </div>
  );
}
