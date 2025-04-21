const InvestmentModel = require("../models/AreaInvestmentModel");
const slugify = require("slugify");
const investmentValidation = require("../helpers/area_of_investment_validator");

const createInvestment = async (req, res) => {
  try {
    const { error, value } = investmentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingBlog = await InvestmentModel.findOne({ title: value.title });
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "A Investment with this title already exists." });
    }

    const uploadedImage = req.file;

    if (!uploadedImage) {
      return res.status(400).json({ message: "An image is required" });
    }

    const image_url = uploadedImage.path;

    const slug = slugify(value.name, { lower: true });

    const response = new InvestmentModel({
      ...value,
      slug,
      image_url,
    });

    await response.save();

    return res.status(201).json({
      message: "Investment created successfully",
      response,
    });
  } catch (err) {
    console.error("Create Investment Error:", err);
    return res.status(500).json({ message: "Failed to create Investment" });
  }
};

module.exports = createInvestment;
