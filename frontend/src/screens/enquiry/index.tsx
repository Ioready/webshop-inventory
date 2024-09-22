// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from '../../components/Breadcrumbs';

// interface Customers {
//   id: string
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// }

// const initialCustomers: Customers[] = [
//   {
//     id: '1',
//     name: 'Robi Lahdo',
//     message: 'Hii, This is me',
//     email: 'robi@example.com',
//     phone: '+1123456789',
//   },
//   {
//     id: '2',
//     name: 'Robi Lahdo',
//     message: 'Hii, This is me',
//     email: 'robi@example.com',
//     phone: '+1123456789',
//   },
//   {
//     id: '3',
//     name: 'Robi Lahdo',
//     message: 'Hii, This is me',
//     email: 'robi@example.com',
//     phone: '+1123456789',
//   },
//   {
//     id: '4',
//     name: 'Robi Lahdo',
//     message: 'Hii, This is me',
//     email: 'robi@example.com',
//     phone: '+1123456789',
//   },
//   {
//     id: '5',
//     name: 'Robi Lahdo',
//     message: 'Hii, This is me',
//     email: 'robi@example.com',
//     phone: '+1123456789',
//   }
// ];

// const Enqury: React.FC = () => {
//   const [Customers, setCustomers] = useState<Customers[]>(initialCustomers);

//   const Navigate = useNavigate();

//   const handleviewallpage = () => {
//     Navigate("/customer-details");
//   }

//   return (
//     <div className=' d-flex flex-column'>
//     <Breadcrumbs pageName="Enquiry" />
//     <div className="container mt-4">

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered table-hover">
//           <thead className="thead-dark">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>massage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Customers.map(order => (
//               <tr key={order.id}>
//                 <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.name}</td>
//                 <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.email}</td>
//                 <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.phone}</td>
//                 <td className="text-nowrap" onClick={handleviewallpage} style={{cursor:"pointer"}}>{order.message}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
//         <ul className="pagination">
//           <li className="page-item">
//             <a className="page-link" href="#" aria-label="Previous">
//               <span aria-hidden="true">&laquo;</span>
//             </a>
//           </li>
//           <li className="page-item">
//             <a className="page-link" href="#">
//               1
//             </a>
//           </li>
//           <li className="page-item">
//             <a className="page-link" href="#" aria-label="Next">
//               <span aria-hidden="true">&raquo;</span>
//             </a>
//           </li>
//         </ul>
//         <p>Showing 1 to {Customers.length} of {Customers.length} entries</p>
//       </nav>
//     </div>
//     </div>
//   );
// };

// export default Enqury;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CiSearch } from "react-icons/ci";

interface Customers {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Enquiry: React.FC = () => {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(""); // For search input
  const [totalCustomers, setTotalCustomers] = useState<number>(0); // Total enquiries

  const Navigate = useNavigate();
  const itemsPerPage = 10; // Limit the number of enquiries per page

  // Fetch enquiries with pagination and filtering
  const fetchEnquiries = async (page: number, searchQuery: string = "") => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.ioready.io/enquiry", {
        params: {
          page,
          limit: itemsPerPage,
          search: searchQuery,
        },
      });
      setCustomers(response.data.enquiries);
      setTotalPages(response.data.totalPages);
      setTotalCustomers(response.data.totalEnquiries);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching enquiries", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change (real-time search)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    fetchEnquiries(1, searchQuery); // Fetch the first page of filtered results based on the search query
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchEnquiries(page, search);
  };

  useEffect(() => {
    fetchEnquiries(currentPage, search); // Fetch enquiries when the component loads
  }, []);

  // Navigate to the detailed view of the customer
  const handleViewCustomerDetails = (customerId: string) => {
    // Navigate(`/customer-details/${customerId}`); // Navigate to the details page
    return;
  };

  return (
    <div className="d-flex flex-column">
      <Breadcrumbs pageName="Enquiry" />
      <div className="container mt-4">
        {/* Search form */}
        <div className="mb-4">
          <div className="input-group w-50">
            {" "}
            {/* Align search box to the right */}
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Search by name, email, or phone"
              value={search}
              onChange={handleSearchChange} // Trigger search on input change
            />
          </div>
        </div>

        {/* <div className="input-group p-1 rounded w-50" style={{ position: "relative" }}>
            <input type="text" className="form-control rounded-5"  placeholder="Search by name, email, or phone" value={search} onChange={handleSearchChange} aria-label="Search" aria-describedby="search-addon" style={{ border: "1px solid gray" }} />
            <span className="input-group-text border-0" id="search-addon" style={{ position: "absolute", right: "1rem", top: "0.7rem" }}>
              <CiSearch style={{ fontSize: "1.5rem" }} />
            </span>
          </div> */}

        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td
                      className="text-nowrap"
                      onClick={() => handleViewCustomerDetails(customer.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {customer.name}
                    </td>
                    <td
                      className="text-nowrap"
                      onClick={() => handleViewCustomerDetails(customer.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {customer.email}
                    </td>
                    <td
                      className="text-nowrap"
                      onClick={() => handleViewCustomerDetails(customer.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {customer.phone}
                    </td>
                    <td
                      className="text-nowrap"
                      onClick={() => handleViewCustomerDetails(customer.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {customer.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-between align-items-center"
        >
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
          <p>
            Showing {customers.length} of {totalCustomers} entries
          </p>
        </nav>
      </div>
    </div>
  );
};

export default Enquiry;
