import React, { useState, useRef, useEffect } from "react";

export function FormData({ initialValues, handleUpdate, loading }: any) {
  const [items, setItems] = useState([{ id: 1 }]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setItems(prevItems => [...prevItems, { id: prevItems.length + 1 }]);
  };

  const handleDelete = (idToDelete: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
  };

  useEffect(() => {
    // Focus on the first input field when it mounts
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []); // Run only once after initial render

  return (
    <div className="container p-0">
      {items.map((item, index) => (
        <div className="row align-items-center mb-3" key={item.id}>
          <div className="col">
            <label htmlFor={`storeLocation_${item.id}`}>Store Location:</label>
            <input
              type="text"
              className="form-control"
              id={`storeLocation_${item.id}`}
              ref={index === 0 ? firstInputRef : null} // reference the first input
            />
          </div>
          <div className="col">
            <label htmlFor={`quantity_${item.id}`}>Quantity:</label>
            <input type="number" className="form-control" id={`quantity_${item.id}`} />
          </div>
          <div className="col">
            <label htmlFor={`stockOut_${item.id}`}>Stock Out:</label>
            <input type="text" className="form-control" id={`stockOut_${item.id}`} />
          </div>
          <div className="col">
            <button type="button" className="btn btn-danger mt-2" onClick={() => handleDelete(item.id)}>X</button>
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
        </div>
      </div>
      <div className=" py-2">
        <button type="button" className="btn btn-primary p-2" onClick={handleAdd} style={{width:"100%"}}>Update</button>
      </div>
    </div>
  );
}
