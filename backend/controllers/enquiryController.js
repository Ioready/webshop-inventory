import Enquiry from '../models/enquiry.js';

// Controller for adding a new enquiry
export const addEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      message,
    });

    await enquiry.save();
    res.status(201).json({ message: 'Enquiry added successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add enquiry', error });
  }
};

// // Controller to get all enquiries
// export const getAllEnquiry = async (req, res) => {
//   try {
//     const enquiries = (await Enquiry.find()).reverse();
//     res.status(200).json({message:"All Enquiries",enquiries});
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve enquiries', error });
//   }
// };

// Controller to get all enquiries with pagination and filtering
export const getAllEnquiry = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query; // Default page is 1, limit is 10
      const query = {};
  
      // If search is provided, filter by name, email, or phone
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ];
      }
  
      // Calculate total enquiries count for pagination
      const totalEnquiries = await Enquiry.countDocuments(query);
  
      // Fetch enquiries based on the page and limit with filtering
      const enquiries = await Enquiry.find(query)
        .sort({ createdAt: -1 }) // Sort by most recent
        .skip((page - 1) * limit) // Skip documents for pagination
        .limit(Number(limit)); // Limit number of documents
  
      res.status(200).json({
        message: "All Enquiries",
        enquiries,
        totalEnquiries,
        totalPages: Math.ceil(totalEnquiries / limit),
        currentPage: Number(page)
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve enquiries', error });
    }
  };
  

// Controller to get a single enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({message:"Enquiry Details ", enquiry});
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve enquiry', error });
  }
};
