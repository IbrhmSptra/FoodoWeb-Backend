const prisma = require("../db");

// Menambahkan bookmark baru
const addBookmark = async (uuid, food_id) => {
  // Tambahkan bookmark baru
  const newBookmark = await prisma.bookmark.create({
    data: {
      user_uuid: uuid,
      food_id: food_id,
    },
  });

  // Dapatkan informasi makanan berdasarkan food_id
  const foodDetails = await prisma.food.findUnique({
    where: {
      id: food_id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      rating: true,
      category: {
        select: {
          name: true,
        },
      },
      ingredients: {
        select: {
          amount: true,
          name: true,
          price: true,
        },
      },
      method: {
        select: {
          step: true,
          how: true,
        },
      },
    },
  });

  const priceFood = await prisma.ingredients.groupBy({
    by: ["food_id"],
    _sum: {
      price: true,
    },
    where: {
      food_id: food_id, // Menggunakan `food_id` yang benar
    },
  });

  // Gabungkan data pesanan dan harga makanan
  const totalPrice = priceFood.length > 0 ? priceFood[0]._sum.price : 0; // Harga total

  // response data
  const data = {
    id: foodDetails.id,
    name: foodDetails.name,
    image: foodDetails.image,
    description: foodDetails.description,
    rating: foodDetails.rating,
    category: foodDetails.category.name,
    price: totalPrice,
    ingredients: foodDetails.ingredients,
  };

  return data;
};

//to get all bookmark user data
const getAllBookmark = async (page, price = "asc", order, rating, uuid) => {
  const showData = 12;
  const startIndex = (page - 1) * showData;
  const endIndex = startIndex + showData;
  const totalResults = await prisma.bookmark.count({
    where: {
      user_uuid: uuid,
    },
  });
  const totalPages = Math.ceil(totalResults / showData);

  //get data bookmark
  const bookmark = await prisma.bookmark.findMany({
    select: {
      food: {
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
      },
    },
    where: {
      user_uuid: uuid,
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
  for (let i = 0; i < bookmark.length; i++) {
    for (let j = 0; j < priceFood.length; j++) {
      if (bookmark[i].food.id === priceFood[j].food_id) {
        let payload = {
          id: bookmark[i].food.id,
          name: bookmark[i].food.name,
          image: bookmark[i].food.image,
          price: priceFood[j]._sum.price,
          rating: bookmark[i].food.rating,
          order: bookmark[i].food._count.order,
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

//to find bookmark by id
const bookmarkById = async (uuid, food_id) => {
  const data = await prisma.bookmark.findUnique({
    where: {
      bookmark_id: {
        user_uuid: uuid,
        food_id: food_id,
      },
    },
    select: {
      food: {
        select: {
          id: true,
          name: true,
          image: true,
          rating: true,
        },
      },
    },
  });
  return data;
};

const deleteBookmark = async (uuid, food_id) => {
  const data = await prisma.bookmark.delete({
    where: {
      bookmark_id: {
        user_uuid: uuid,
        food_id: food_id,
      },
    },
  });

  return data;
};

module.exports = { bookmarkById, getAllBookmark, addBookmark, deleteBookmark };
