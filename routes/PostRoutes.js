import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import ModelPost from '../mongodb/models/PostModel.js';

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSt
router.route('/').get(async (req, res) => {
  try {
    const getAllPost = await ModelPost.find({});

    res.status(200).json({ success: true, data: getAllPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//CREATE POST
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await ModelPost.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    // console.log(error, 'error');
    res.status(501).json({ success: false, message: error });
  }
});

export default router;
