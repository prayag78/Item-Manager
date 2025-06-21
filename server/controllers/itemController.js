import ItemModel from "../models/item.js";
// import { cloudinary } from '../config/cloudinary.js';

//Get All Items
export const getAllItems = async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.json({success: true, items});
    } catch (error) {
        res.json({success: false, message: error.message });
    }
}



//Create Item
export const createItem = async (req, res) => {
    try {
      const { name, type, description } = req.body;
  
      const coverImage = req.files?.coverImage?.[0]?.path;
      const additionalImages = req.files?.additionalImages?.map(img => img.path) || [];
  
      if (!name || !type || !description || !coverImage) {
        return res.json({ success: false, message: 'Missing required fields' });
      }
  
      const newItem = new ItemModel({
        name,
        type,
        description,
        coverImage,
        additionalImages
      });
  
      await newItem.save();
  
      res.json({ success: true, item: newItem });
    } catch (error) {
      console.error('Server Error:', error.message);
      res.json({ success: false, message: error.message });
    }
  };
  
