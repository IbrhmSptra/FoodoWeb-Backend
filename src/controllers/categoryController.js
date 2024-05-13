const { getData, getCategoryById } = require("../models/categoryModels");

const getCategoryData = async (req, res) => {
  try {
    const data = await getData();
    res.status(200).json({ data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const FindCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await getCategoryById(id);
    if (!data) {
      res.status(400).json({ message: "Data not found" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getCategoryData, FindCategory };
