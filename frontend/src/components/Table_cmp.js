import React from "react";

const Table_cmp = ({data}) => {
  
  const truncateDescription = (description) => {
    const sub = description.substring(0,20);
    return sub;
  };
  

  const renderTableRows = () => {
    if (!data || !Array.isArray(data)) {
      return null; 
    }

    if (data.length === 0) {
      return <tr><td colSpan="9">No data available</td></tr>;
    }

    return data.map((item, index) => (
      <tr className="border-b dark:border-gray-700" key={index}>
        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {item.companyName}
        </td>
        <td className="px-4 py-3">{item.revenue}</td>
        <td className="px-4 py-3">{item.foundedYear}</td>
        <td className="px-4 py-3">{item.keywords[0]}</td>
        <td className="px-4 py-3">{item.location}</td>
        <td className="px-4 py-3">{item.companyEmail}</td>
        <td className="px-4 py-3">{item.website}</td>
        <td className="px-4 py-3">{truncateDescription(item.description)}</td>
        <td className="px-4 py-3">{item.industry}</td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Company Name
            </th>
            <th scope="col" className="px-4 py-3">
              Revenue
            </th>
            <th scope="col" className="px-4 py-3">
              Founded Year
            </th>
            <th scope="col" className="px-4 py-3">
              Keywords
            </th>
            <th scope="col" className="px-4 py-3">
              Location
            </th>
            <th scope="col" className="px-4 py-3">
              Company Email ID
            </th>
            <th scope="col" className="px-4 py-3">
              Website
            </th>
            <th scope="col" className="px-4 py-3">
              Description
            </th>
            <th scope="col" className="px-4 py-3">
              Industry
            </th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Table_cmp;
