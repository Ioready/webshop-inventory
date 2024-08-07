import ContentManagement from "../models/contentManagement.js";

export const cms = {
  addCms: async (req, res) => {
    try {
        const updates = {};

        if (req.body.blogs) {
            updates.$push = { blogs: req.body.blogs };
        }

        if (req.body.herosection) {
            updates.$push = { herosection: req.body.herosection };
        }

        if (req.body.footer) {
            updates.footer = req.body.footer;
        }

        if (req.body.header) {
            updates.header = req.body.header;
        }

        if (req.body.topProduct) {
            updates.topProduct = req.body.topProduct;
        }

        if (req.body.bestSellingProduct) {
            updates.bestSellingProduct = req.body.bestSellingProduct;
        }

        if (req.body.topCategory) {
            updates.topCategory = req.body.topCategory;
        }

        if (req.body.review) {
            updates.$push = { review: req.body.review };
        }

        if (req.body.termAndConditions) {
            updates.termAndConditions = req.body.termAndConditions;
        }

        if (req.body.privacyPolicy) {
            updates.privacyPolicy = req.body.privacyPolicy;
        }

        if (req.body.returnPolicy) {
            updates.returnPolicy = req.body.returnPolicy;
        }

        if (req.body.aboutUs) {
            updates.aboutUs = req.body.aboutUs;
        }

        const result = await ContentManagement.findOneAndUpdate(
            {}, // Add your query to target a specific document if needed
            updates,
            { new: true, upsert: true } // upsert creates a new document if one doesn't exist
        );

        res.status(200).json({ message: 'CMS content updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
},

    getCms: async (req, res) => {
        try {
            const cmsData = await ContentManagement.findOne();

            if (!cmsData) {
                return res.status(404).json({ message: 'No CMS content found' });
            }

            res.status(200).json(cmsData);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
};
