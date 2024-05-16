const {
  findFood,
  getAllFood,
  getAllFoodbyCategory,
} = require("../models/foodModels");
const prisma = require("../db");

//controller for searching food
const foodSearch = async (req, res) => {
  try {
    const query = req.query.query || "";
    const food = await findFood(query);
    res.status(200).json({
      data: food.map((i) => {
        return {
          id: i.id,
          name: i.name,
          image: i.image,
          category: i.category.name,
        };
      }),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all food
const getFood = async (req, res) => {
  try {
    const order = req.query.order;
    const price = req.query.price;
    const rating = req.query.rating;
    const page = parseInt(req.query.page);
    const category = parseInt(req.query.category);
    //validation
    if (page < 1) {
      return res.status(400).json({ message: "Error : Negative pagination" });
    }
    if ((price && order) || (price && rating) || (rating && order)) {
      return res.status(400).json({ message: "accept only 1 sort parameter" });
    }

    //jika filter berdasarkan category
    if (category) {
      const data = await getAllFoodbyCategory(
        page,
        price,
        order,
        rating,
        category
      );
      return res.status(200).json(data);
    } else {
      //jika dapatkan semua data makanan
      const data = await getAllFood(page, price, order, rating);
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get detail food
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params; // Get food_id from request params
    const food = await prisma.food.findUnique({
      where: {
        id: parseInt(id), // Convert id to integer
      },
      include: {
        _count: {
          select: {
            order: true,
          },
        },
        category: true,
        method: {
          orderBy: {
            step: "asc",
          },
        },
        ingredients: true,
      },
    });

    if (food) {
      res.status(200).json({
        data: {
          id: food.id,
          name: food.name,
          image: food.image,
          description: food.description,
          rating: food.rating,
          order: food._count.order,
          category: food.category.name,
          ingredients: food.ingredients,
          method: food.method,
        },
      }); // Send food details as JSON response
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching food details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get random food for trending and recomendation
const getRandomFoods = async (req, res) => {
  const { limit } = req.query;

  try {
    // If limit parameter is not provided or invalid, default to 5
    const limitValue = parseInt(limit, 10) || 5;

    // Execute raw SQL query to fetch random foods with specified limit
    const foods =
      await prisma.$queryRaw`SELECT * FROM foods ORDER BY RANDOM() LIMIT ${limitValue}`;

    res.status(200).json({ data: foods });
  } catch (error) {
    console.error("Error fetching random foods:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { foodSearch, getFoodById, getRandomFoods, getFood };
