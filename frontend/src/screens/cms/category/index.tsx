import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Delete from './delete';
import Select from 'react-select';
import { useFetchByLoad, usePatch } from '../../../contexts';
import { message } from 'antd';

interface Customers {
  id: string;
  category: string;
  image: string;
}



const TopCategory: React.FC = () => {
  const [popupCustomer, setPopupCustomer] = useState(false);
  const { fetch, data } = useFetchByLoad();
  const [selectedCategory, setSelectedCategory] = useState<{ value: string, label: string } | null>(null);
  const topCategories = data?.categories[0]?.categories.filter((category: any) => category.topCategory === true);

  const {edit} = usePatch();
  
  useEffect(() => {
    const fetchData = async () => {
      await fetch({ url: "getCategory" });
    };

    fetchData();
  }, []);

  const handleClick = async (selectedIndex: number, topCategory: boolean) => {
    console.log('selectedIndex',selectedIndex)
    const url = `/${"editCategory"}`;
    const categoryId = data?.categories[0]?._id;

    if (!categoryId) {
      console.error("Category ID not found");
      return;
    }  
    
    try {
      const updatedFields = {
        id: categoryId,  // Pass the actual category ID here
        selectedCategory: selectedIndex,  // Keep selected index for backend reference if needed
        topCategory: topCategory  // Pass the topCategory flag
      };
      
      await edit(url, {updatedFields});
      fetch({ url: "getCategory" })
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product`);
    }
  };
  
  const closePopup = () => {
    setPopupCustomer(false);
  };

  const handleDeleteClick = () => {
    setPopupCustomer(true);
  };

  const handleRemove = async(id: number) => {
    const index = data?.categories[0].categories.findIndex(
      (category: any) => category._id === id
    );

    const url = `/${"editCategory"}`;
    const categoryId = data?.categories[0]?._id;
    
    try {
      const updatedFields = {
          id: categoryId,
          selectedCategory: index,
          topCategory: false
      };
      await edit(url, {updatedFields});
      fetch({ url: "getCategory" });
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(`Error updating product`);
    }

  };

  return (
    <div className="container mt-4">
      <div className=' w-100 d-flex justify-content-between align-items-center my-2'>
      <h3>Top Category</h3>
      </div>

      <div className=' d-flex mb-4' style={{gap:"1rem"}}>
      
      <Select
        options={
          data?.categories[0]?.categories.map((category: any, i: number) => ({
            value: category.name,
            label: category.name,
            index: i
          }))
        }
        //@ts-ignore
        onChange={(option)=>{setSelectedCategory(option ? option?.index : 0);}}
        placeholder="Select a category"
        value={    
          //@ts-ignore
          data?.categories[0]?.categories[selectedCategory]? { value: selectedCategory, label: data?.categories[0]?.categories[selectedCategory].name }
            : null
        }
      />

      <button className=' btn btn-info text-white'
      //@ts-ignore
       onClick={()=>handleClick(selectedCategory, true)}>Add Category</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">category</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {topCategories?.map((order:any, index: number) => (
              <tr key={order.id}>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>
                  <img src={order.image} alt={order.name} className='img-fluid' style={{height:"5rem", objectFit: 'cover'}} />
                </td>
                <td className="text-center text-nowrap" style={{cursor:"pointer"}}>{order.name}</td>
                <td className=' d-flex' style={{ gap:"1rem"}}>
                  <button  onClick={()=>handleRemove(order._id)} className="btn btn-danger btn-sm ml-2">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupCustomer && (
        <Delete onClose={closePopup} />
      )}
      <nav aria-label="Page navigation example" className="d-flex justify-content-between align-items-center">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        <p>Showing 1 to {topCategories?.length} of {topCategories?.length} entries</p>
      </nav>
    </div>
  );
};

export default TopCategory;
