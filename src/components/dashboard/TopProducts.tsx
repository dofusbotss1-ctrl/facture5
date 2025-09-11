import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
import { Package, Trophy } from 'lucide-react';

export default function TopProducts() {
  const { t } = useLanguage();
  const { products, invoices } = useData();

  // Calculer les ventes réelles par produit
  const productSales = products.map(product => {
    let totalQuantity = 0;
    let totalRevenue = 0;
    
    invoices.forEach(invoice => {
      invoice.items.forEach(item => {
        if (item.description === product.name) {
          totalQuantity += item.quantity;
          totalRevenue += item.total;
        }
      });
    });
    
    return {
      name: product.name,
      sales: totalQuantity,
      revenue: totalRevenue,
      category: product.category || 'Non catégorisé',
      uniti: product.unit || 'unité'
    };
  });
  
  // Trier par quantité vendue et prendre le top 3
  const topProducts = productSales
    .filter(product => product.sales > 0)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top 3 Produits les Plus Vendus
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Classement par quantité vendue
          </p>
        </div>
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg"
        >
          <Trophy className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      <div className="space-y-4">
        {topProducts.length > 0 ? (
          topProducts.map((product, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                      index === 0
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                        : index === 1
                        ? 'bg-gradient-to-br from-gray-400 to-gray-600'
                        : 'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}
                  >
                    #{index + 1}
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {product.revenue.toLocaleString()} MAD
                  </motion.span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {product.sales.toFixed(3)} {product.uniti}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Aucun produit enregistré</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Ajoutez des produits pour voir les statistiques
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
