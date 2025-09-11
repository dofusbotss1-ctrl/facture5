import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useSupplier } from '../../contexts/SupplierContext';
import { Search, FileText, Users, Package, Truck, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { invoices, clients, products, quotes } = useData();
  const { suppliers } = useSupplier();

  // Générer les résultats de recherche
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];

    const results: any[] = [];
    const searchTerm = query.toLowerCase();

    // Rechercher dans les factures
    invoices
      .filter(invoice => 
        invoice.number.toLowerCase().includes(searchTerm) ||
        invoice.client.name.toLowerCase().includes(searchTerm)
      )
      .slice(0, 3)
      .forEach(invoice => {
        results.push({
          id: `invoice-${invoice.id}`,
          type: 'invoice',
          title: `Facture ${invoice.number}`,
          subtitle: `Client: ${invoice.client.name} • ${invoice.totalTTC.toLocaleString()} MAD`,
          href: '/invoices',
          icon: FileText,
          color: 'text-teal-600',
          bgColor: 'bg-teal-50 dark:bg-teal-900/20'
        });
      });

    // Rechercher dans les devis
    quotes
      .filter(quote => 
        quote.number.toLowerCase().includes(searchTerm) ||
        quote.client.name.toLowerCase().includes(searchTerm)
      )
      .slice(0, 3)
      .forEach(quote => {
        results.push({
          id: `quote-${quote.id}`,
          type: 'quote',
          title: `Devis ${quote.number}`,
          subtitle: `Client: ${quote.client.name} • ${quote.totalTTC.toLocaleString()} MAD`,
          href: '/quotes',
          icon: FileText,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        });
      });

    // Rechercher dans les clients
    clients
      .filter(client => 
        client.name.toLowerCase().includes(searchTerm) ||
        client.ice.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
      )
      .slice(0, 3)
      .forEach(client => {
        results.push({
          id: `client-${client.id}`,
          type: 'client',
          title: client.name,
          subtitle: `ICE: ${client.ice} • ${client.email}`,
          href: '/clients',
          icon: Users,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        });
      });

    // Rechercher dans les produits
    products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
      .slice(0, 3)
      .forEach(product => {
        results.push({
          id: `product-${product.id}`,
          type: 'product',
          title: product.name,
          subtitle: `SKU: ${product.sku} • ${product.salePrice.toLocaleString()} MAD`,
          href: '/products',
          icon: Package,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20'
        });
      });

    // Rechercher dans les fournisseurs
    suppliers
      .filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm) ||
        supplier.ice.includes(searchTerm) ||
        supplier.email.toLowerCase().includes(searchTerm)
      )
      .slice(0, 3)
      .forEach(supplier => {
        results.push({
          id: `supplier-${supplier.id}`,
          type: 'supplier',
          title: supplier.name,
          subtitle: `ICE: ${supplier.ice} • ${supplier.contactPerson}`,
          href: '/suppliers',
          icon: Truck,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        });
      });

    return results.slice(0, 8);
  }, [query, invoices, quotes, clients, products, suppliers]);

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            window.location.href = searchResults[selectedIndex].href;
            setIsOpen(false);
            setQuery('');
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setQuery('');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, searchResults]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  return (
    <div className="relative flex-1 max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Délai pour permettre les clics sur les résultats
            setTimeout(() => setIsOpen(false), 200);
          }}
          className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
          placeholder="Rechercher facture, devis, client, produit..."
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Résultats de recherche */}
      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {searchResults.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => {
                  const Icon = result.icon;
                  
                  return (
                    <Link
                      key={result.id}
                      to={result.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                      }}
                    >
                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                        className={`flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                          index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 ${result.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${result.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{result.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{result.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{result.amount}</p>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Aucun résultat pour "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}