import Product from "../models/ProductModel.js";
import {
  generateDateFormat,
  generateResponse,
  validationMessage,
  validationRequiredField,
} from "../helpers/utils.js";
import path from "path";

let message = "";

export const getProducts = async (req, res) => {
  try {
    message = "Successfully get all products";
    const response = await Product.findAll();
    res.status(200).json(generateResponse(message, response, 200));
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    message = `Successfully get product with id ${req.params.id}`;
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json(generateResponse(message, response, 200));
    }
    message = `Product with id ${req.params.id} is not found`;
    res.status(404).json(generateResponse(message, {}, 404));
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProduct = async (req, res) => {
  const validationFields = { image: req?.files, title: req?.body?.title };
  if (
    validationRequiredField(validationFields) === false ||
    req.files === null
  ) {
    return res.status(422).json(generateResponse(validationMessage, {}, 422));
  }
  //   if (req.files === null) {
  //     message = "File cannot be null";
  //     return res.status(400).json(generateResponse(message, {}, 400));
  //   }
  const name = req?.body?.title;
  const file = req?.files?.image || req?.files?.file;
  const fileSize = file?.data?.length;
  const ext = path.extname(file?.name);
  const fileName = `${generateDateFormat(new Date())}_${file?.md5}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  // Check the type of file
  if (!allowedType.includes(ext.toLowerCase())) {
    message = `${ext} types are not allowed, allowed types are one of .png, .jpg, or .jpeg`;
    res.status(422).json(generateResponse(message, {}, 422));
  }

  // check file size
  if (fileSize > 2000000) {
    message = "Image must be less than 2MB";
    res.status(422).json(generateResponse(message, {}, 422));
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err)
      return res.status(500).json(generateResponse(err?.message, {}, 500));
    try {
      const request = {
        name,
        image: fileName,
        url,
      };
      await Product.create(request);
      message = "Successfully add new product";
      res.status(201).json(generateResponse(message, {}, 201));
    } catch (error) {
      console.log(error?.message);
    }
  });
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
