const prisma = require("../db");
const { getTotalOrder } = require("./orderModels");

//get all food -----------------------------------------------
const getAllFood = async (page, price = "asc", order, rating) => {
  const showData = 12;
  const startIndex = (page - 1) * showData;
  const endIndex = startIndex + showData;
  const totalResults = await prisma.food.count();
  const totalPages = Math.ceil(totalResults / showData);

  //get data food
  const food = await prisma.food.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      rating: true,
      _count: {
        select: {
          order: true,
        },
      },
    },
  });
  //get price food
  const priceFood = await prisma.ingredients.groupBy({
    by: ["food_id"],
    _sum: {
      price: true,
    },
  });
  //merge into one data
  const data = [];
  for (let i = 0; i < food.length; i++) {
    for (let j = 0; j < priceFood.length; j++) {
      if (food[i].id === priceFood[j].food_id) {
        let payload = {
          id: food[i].id,
          name: food[i].name,
          image: food[i].image,
          price: priceFood[j]._sum.price,
          rating: food[i].rating,
          order: food[i]._count.order,
        };
        data.push(payload);
      }
    }
  }

  //sort by order
  if (order) {
    switch (order) {
      case "asc":
        data.sort((a, b) => a.order - b.order);
        break;
      case "desc":
        data.sort((a, b) => b.order - a.order);
        break;
    }
    //paginate
    const paginateData = data.slice(startIndex, endIndex);
    return {
      page,
      totalPages,
      totalResults,
      data: paginateData,
    };
  }

  //sort by rating
  if (rating) {
    switch (rating) {
      case "asc":
        data.sort((a, b) => a.rating - b.rating);
        break;
      case "desc":
        data.sort((a, b) => b.rating - a.rating);
        break;
    }
    //paginate
    const paginateData = data.slice(startIndex, endIndex);
    return {
      page,
      totalPages,
      totalResults,
      data: paginateData,
    };
  }

  //sort by price **default
  switch (price) {
    case "asc":
      data.sort((a, b) => a.price - b.price);
      break;
    case "desc":
      data.sort((a, b) => b.price - a.price);
      break;
  }
  //paginate
  const paginateData = data.slice(startIndex, endIndex);
  return {
    page,
    totalPages,
    totalResults,
    data: paginateData,
  };
};

//get data food by category ------------------------------
const getAllFoodbyCategory = async (
  page,
  price = "asc",
  order,
  rating,
  category_id
) => {
  const showData = 12;
  const startIndex = (page - 1) * showData;
  const endIndex = startIndex + showData;
  const totalResults = await prisma.food.count({
    where: { category_id: category_id },
  });
  const totalPages = Math.ceil(totalResults / showData);

  //get data food
  const food = await prisma.food.findMany({
    where: {
      category_id: category_id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      rating: true,
      _count: {
        select: {
          order: true,
        },
      },
    },
  });
  //get price food
  const priceFood = await prisma.ingredients.groupBy({
    by: ["food_id"],
    where: {
      food: {
        category_id: category_id,
      },
    },
    _sum: {
      price: true,
    },
  });
  //merge into one data
  const data = [];
  for (let i = 0; i < food.length; i++) {
    for (let j = 0; j < priceFood.length; j++) {
      if (food[i].id === priceFood[j].food_id) {
        let payload = {
          id: food[i].id,
          name: food[i].name,
          image: food[i].image,
          price: priceFood[j]._sum.price,
          rating: food[i].rating,
          order: food[i]._count.order,
        };
        data.push(payload);
      }
    }
  }

  //sort by order
  if (order) {
    switch (order) {
      case "asc":
        data.sort((a, b) => a.order - b.order);
        break;
      case "desc":
        data.sort((a, b) => b.order - a.order);
        break;
    }
    //paginate
    const paginateData = data.slice(startIndex, endIndex);
    return {
      page,
      totalPages,
      totalResults,
      data: paginateData,
    };
  }

  //sort by rating
  if (rating) {
    switch (rating) {
      case "asc":
        data.sort((a, b) => a.rating - b.rating);
        break;
      case "desc":
        data.sort((a, b) => b.rating - a.rating);
        break;
    }
    //paginate
    const paginateData = data.slice(startIndex, endIndex);
    return {
      page,
      totalPages,
      totalResults,
      data: paginateData,
    };
  }

  //sort by price **default
  switch (price) {
    case "asc":
      data.sort((a, b) => a.price - b.price);
      break;
    case "desc":
      data.sort((a, b) => b.price - a.price);
      break;
  }
  //paginate
  const paginateData = data.slice(startIndex, endIndex);
  return {
    page,
    totalPages,
    totalResults,
    data: paginateData,
  };
};

//untuk fitur search food -------------------------------
const findFood = async (query) => {
  const data = await prisma.food.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return data;
};

//untuk mendapatkan total harga pada makanan berdasarkan food_id
const priceFood = async (food_id) => {
  const data = await prisma.ingredients.groupBy({
    by: ["food_id"],
    where: {
      food_id: food_id,
    },
    _sum: {
      price: true,
    },
  });
  return data[0]._sum.price;
};

//untuk mengubah rating pada food ketika user melakukan review/rate
const updateFoodRating = async (food_id, rating) => {
  const data = await prisma.food.update({
    where: {
      id: food_id,
    },
    data: {
      rating: rating,
    },
  });
  return data;
};

module.exports = {
  findFood,
  priceFood,
  updateFoodRating,
  getAllFood,
  getAllFoodbyCategory,
};
