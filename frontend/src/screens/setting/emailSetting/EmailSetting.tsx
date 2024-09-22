// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useFetchByLoad, usePost } from "../../../contexts";
// import { toast } from "react-toastify";

// const EmailSetting: React.FC = () => {
//   const [formData, setFormData] = useState({
//     mailFromName: "",
//     mailFromEmail: "",
//     enableEmailQueue: "No",
//     mailDriver: "smtp",
//     mailHost: "",
//     mailPort: "",
//     mailEncryption: "ssl",
//     mailUsername: "",
//     mailPassword: "",
//   });

//   const { fetch, data } = useFetchByLoad();
//   const { create, loading } = usePost();
//   useEffect(() => {
//     fetch({ url: "/setting/email-settings" });
//   }, []);

//   console.log(data, "23emaildata");

//   useEffect(() => {
//     if (data) {
//       console.log(data, "emaildata");
//     }
//   }, [data]);

//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword); // Toggle password visibility
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form data submitted:", formData);
//      const body = formData;
//     try {
//       await create("/setting/email-settings", body);
//       toast.success('Settings added successfully!');
//     } catch (error) {
//       toast.error('Failed to add category. Please try again.');
//     }
//     // Add your form submission logic here
//   };

//   const handleCancel = () => {
//     // Reset form or handle cancellation
//     setFormData({
//       mailFromName: "",
//       mailFromEmail: "",
//       enableEmailQueue: "No",
//       mailDriver: "smtp",
//       mailHost: "",
//       mailPort: "",
//       mailEncryption: "ssl",
//       mailUsername: "",
//       mailPassword: "",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="container">
//       <div className="row">
//         {/* Mail From Name */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailFromName" className="form-label">
//             Mail From Name *
//           </label>
//           <input
//             type="text"
//             id="mailFromName"
//             name="mailFromName"
//             className="form-control"
//             value={formData.mailFromName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Mail From Email */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailFromEmail" className="form-label">
//             Mail From Email *
//           </label>
//           <input
//             type="email"
//             id="mailFromEmail"
//             name="mailFromEmail"
//             className="form-control"
//             value={formData.mailFromEmail}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Enable Email Queue */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="enableEmailQueue" className="form-label">
//             Enable Email Queue
//           </label>
//           <select
//             id="enableEmailQueue"
//             name="enableEmailQueue"
//             className="form-select"
//             value={formData.enableEmailQueue}
//             onChange={handleChange}
//           >
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         {/* Mail Driver */}
//         <div className="col-md-6 mb-3">
//           <label className="form-label">Mail Driver</label>
//           <div>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 id="mailDriverMail"
//                 name="mailDriver"
//                 value="mail"
//                 checked={formData.mailDriver === "mail"}
//                 onChange={handleChange}
//                 className="form-check-input"
//               />
//               <label htmlFor="mailDriverMail" className="form-check-label">
//                 Mail
//               </label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 id="mailDriverSmtp"
//                 name="mailDriver"
//                 value="smtp"
//                 checked={formData.mailDriver === "smtp"}
//                 onChange={handleChange}
//                 className="form-check-input"
//               />
//               <label htmlFor="mailDriverSmtp" className="form-check-label">
//                 SMTP
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Mail Host */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailHost" className="form-label">
//             Mail Host *
//           </label>
//           <input
//             type="text"
//             id="mailHost"
//             name="mailHost"
//             className="form-control"
//             value={formData.mailHost}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Mail Port */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailPort" className="form-label">
//             Mail Port *
//           </label>
//           <input
//             type="number"
//             id="mailPort"
//             name="mailPort"
//             className="form-control"
//             value={formData.mailPort}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Mail Encryption */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailEncryption" className="form-label">
//             Mail Encryption
//           </label>
//           <select
//             id="mailEncryption"
//             name="mailEncryption"
//             className="form-select"
//             value={formData.mailEncryption}
//             onChange={handleChange}
//           >
//             <option value="ssl">SSL</option>
//             <option value="tls">TLS</option>
//           </select>
//         </div>

//         {/* Mail Username */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailUsername" className="form-label">
//             Mail Username *
//           </label>
//           <input
//             type="email"
//             id="mailUsername"
//             name="mailUsername"
//             className="form-control"
//             value={formData.mailUsername}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Mail Password */}
//         <div className="col-md-6 mb-3">
//           <label htmlFor="mailPassword" className="form-label">
//             Mail Password *
//           </label>
//           <div className="input-group">
//             <input
//               type={showPassword ? "text" : "password"} // Toggle between text and password
//               id="mailPassword"
//               name="mailPassword"
//               className="form-control"
//               value={formData.mailPassword}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={togglePasswordVisibility} // Add click event to toggle visibility
//             >
//               {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
//               {/* React Icons for eye/eye-slash */}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="d-flex justify-content-end">
//         <button type="submit" className="btn btn-primary me-2">
//           Save
//         </button>
//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EmailSetting;


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useFetchByLoad, usePost } from "../../../contexts";
import { toast } from "react-toastify";

const EmailSetting: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState({
    mailFromName: "",
    mailFromEmail: "",
    enableEmailQueue: "No",
    mailDriver: "smtp",
    mailHost: "",
    mailPort: "",
    mailEncryption: "ssl",
    mailUsername: "",
    mailPassword: "",
  });

  // State to track if form data has changed
  const [isFormChanged, setIsFormChanged] = useState(false);
  
  const { fetch, data } = useFetchByLoad();
  const { create, loading, } = usePost();
  
  useEffect(() => {
    fetch({ url: "/setting/email-settings" });
  }, []);

  useEffect(() => {
    if (data) {
      setFormData(data); // Set initial form data with API data
    }
  }, [data]);

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Function to track changes in the form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Check if form data has changed compared to original data from API
    setIsFormChanged(true);
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = formData;
    try {
      await create("/setting/email-settings", body);
      toast.success("Settings updated successfully!");
      setIsFormChanged(false); // Reset change tracking
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
    }
  };

  // Handle form reset
  const handleCancel = () => {
    setFormData({
      mailFromName: "",
      mailFromEmail: "",
      enableEmailQueue: "No",
      mailDriver: "smtp",
      mailHost: "",
      mailPort: "",
      mailEncryption: "ssl",
      mailUsername: "",
      mailPassword: "",
    });
    setIsFormChanged(false); // Reset change tracking
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="row">
        {/* Mail From Name */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailFromName" className="form-label">
            Mail From Name *
          </label>
          <input
            type="text"
            id="mailFromName"
            name="mailFromName"
            className="form-control"
            value={formData.mailFromName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mail From Email */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailFromEmail" className="form-label">
            Mail From Email *
          </label>
          <input
            type="email"
            id="mailFromEmail"
            name="mailFromEmail"
            className="form-control"
            value={formData.mailFromEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Enable Email Queue */}
        <div className="col-md-6 mb-3">
          <label htmlFor="enableEmailQueue" className="form-label">
            Enable Email Queue
          </label>
          <select
            id="enableEmailQueue"
            name="enableEmailQueue"
            className="form-select"
            value={formData.enableEmailQueue}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Mail Driver */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Mail Driver</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="mailDriverMail"
                name="mailDriver"
                value="mail"
                checked={formData.mailDriver === "mail"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="mailDriverMail" className="form-check-label">
                Mail
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="mailDriverSmtp"
                name="mailDriver"
                value="smtp"
                checked={formData.mailDriver === "smtp"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="mailDriverSmtp" className="form-check-label">
                SMTP
              </label>
            </div>
          </div>
        </div>

        {/* Mail Host */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailHost" className="form-label">
            Mail Host *
          </label>
          <input
            type="text"
            id="mailHost"
            name="mailHost"
            className="form-control"
            value={formData.mailHost}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mail Port */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailPort" className="form-label">
            Mail Port *
          </label>
          <input
            type="number"
            id="mailPort"
            name="mailPort"
            className="form-control"
            value={formData.mailPort}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mail Encryption */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailEncryption" className="form-label">
            Mail Encryption
          </label>
          <select
            id="mailEncryption"
            name="mailEncryption"
            className="form-select"
            value={formData.mailEncryption}
            onChange={handleChange}
          >
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>

        {/* Mail Username */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailUsername" className="form-label">
            Mail Username *
          </label>
          <input
            type="email"
            id="mailUsername"
            name="mailUsername"
            className="form-control"
            value={formData.mailUsername}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mail Password */}
        <div className="col-md-6 mb-3">
          <label htmlFor="mailPassword" className="form-label">
            Mail Password *
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="mailPassword"
              name="mailPassword"
              className="form-control"
              value={formData.mailPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={!isFormChanged || loading} // Disable if form has not changed
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmailSetting;
