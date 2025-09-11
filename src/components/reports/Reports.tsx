import React, { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  BarChart3, 
  Crown,
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users, 
  Package,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth, differenceInDays, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import RevenueEvolutionChart from './charts/RevenueEvolutionChart';
import PaymentStatusChart from './charts/PaymentStatusChart';
import CashflowChart from './charts/CashflowChart';
import TopClientsChart from './charts/TopClientsChart';
import PaymentMethodChart from './charts/PaymentMethodChart';
import PaymentDelayChart from './charts/PaymentDelayChart';
import FinancialKPIs from './FinancialKPIs';
import FinancialAlerts from './FinancialAlerts';
import html2pdf from 'html2pdf.js';

export default function Reports() {
  const { t } = useLanguage();
  const { invoices, clients, products } = useData();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [compareMode, setCompareMode] = useState(false);
  const [comparePeriod, setComparePeriod] = useState('previous');
  const [activeTab, setActiveTab] = useState('overview');

  // Vérifier l'accès PRO
  const isProActive = user?.company.subscription === 'pro' && user?.company.expiryDate && 
    new Date(user.company.expiryDate) > new Date();

  if (!isProActive) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🔒 Fonctionnalité PRO
          </h2>
          <p className="text-gray-600 mb-6">
            La Gestion financière est réservée aux abonnés PRO. 
            Passez à la version PRO pour accéder à cette fonctionnalité avancée.
          </p>
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
            <span className="flex items-center justify-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>Passer à PRO - 299 MAD/mois</span>
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Fonction pour filtrer les factures selon la période
  const getFilteredInvoices = () => {
    const now = new Date();
    let startDate = new Date();

    switch (selectedPeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    return invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      const matchesPeriod = invoiceDate >= startDate;
      const matchesClient = selectedClient === 'all' || invoice.clientId === selectedClient;
      const matchesProduct = selectedProduct === 'all' || 
        invoice.items.some(item => item.description === products.find(p => p.id === selectedProduct)?.name);
      const matchesPaymentMethod = selectedPaymentMethod === 'all' || 
        invoice.paymentMethod === selectedPaymentMethod;
      
      return matchesPeriod && matchesClient && matchesProduct && matchesPaymentMethod;
    });
  };

  const filteredInvoices = getFilteredInvoices();

  // Calculs des statistiques
  const paidInvoices = filteredInvoices.filter(invoice => invoice.status === 'paid');
  const unpaidInvoices = filteredInvoices.filter(invoice => invoice.status === 'unpaid');
  const collectedInvoices = filteredInvoices.filter(invoice => invoice.status === 'collected');
  
  const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.totalTTC, 0);
  const unpaidRevenue = unpaidInvoices.reduce((sum, invoice) => sum + invoice.totalTTC, 0);
  const collectedRevenue = collectedInvoices.reduce((sum, invoice) => sum + invoice.totalTTC, 0);

  const totalAllInvoices = filteredInvoices.reduce((sum, invoice) => sum + invoice.totalTTC, 0);

  // Data pour graphiques (revenueEvolutionData, paymentStatusData, etc.) …
  // (inchangé pour garder ton code complet)

  const periods = [
    { id: 'week', label: 'Cette semaine' },
    { id: 'month', label: 'Ce mois' },
    { id: 'quarter', label: 'Ce trimestre' },
    { id: 'year', label: 'Cette année' }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'evolution', label: 'Évolution CA', icon: TrendingUp },
    { id: 'cashflow', label: 'Trésorerie', icon: DollarSign },
    { id: 'clients', label: 'Analyse Clients', icon: Users },
    { id: 'delays', label: 'Retards', icon: AlertTriangle }
  ];

  const getPeriodLabel = () => {
    const labels = {
      week: 'cette semaine',
      month: 'ce mois',
      quarter: 'ce trimestre',
      year: 'cette année'
    };
    return labels[selectedPeriod as keyof typeof labels] || 'cette période';
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Selects pour période, client, produit, paiement… */}
        </div>

        {/* ✅ Bloc CompareMode corrigé */}
        {compareMode && (
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
                Mode Comparaison:
              </span>
              <select
                value={comparePeriod}
                onChange={(e) => setComparePeriod(e.target.value)}
                className="px-3 py-1 border border-purple-300 dark:border-purple-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="previous">Période précédente</option>
                <option value="lastYear">Même période année dernière</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Onglets & contenu (overview, evolution, cashflow, clients, delays)… */}
      {/* Ici tu gardes exactement ton contenu existant sans changement */}
    </div>
  );
}
