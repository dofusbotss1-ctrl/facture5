import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { DollarSign, FileText, Users, Package } from 'lucide-react';

export default function StatsCards() {
  const { t } = useLanguage();
  const { clients, products, invoices } = useData();

  // Chiffre d'affaires total des factures créées cette année
  const currentYear = new Date().getFullYear();
  const paidInvoices = invoices.filter(invoice => 
    new Date(invoice.createdAt).getFullYear() === currentYear && 
    (invoice.status === 'paid' || invoice.status === 'collected')
  );
  
  const totalRevenue = paidInvoices
    .reduce((sum, invoice) => sum + invoice.totalTTC, 0);

  // Nombre total de factures créées cette année
  const totalInvoicesThisYear = invoices.filter(invoice => 
    new Date(invoice.createdAt).getFullYear() === currentYear
  ).length;

  // Factures en attente de paiement
  const unpaidInvoices = invoices.filter(invoice => 
    new Date(invoice.createdAt).getFullYear() === currentYear && 
    invoice.status === 'unpaid'
  ).length;

  const stats = [
    {
      title: 'CA Encaissé ' + currentYear,
      value: `${totalRevenue.toLocaleString()} MAD`,
      subtitle: 'Factures payées/encaissées',
      icon: DollarSign,
      bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
      title: 'Factures Non Payées',
      value: unpaidInvoices.toString(),
      subtitle: 'En attente de paiement',
      icon: FileText,
      bgColor: 'bg-gradient-to-br from-red-500 to-pink-600',
    },
    {
      title: 'Total Clients',
      value: clients.length.toString(),
      subtitle: 'Clients enregistrés',
      icon: Users,
      bgColor: 'bg-gradient-to-br from-violet-500 to-purple-600',
    },
    {
      title: 'Total Produits',
      value: products.length.toString(),
      subtitle: 'Produits en catalogue',
      icon: Package,
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02, 
              y: -4,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 group cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <motion.p 
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.subtitle}
                  </p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}