import React, { useState } from 'react';

//  const PaginatedList = ({ data }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   // Calculate indices for slicing the data
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   // Calculate total pages needed
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // Handle page change
//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Generate page numbers
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Paginated List</h1>
      
//       {/* Dropdown for selecting items per page */}
//       <div className="mb-4">
//         <label className="mr-2">Items per page:</label>
//         <select
//           className="border p-2 rounded"
//           value={itemsPerPage}
//           onChange={(e) => {
//             setItemsPerPage(parseInt(e.target.value, 10));
//             setCurrentPage(1); // Reset to page 1 when changing items per page
//           }}
//         >
//           {[5, 10, 15].map((number) => (
//             <option key={number} value={number}>{number}</option>
//           ))}
//         </select>
//       </div>

//       {/* List of items */}
//       <ul className="list-disc pl-5 mb-4">
//         {currentItems.map((item, index) => (
//           <li key={index} className="mb-2">{item}</li>
//         ))}
//       </ul>

//       {/* Pagination buttons */}
//       <div className="flex space-x-2">
//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => handleClick(number)}
//             className={`px-4 py-2 rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//           >
//             {number}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

const PaginatedList = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageWindow, setPageWindow] = useState([1, 5]); // Initial window: pages 1 to 5
  
    // Calculate indices for slicing the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    // Calculate total pages needed
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Handle page change
    const handleClick = (pageNumber) => {
      setCurrentPage(pageNumber);
  
      // Adjust page window if needed
      if (pageNumber > pageWindow[1]) {
        setPageWindow([pageWindow[0] + 5, pageWindow[1] + 5]);
      } else if (pageNumber < pageWindow[0]) {
        setPageWindow([pageWindow[0] - 5, pageWindow[1] - 5]);
      }
    };
  
    // Generate page numbers within the current window
    const pageNumbers = [];
    for (let i = pageWindow[0]; i <= Math.min(pageWindow[1], totalPages); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Paginated List</h1>
        
        {/* Dropdown for selecting items per page */}
        <div className="mb-4">
          <label className="mr-2">Items per page:</label>
          <select
            className="border p-2 rounded"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1); // Reset to page 1 when changing items per page
              setPageWindow([1, 5]); // Reset window
            }}
          >
            {[5, 10, 15, 20, 25].map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </div>
  
        {/* List of items */}
        <ul className="list-disc pl-5 mb-4">
          {currentItems.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ul>
  
        {/* Pagination buttons */}
        <div className="flex space-x-2">
          {/* Previous Window Button */}
          {pageWindow[0] > 1 && (
            <button
              onClick={() => handleClick(pageWindow[0] - 1)}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              &laquo; Prev
            </button>
          )}
          
          {/* Pagination Buttons */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handleClick(number)}
              className={`px-4 py-2 rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          ))}
  
          {/* Next Window Button */}
          {pageWindow[1] < totalPages && (
            <button
              onClick={() => handleClick(pageWindow[1] + 1)}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Next &raquo;
            </button>
          )}
        </div>
      </div>
    );
  };




export default PaginatedList