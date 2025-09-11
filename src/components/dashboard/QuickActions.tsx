import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, FileText, Users, Package, Zap } from 'lucide-react';

const quickActions = [
  {
    title: 'Nouvelle Facture',
    description: 'Créer une facture rapidement',
    icon: FileText,
    href: '/invoices/create',
    color: 'from-teal-500 to-blue-500',
    hoverColor: 'hover:from-teal-600 hover:to-blue-600'
  },
  {
    title: 'Nouveau Devis',
    description: 'Proposer un devis client',
    icon: FileText,
    href: '/quotes/create',
    color: 'from-purple-500 to-indigo-500',
    hoverColor: 'hover:from-purple-600 hover:to-indigo-600'
  },
  {
    title: 'Ajouter Client',
    description: 'Nouveau client dans la base',
    icon: Users,
    href: '/clients',
    color: 'from-emerald-500 to-teal-500',
    hoverColor: 'hover:from-emerald-600 hover:to-teal-600'
  },
  {
    title: 'Ajouter Produit',
    description: 'Enrichir votre catalogue',
    icon: Package,
    href: '/products',
    color: 'from-orange-500 to-red-500',
    hoverColor: 'hover:from-orange-600 hover:to-red-600'
  }
];

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actions Rapides</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Accès direct aux fonctions principales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={action.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl bg-gradient-to-r ${action.color} ${action.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-200 group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{action.title}</h4>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}