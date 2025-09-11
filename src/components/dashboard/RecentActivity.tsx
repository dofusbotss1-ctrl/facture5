import React from 'react';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
import { Activity, FileText, Users, Package, Clock } from 'lucide-react';

export default function RecentActivity() {
  const { invoices, clients, products, quotes } = useData();

  // Combiner toutes les activités récentes
  const recentActivities = [
    ...invoices.slice(0, 3).map(invoice => ({
      id: `invoice-${invoice.id}`,
      type: 'invoice',
      title: `Facture ${invoice.number}`,
      description: `Client: ${invoice.client.name}`,
      amount: `${invoice.totalTTC.toLocaleString()} MAD`,
      date: invoice.createdAt,
      icon: FileText,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20'
    })),
    ...quotes.slice(0, 2).map(quote => ({
      id: `quote-${quote.id}`,
      type: 'quote',
      title: `Devis ${quote.number}`,
      description: `Client: ${quote.client.name}`,
      amount: `${quote.totalTTC.toLocaleString()} MAD`,
      date: quote.createdAt,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    })),
    ...clients.slice(0, 2).map(client => ({
      id: `client-${client.id}`,
      type: 'client',
      title: `Nouveau client`,
      description: client.name,
      amount: `ICE: ${client.ice}`,
      date: client.createdAt,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    })),
    ...products.slice(0, 2).map(product => ({
      id: `product-${product.id}`,
      type: 'product',
      title: `Nouveau produit`,
      description: product.name,
      amount: `${product.salePrice.toLocaleString()} MAD`,
      date: product.createdAt,
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffMinutes > 0) return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    return 'À l\'instant';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activité Récente</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Dernières actions effectuées</p>
        </div>
      </div>

      <div className="space-y-3">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center space-x-4 p-4 rounded-lg ${activity.bgColor} hover:shadow-md transition-all duration-200 cursor-pointer group`}
              >
                <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${activity.color}`}>{activity.amount}</p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{getTimeAgo(activity.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Aucune activité récente</p>
          </div>
        )}
      </div>
    </div>
  );
}