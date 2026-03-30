import React, { useState, useEffect } from 'react';
import { generateFakeTransactions, Transaction } from './data';
import { LogOut, User, Search, FileSpreadsheet, Printer, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    setTransactions(generateFakeTransactions(100));
  }, []);

  const totalRecords = 4392;
  const totalVolume = "46 746,31 Ltr";
  const totalAmount = "DHS 598 212,28";

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = transactions.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(transactions.length / pageSize);

  return (
    <div className="min-h-screen bg-white text-[12px] font-sans">
      {/* Maintenance Alert (Hidden by default as in the original) */}
      <div id="SSFSpiritHeaderlnk_vacuum_alert" className="hidden fixed inset-0 z-[5000]">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative bg-white w-[600px] h-[250px] mx-auto mt-[100px] p-12 text-center shadow-xl">
          <img src="https://picsum.photos/seed/warning/60/60" alt="warning" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Fusion is performing maintenance on the database</h1>
          <p className="text-lg">Do not reboot or shutdown. It can take several minutes...</p>
        </div>
      </div>

      {/* Top Header */}
      <header className="w-full border-collapse">
        <div className="flex items-start">
          <div className="relative w-[168px] h-[56px] bg-[#f0f0f0] border-r border-gray-300">
             <div className="p-2 font-bold text-legacy-blue italic text-xl">FUSION</div>
             <div className="absolute left-[60px] bottom-[5px] text-[10px] text-gray-600">Rel-5.19.6</div>
          </div>
          <div className="flex-1">
            <div className="h-[27px] bg-[url('https://ais-dev-2q3gkgb6jyhn2otuyi52tg-626333564488.europe-west2.run.app/Toutes%20les%20transactions_files/cabeza_back_1.gif')] bg-repeat-x border-b border-gray-300 flex items-center px-2 justify-between bg-[#2C5F93]/10">
              <div className="flex items-center gap-2">
                <span>Utilisateur</span>
                <User size={14} className="text-gray-600" />
                <strong className="text-black">APPOLLO (fr-FR)</strong>
                <span className="ml-4 text-gray-600">Station APPOLLO JAD FES(en) Numéro 00001</span>
              </div>
              <div className="flex items-center gap-4">
                <span id="timer">{new Date().toLocaleString('fr-FR')}</span>
                <button className="flex items-center gap-1 bg-white border border-gray-400 px-2 py-0.5 rounded text-[11px] hover:bg-gray-100">
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <div className="h-[29px] bg-[#2C5F93] border-b border-legacy-border flex items-center px-4">
              <nav className="flex gap-1">
                {['Configuration', 'Opération', 'Gestion cuve', 'Rapports', 'POS', 'Utilisateurs'].map((item) => (
                  <button key={item} className="text-white px-3 py-1 hover:underline cursor-pointer border-r border-white/20 last:border-0">
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="legacy-header-cell flex justify-between items-center px-2 py-1">
        <div className="text-black font-bold">
          HOME &gt; Rapports &gt; Transactions &gt; Toutes les transactions
        </div>
        <div className="flex items-center gap-4">
          <button className="text-legacy-blue hover:underline flex items-center gap-1">
            <Printer size={14} />
            Imprimer page
          </button>
        </div>
      </div>

      <main className="p-4">
        {/* Search Form */}
        <section className="mb-6 max-w-2xl">
          <div className="border border-legacy-border rounded-sm overflow-hidden">
            <div className="bg-legacy-blue text-white px-3 py-1 font-bold flex items-center gap-2">
              <Search size={14} />
              Rechercher
            </div>
            <div className="p-4 bg-[#f9f9f9] grid grid-cols-1 gap-y-2">
              <div className="flex items-center">
                <label className="w-32 font-bold">Période</label>
                <div className="flex gap-2 items-center">
                  <input type="text" defaultValue="17/03/2026" className="border border-gray-400 px-1 w-24 bg-white" />
                  <span>au</span>
                  <input type="text" defaultValue="18/03/2026" className="border border-gray-400 px-1 w-24 bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-32 font-bold">Heure début</label>
                <div className="flex gap-2 items-center">
                  <input type="text" placeholder="00:00:00" className="border border-gray-400 px-1 w-24 bg-white" />
                  <span>Heure fin</span>
                  <input type="text" placeholder="23:59:59" className="border border-gray-400 px-1 w-24 bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-32 font-bold">Pompe</label>
                <select className="border border-gray-400 px-1 w-48 bg-white">
                  <option>Sélectionner Valeur</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-32 font-bold">Carburant</label>
                <select className="border border-gray-400 px-1 w-48 bg-white">
                  <option>Sélectionner Valeur</option>
                  <option>GASOIL</option>
                  <option>SSP</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-32 font-bold">Type de ticket</label>
                <select className="border border-gray-400 px-1 w-48 bg-white">
                  <option>Sélectionner Valeur</option>
                  <option>Ventes non contrôlées</option>
                  <option>Ventes</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-gray-200 border border-gray-500 px-4 py-1 hover:bg-gray-300 active:bg-gray-400 rounded-sm">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Export Button */}
        <div className="mb-4">
          <button className="flex items-center gap-2 bg-green-700 text-white px-3 py-1 rounded-sm hover:bg-green-800 transition-colors">
            <FileSpreadsheet size={16} />
            Exporter vers Excel
          </button>
        </div>

        <div id="mid_warn" className="bg-[#fff5c6] border border-gray-400 p-2 mb-4 flex items-center gap-2">
          <img src="https://picsum.photos/seed/warning-icon/25/25" alt="warning" />
          <span>The highlighted transactions below have an invalid MID checksum</span>
        </div>

        {/* Data Grid */}
        <section className="overflow-x-auto">
          <div className="border border-legacy-border rounded-sm overflow-hidden">
            <div className="bg-legacy-blue text-white px-3 py-1 font-bold">
              Ventes carburant
            </div>
            <div className="bg-[#f2f2f2] px-3 py-2 border-b border-gray-300 font-medium">
              Total des Enregistrements : {totalRecords} -- Total volume: {totalVolume} -- Montant total: {totalAmount}
            </div>
            <table className="w-full border-collapse legacy-table">
              <thead>
                <tr>
                  <th>N° Ticket</th>
                  <th>Date fin</th>
                  <th>Heure fin</th>
                  <th>Pompe</th>
                  <th>pistolet</th>
                  <th>Carburant</th>
                  <th>Volume</th>
                  <th>Vol Temp Compensée</th>
                  <th>Prix</th>
                  <th>Montant</th>
                  <th>Index début</th>
                  <th>Index fin</th>
                  <th>Temp moy</th>
                  <th>Type de ticket</th>
                  <th>Type de paiement</th>
                  <th className="hidden">Fleet Card Number</th>
                  <th className="hidden">Mercado Pago Id</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((tx, idx) => (
                  <tr key={tx.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F5]'}>
                    <td className="text-right text-legacy-blue underline cursor-pointer">{tx.id}</td>
                    <td>{tx.date}</td>
                    <td>{tx.time}</td>
                    <td className="text-right">{tx.pump}</td>
                    <td className="text-right">{tx.nozzle}</td>
                    <td className="whitespace-nowrap">{tx.fuelType}</td>
                    <td className="text-right">{tx.volume} Ltr</td>
                    <td className="text-right">{tx.volumeTC} Ltr</td>
                    <td className="text-right whitespace-nowrap">{tx.price}</td>
                    <td className="text-right whitespace-nowrap font-bold">{tx.amount}</td>
                    <td className="text-right">{tx.indexStart} Ltr</td>
                    <td className="text-right">{tx.indexEnd} Ltr</td>
                    <td className="text-right">{tx.tempAvg}</td>
                    <td className="text-right">{tx.ticketType}</td>
                    <td className="whitespace-nowrap">{tx.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Footer */}
            <div className="bg-[#e1e1f6] p-2 flex items-center justify-between border-t border-gray-300">
              <div className="flex items-center gap-2">
                <span>Per page:</span>
                <select 
                  value={pageSize} 
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="border border-gray-400 bg-white px-1"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-white/50 disabled:opacity-30" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                  <ChevronsLeft size={16} />
                </button>
                <button className="p-1 hover:bg-white/50 disabled:opacity-30" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex gap-1 mx-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button 
                      key={n} 
                      onClick={() => setCurrentPage(n)}
                      className={`px-2 py-0.5 border ${currentPage === n ? 'bg-legacy-blue text-white border-legacy-blue' : 'bg-white border-gray-400 hover:bg-gray-100'}`}
                    >
                      {n}
                    </button>
                  ))}
                  <span>...</span>
                  <button className="px-2 py-0.5 border bg-white border-gray-400 hover:bg-gray-100">44</button>
                </div>

                <button className="p-1 hover:bg-white/50 disabled:opacity-30" disabled={currentPage === 44} onClick={() => setCurrentPage(p => p + 1)}>
                  <ChevronRight size={16} />
                </button>
                <button className="p-1 hover:bg-white/50 disabled:opacity-30" disabled={currentPage === 44} onClick={() => setCurrentPage(44)}>
                  <ChevronsRight size={16} />
                </button>
                
                <span className="ml-4">De 44</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 p-4 text-center text-gray-500 border-t border-gray-200">
        &copy; 2026 Transaction Management System - All Rights Reserved
      </footer>
    </div>
  );
}
