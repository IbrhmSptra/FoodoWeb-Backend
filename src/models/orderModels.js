const prisma = require("../db");

// Membuat pesanan baru dan mendapatkan detail makanan
const createOrder = async (user_uuid, food_id, location) => {
  // Membuat pesanan baru
  const newOrder = await prisma.order.create({
    data: {
      user_uuid: user_uuid,
      food_id: parseInt(food_id, 10), // Konversi ke integer
      location: location,
      rating: 0, // Rating awal
      date: new Date(), // Tanggal saat pesanan dibuat
    },
  });

  // Mendapatkan detail makanan berdasarkan `food_id`
  const foodDetails = await prisma.food.findUnique({
    where: {
      id: parseInt(food_id, 10),
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      rating: true,
      // order: true,
      category: {
        select: {
          name: true,
        },
      },
      ingredients: {
        select: {
          name: true,
          price: true,
          amount: true,
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

  const totalOrder = await getTotalOrder(food_id); // Mendapatkan total order

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

  const data = {
    food_id: foodDetails.id,
    name: foodDetails.name,
    image: foodDetails.image,
    description: foodDetails.description,
    price: totalPrice,
    rating: foodDetails.rating,
    order: totalOrder,
    category: foodDetails.category.name,
    ingredients: foodDetails.ingredients,
  };

  // return { order: newOrder, food: foodDetails };
  return data;
};

//untuk mendapatkan jumlah order pada suatu makanan dengan parameter food_id ---------------------
const getTotalOrder = async (food_id) => {
  const data = await prisma.order.groupBy({
    by: ["food_id"],
    where: {
      food_id: food_id,
    },
    _count: {
      food_id: true,
    },
  });
  if (!data[0]?._count.food_id) {
    return 0;
  }
  return data[0]?._count.food_id;
};

//untuk mencari tau apakah ada order dengan id dan uuid tersebut ---------------------
const findOrderUser = async (id, uuid) => {
  const data = prisma.order.findUnique({
    where: {
      id: id,
      user_uuid: uuid,
    },
  });
  return data;
};

//untuk mendapatkan detail order user berdasarkan id dan uuid ---------------------
const findOrderDetail = async (uuid, order_id) => {
  // Cari pesanan berdasarkan ID dan user_uuid
  const order = await prisma.order.findFirst({
    where: {
      user_uuid: uuid,
      id: order_id,
    },
    include: {
      food: {
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          ingredients: {
            select: {
              amount: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });
  if (!order) {
    return;
  }
  const food_id = order.food.id; // Dapatkan food_id dari pesanan yang ditemukan

  // Mendapatkan total harga dari bahan-bahan berdasarkan `food_id`
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

  const data = {
    id: order.id,
    location: order.location,
    date: order.date,
    food_id: order.food_id,
    name: order.food.name,
    image: order.food.image,
    description: order.food.description,
    price: totalPrice, // Harga dari `groupBy`
    ingredients: order.food.ingredients,
  };

  return data;
};

//untuk mengubah rating pada table order ketika user melakukan rate untuk pesanan tersebut ---------------------
const updateOrderRating = async (rate, uuid, id) => {
  const data = await prisma.order.update({
    where: {
      id: id,
      user_uuid: uuid,
    },
    data: {
      rating: rate,
    },
  });
  return data;
};

//untuk mendapatkan total rating lebih dari 0 pada makanan tertentu berdasarkan semua order user ---------------------------
const getTotalRating = async (food_id) => {
  const totalCount = await prisma.order.count({
    where: {
      food_id: food_id,
      rating: {
        gt: 0,
      },
    },
  });
  const totalRating = await prisma.order.groupBy({
    by: ["food_id"],
    where: {
      food_id: food_id,
      rating: {
        gt: 0,
      },
    },
    _sum: {
      rating: true,
    },
  });
  return { totalCount, totalRating: totalRating[0]._sum.rating };
};

//to get all order user data ----------------------------------------------
const getAllOrder = async (page, price, date = "desc", uuid) => {
  const showData = 12;
  const startIndex = (page - 1) * showData;
  const endIndex = startIndex + showData;
  const totalResults = await prisma.order.count({
    where: {
      user_uuid: uuid,
    },
  });
  const totalPages = Math.ceil(totalResults / showData);

  //get data order
  const order = await prisma.order.findMany({
    select: {
      id: true,
      food_id: true,
      date: true,
      rating: true,
      food: {
        select: {
          name: true,
          image: true,
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
  for (let i = 0; i < order.length; i++) {
    for (let j = 0; j < priceFood.length; j++) {
      if (order[i].food_id === priceFood[j].food_id) {
        let payload = {
          id: order[i].id,
          name: order[i].food.name,
          image: order[i].food.image,
          date: order[i].date,
          price: priceFood[j]._sum.price,
          rating: order[i].food.rating,
        };
        data.push(payload);
      }
    }
  }

  //sort by order
  if (price) {
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
  }

  //sort by date **default
  switch (date) {
    case "asc":
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "desc":
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

module.exports = {
  getTotalOrder,
  updateOrderRating,
  getTotalRating,
  findOrderUser,
  getAllOrder,
  createOrder,
  findOrderDetail,
};
