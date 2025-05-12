const mongoose = require("mongoose");

const companyInformationSchema = new mongoose.Schema(
  {
    company_info_title: { type: String, required: true },
    company_info: { type: String, required: true },
    image: {type: [String], required: true,},
    history_title: { type: String, required: true },
    history_description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyInformation", companyInformationSchema);
