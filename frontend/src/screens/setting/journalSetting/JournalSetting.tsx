import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFetchByLoad, usePost } from "../../../contexts";
import { toast } from "react-toastify";

const JournalSetting: React.FC = () => {
  const [formData, setFormData] = useState({
    taxName: "",
    taxPercentage: "",
    shipmentCharges: "",
    currencySymbol: "",
    showOnFrontend: true,
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const { fetch, data } = useFetchByLoad();
  const { create, loading } = usePost();

  useEffect(() => {
    fetch({ url: "/setting/general-settings" });
  }, []);

  useEffect(() => {
    if (data) {
      setFormData(data); // Set initial form data with API data
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsFormChanged(true);
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, showOnFrontend: !formData.showOnFrontend });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Journal settings submitted:", formData);
    const body = formData;
    try {
      await create("/setting/general-settings", body);
      toast.success("Settings updated successfully!");
      setIsFormChanged(false); // Reset change tracking
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
    }
  };

  // Handle form reset
  const handleCancel = () => {
    setFormData({
      taxName: "",
      taxPercentage: "",
      shipmentCharges: "",
      currencySymbol: "",
      showOnFrontend: true,
    });
    setIsFormChanged(false); // Reset change tracking
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="row">
        {/* Tax Name */}
        <div className="col-md-6 mb-3">
          <label htmlFor="taxName" className="form-label">
            Tax Name *
          </label>
          <input
            type="text"
            id="taxName"
            name="taxName"
            className="form-control"
            value={formData.taxName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tax Percentage */}
        <div className="col-md-6 mb-3">
          <label htmlFor="taxPercentage" className="form-label">
            Tax Percentage (%) *
          </label>
          <input
            type="number"
            id="taxPercentage"
            name="taxPercentage"
            className="form-control"
            value={formData.taxPercentage}
            onChange={handleChange}
            required
          />
        </div>

        {/* Shipment Charges */}
        <div className="col-md-6 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="shipmentCharges" className="form-label mb-0">
              Shipment Charges *
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="showOnFrontend"
                checked={formData.showOnFrontend}
                onChange={handleToggle}
              />
            </div>
          </div>

          <input
            type="text"
            id="shipmentCharges"
            name="shipmentCharges"
            className="form-control"
            value={formData.shipmentCharges}
            onChange={handleChange}
            required
          />
        </div>

        {/* Currency Symbol */}
        <div className="col-md-6 mb-3">
          <label htmlFor="currencySymbol" className="form-label">
            Currency Symbol *
          </label>
          <input
            type="text"
            id="currencySymbol"
            name="currencySymbol"
            className="form-control"
            value={formData.currencySymbol}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={!isFormChanged || loading} // Disable if form has not changed
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          //   onClick={() =>
          //     setFormData({
          //       taxName: "",
          //       taxPercentage: "",
          //       shipmentCharges: "",
          //       currencySymbol: "",
          //       showOnFrontend: true,
          //     })
          //   }
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JournalSetting;
