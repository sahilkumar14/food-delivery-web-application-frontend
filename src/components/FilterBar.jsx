
// import React, { useState } from 'react';

// const FilterBar = () => {
//   const [activeTab, setActiveTab] = useState("All");

//   const filters = [
//     { name: "All", icon: "🍽️" },
//     { name: "Pizza", icon: "🍕" },
//     { name: "Burgers", icon: "🍔" },
//     { name: "Noodles", icon: "🍜" },
//     { name: "Drinks", icon: "🥤" },
//     { name: "Desserts", icon: "🍰" },
//     { name: "Salads", icon: "🥗" },
//   ];

//   return (
//     // Reduced padding from py-5/p-6 to py-3
//     <div className="bg-white py-3 px-6 overflow-x-auto border-b border-gray-100">
//       <div className="flex gap-3 min-w-max max-w-7xl mx-auto">
//         {filters.map((filter) => {
//           const isActive = activeTab === filter.name;
          
//           return (
//             <button
//               key={filter.name}
//               onClick={() => setActiveTab(filter.name)}
//               className={`
//                 flex flex-col items-center justify-center
//                 w-18 h-18 rounded-xl transition-all duration-200
//                 ${isActive 
//                   ? "bg-[#FF6D33] text-white shadow-md" 
//                   : "bg-white border border-gray-100 shadow-sm hover:bg-gray-50 text-gray-700"
//                 }
//               `}
//             >
//               {/* Reduced icon size to text-2xl and label to text-xs */}
//               <span className="text-2xl mb-1">{filter.icon}</span>
//               <span className="text-xs font-semibold">{filter.name}</span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default FilterBar;

import React, { useState } from 'react';

const FilterBar = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filters = [
    { name: "All", icon: "🍽️" },
    { name: "Pizza", icon: "🍕" },
    { name: "Burgers", icon: "🍔" },
    { name: "Noodles", icon: "🍜" },
    { name: "Drinks", icon: "🥤" },
    { name: "Desserts", icon: "🍰" },
    { name: "Salads", icon: "🥗" },
  ];

  return (
    <div className="bg-white py-4 border-b border-gray-100 px-6">
      {/* - Changed 'justify-between' to 'justify-center' to keep them grouped
          - Added 'gap-8' to give them a "little bit" more space (approx 32px)
      */}
      <div className="flex justify-center items-center gap-8 max-w-7xl mx-auto">
        {filters.map((filter) => {
          const isActive = activeTab === filter.name;
          
          return (
            <button
              key={filter.name}
              onClick={() => setActiveTab(filter.name)}
              className={`
                flex flex-col items-center justify-center
                w-20 h-20 rounded-2xl transition-all duration-300
                ${isActive 
                  ? "bg-[#FF6D33] text-white shadow-lg scale-105" 
                  : "bg-white border border-gray-100 shadow-sm hover:bg-gray-50 text-gray-700 hover:border-[#FF6D33]/30"
                }
              `}
            >
              <span className="text-2xl mb-1">{filter.icon}</span>
              <span className="text-xs font-semibold">{filter.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;