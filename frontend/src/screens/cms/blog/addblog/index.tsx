// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { MdCloudUpload } from 'react-icons/md';
// import 'react-quill/dist/quill.snow.css';
// import { usePatch, usePost } from '../../../../contexts';
// import { toast } from 'react-toastify';
// import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from '../../../firebase/firebase';
// import ReactQuill from 'react-quill';

// const BlogForm: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState<string[]>([]);
//   const { create } = usePost();
//   const {edit} = usePatch();
//   const navigate = useNavigate();
//   const location = useLocation(); // Get location state

//   // Check if we're editing an existing blog
//   const blogToEdit = location.state?.blog;

//   useEffect(() => {
//     if (blogToEdit) {
//       setTitle(blogToEdit.title);
//       setDescription(blogToEdit.description);
//       setImage(blogToEdit.image || []);
//     }
//   }, [blogToEdit]);

//   const handleUpdate = async () => {
//     const body = {
//       blogs: {
//         title,
//         description,
//         image, // Firebase image URLs
//         date: new Date(),
//       }
//     };

//     try {
//       if (blogToEdit) {
//         // Call the editBlog function if blogId exists (editing)
//         console.log('edit',title, description, image,blogToEdit._id)
//         await edit('editBlog', { blogId:blogToEdit._id, title, description, image });
//         toast.success('Blog updated successfully!');
//       } else {
//       await create('addCms', body);
//       toast.success(blogToEdit ? 'Blog updated successfully!' : 'Blog added successfully!');
//       navigate('/cms/blog-list');
//     }
//    } catch (error) {
//       toast.error(blogToEdit ? 'Failed to update blog. Please try again.' : 'Failed to add blog. Please try again.');
//     }
//   };

//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const files = Array.from(event.target.files);
//       const uploadedImages = await Promise.all(
//         files.map(async (file) => {
//           const storageRef = ref(storage, `images/${file.name}`);
//           await uploadBytes(storageRef, file);
//           const url = await getDownloadURL(storageRef);
//           return url;
//         })
//       );
//       setImage((prevImages) => [...prevImages, ...uploadedImages]);
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     handleUpdate();
//   };

//   return (
//     <div className="m-3">
//       <h3 className='my-2'>{blogToEdit ? 'Edit Blog' : 'Add Blog'}</h3>
//       <form onSubmit={handleSubmit} className='bg-white p-2 rounded-2'>
//         <div className="form-group">
//           <label htmlFor="blogTitle">Blog Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="blogTitle"
//             placeholder="Blog"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="form-group mt-3">
//           <label htmlFor="blogDescription">Description</label>
//           <ReactQuill
//             value={description}
//             onChange={(content: string) => setDescription(content)}
//             placeholder="Please Write Your Content Here"
//           />
//         </div>

//         <div className="form-group mt-3">
//           <label>Image Input</label>
//           <div className="row">
//             <div className="col-12 col-md-4 mb-3">
//               <label className="d-block text-center border p-3" style={{ cursor: 'pointer' }}>
//                 <MdCloudUpload size="3em" />
//                 <input
//                   type="file"
//                   multiple
//                   className="d-none"
//                   onChange={handleImageChange}
//                 />
//                 <div>Click to upload an image</div>
//               </label>
//             </div>
//             {image.map((img, index) => (
//               <div className="col-12 col-md-4 mb-3" key={index}>
//                 <img src={img} alt={`upload-${index}`} className="img-fluid" />
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary mt-3">
//           {blogToEdit ? 'Update Blog' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCloudUpload } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon
import 'react-quill/dist/quill.snow.css';
import { usePatch, usePost } from '../../../../contexts';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebase/firebase';
import ReactQuill from 'react-quill';
import { Button } from 'antd';

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string[]>([]);
  const { create } = usePost();
  const { edit } = usePatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get location state

  // Check if we're editing an existing blog
  const blogToEdit = location.state?.blog;

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setDescription(blogToEdit.description);
      setImage(blogToEdit.image || []);
    }
  }, [blogToEdit]);

  const handleUpdate = async () => {
    const body = {
      blogs: {
        title,
        description,
        image, // Firebase image URLs
        date: new Date(),
      }
    };

    try {
      if (blogToEdit) {
        // Call the editBlog function if blogId exists (editing)
        console.log('edit', title, description, image, blogToEdit._id);
        await edit('editBlog', { blogId: blogToEdit._id, title, description, image });
        toast.success('Blog updated successfully!');
      } else {
        await create('addCms', body);
        toast.success(blogToEdit ? 'Blog updated successfully!' : 'Blog added successfully!');
        navigate('/cms/blog-list');
      }
    } catch (error) {
      toast.error(blogToEdit ? 'Failed to update blog. Please try again.' : 'Failed to add blog. Please try again.');
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          return url;
        })
      );
      setImage((prevImages) => [...prevImages, ...uploadedImages]);
    }
  };

  // Function to handle image removal
  const handleRemoveImage = (index: number) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleUpdate();
  };

  return (
    <div className="m-3">
      <Button className="btn mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <h3 className="my-2">{blogToEdit ? 'Edit Blog' : 'Add Blog'}</h3>
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-2">
        <div className="form-group">
          <label htmlFor="blogTitle">Blog Title</label>
          <input
            type="text"
            className="form-control"
            id="blogTitle"
            placeholder="Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="blogDescription">Description</label>
          <ReactQuill
            value={description}
            onChange={(content: string) => setDescription(content)}
            placeholder="Please Write Your Content Here"
          />
        </div>

        <div className="form-group mt-3">
          <label>Image Input</label>
          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <label className="d-block text-center border p-3" style={{ cursor: 'pointer' }}>
                <MdCloudUpload size="3em" />
                <input
                  type="file"
                  multiple
                  className="d-none"
                  onChange={handleImageChange}
                />
                <div>Click to upload an image</div>
              </label>
            </div>
            {image.map((img, index) => (
              <div className="col-12 col-md-4 mb-3 position-relative" key={index}>
                <img src={img} alt={`upload-${index}`} className="img-fluid" />
                <FaTimes
                  size="1.5em"
                  color="gray"
                  className="position-absolute "
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRemoveImage(index)} // Remove image on click
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {blogToEdit ? 'Update Blog' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
