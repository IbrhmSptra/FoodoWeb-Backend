# FOODO BACKEND

[![file-cover-1.png](https://i.postimg.cc/fy6cm01L/file-cover-1.png)](https://postimg.cc/p5J5tyWb)

## Overview

Foodo adalah sebuah website dimana user bisa melihat resep dari berbagai jenis makanan dengan beberapa kategori yaitu, nusantara, jepang, korea, dan western. Beserta penjelasan bahan dan langkah untuk memasak makanan yang user inginkan dan juga disediakan fitur "delivery recipe" yaitu user dapat memesan bahan-bahan untuk memasak sesuai dengan menu yang dipilih, dengan pilih menu resep lalu isi alamat dan bayar maka bahan-bahan yang diperlukan untuk memasak akan dikirim ke alamat user.

## Quick Start

Clone repository:

```console
git clone https://github.com/HSBC-Kelompok-1/Foodo-Backend.git
```

Clone repository:

```console
cd Foodo-Backend
```

Install dependencies & Create .env file from .env.example:

```console
$ npm install
```

Start the server on development:

```console
$ npm run dev
```

View the website at: http://localhost:3000

Start the server on production:

```console
$ npm start
```

## API

### - **Authentication**

**Endpoint** : **POST /auth/register**

Summary : route for making new user account

Request :

- Name : username <br>
  In : body <br>
  Description : username account max 12 char <br>
  Required : true <br>
  Type : String <br>

- Name : email <br>
  In : body <br>
  Description : email account, must be valid email format <br>
  Required : true <br>
  Type : String <br>

- Name : password <br>
  In : body <br>
  Description : password acoount, must be strong password<br>
  Required : true <br>
  Type : String <br>

Response Success :

```JSON
{
   "data": {
        "uuid": "0ff0a33e-c967-42ba-b842-35a1f871e5db",
        "email": "admin100@gmail.com",
        "username": "ibrhmsptra"
    },
    "message": "Create Account Success"
}
```

Response Error :

```JSON
{
   "message" : "Email alredy exists"
}
```

<br>
<hr>
<br>

**Endpoint** : **POST /auth/login**

Summary : route for login and authenticate user

Request :

- Name : email <br>
  In : body <br>
  Description : email account, must be valid email format <br>
  Required : true <br>
  Type : String <br>

- Name : password <br>
  In : body <br>
  Description : Must be the same password used for that email<br>
  Required : true <br>
  Type : String <br>

Response Success :

```JSON
{
   "data": {
        "uuid": "0ff0a33e-c967-42ba-b842-35a1f871e5db",
        "email": "admin100@gmail.com",
        "username": "ibrhmsptra"
    }
}
```

Set Cookie :

```javascript
token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjVhZjg1YjYtZmE1OS00ZmZkLThhNDctZTRiN2U5ZDFiZTEzIiwiZW1haWwiOiJpYnJobXNwdHJhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaWJyaG1zcHRyYSIsImlhdCI6MTcxMzQzMjE2MCwiZXhwIjoxNzEzNDM1NzYwfQ.NzpYiArtWNbo9WKfKv-ueGsqRoTEbtylE_6ty9L6kfA";
```

Response Error :

```JSON
{
   "message" : "Invalid credentials"
}
```

<br>
<hr>
<br>

**Endpoint** : **DELETE /auth/logout**

Summary : route for logout and remove cookie token from user

Response Success :

```JSON
{
    "message" : "Successfully logout"
}
```

Set Cookie :

```javascript
token = null;
```

Response Error :

```JSON
{
   "message" : "Unauthorized user"
}
```

**Endpoint** : **GET /auth/validate**

Summary : route for verify JWT from cookie HTTP-Only

Request :

- Name : token <br>
  In : cookies <br>
  Description : JWT auth user <br>
  Required : true <br>
  Type : String <br>

Response Success :

````JSON
{
    "message": "valid",
    "user": {
        "uuid": "170df627-bce2-4feb-81ce-1fedda2b718d",
        "email": "ibrhmsptra@gmail.com",
        "username": "IbrhmSptra",
        "iat": 1715672235,
        "exp": 1716277035
    }
}

Response Error :

```JSON
{
   "message" : "Unauthorized user"
}
````

### - **Categories**

Endpoint : **GET /api/categories**

Summary : To get all food categories on foodo website.

Response Success :

```JSON
{
   "data" :[
      {
         "id" : 1,
         "name" : "Korea",
         "header_image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/Banner/Korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9CYW5uZXIvS29yZWEucG5nIiwiaWF0IjoxNzA5ODc4NzgzLCJleHAiOjE3NzI5NTA3ODN9.TgW03aNnWHB6tb1lFYYnbc6YzyNCyclGETKgzOPeKSE&t=2024-03-08T06%3A19%3A43.378Z",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z"
      },
      {
         "id" : 2,
         "name" : "Jepang",
         "header_image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/Banner/Jepang.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9CYW5uZXIvS29yZWEucG5nIiwiaWF0IjoxNzA5ODc4NzgzLCJleHAiOjE3NzI5NTA3ODN9.TgW03aNnWHB6tb1lFYYnbc6YzyNCyclGETKgzOPeKSE&t=2024-03-08T06%3A19%3A43.378Z",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/jepang.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z"
      }
   ]
}
```

Response Error :

```JSON
{
   "message" : "Data not found"
}
```

<br>
<hr>
<br>

Endpoint : **GET /api/categories/:id**

Summary : To get one category by id

Request :

- Name : id <br>
  In : params <br>
  Description : spesific id for category <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data": {
        "id": 21,
        "name": "Nusantara",
        "header_image": "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/Banner/Nusantara.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9CYW5uZXIvTnVzYW50YXJhLnBuZyIsImlhdCI6MTcwOTg4Nzg3MiwiZXhwIjoxNzcyOTU5ODcyfQ.8YywnlmJsDq_0Abpos3MX0CHynoke1gEYgm87LuxCtc&t=2024-03-08T08%3A51%3A12.688Z",
        "image": "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/nusantara.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9udXNhbnRhcmEucG5nIiwiaWF0IjoxNzA5NjM5NjIxLCJleHAiOjE3NzI3MTE2MjF9.f5dnmz8XE-zmdbyomuaJQkloaoYm0qZSoU6LYlCye3U&t=2024-03-05T11%3A53%3A42.072Z"
    }
}
```

Response Error :

```JSON
{
   "message" : "Data not found"
}
```

### - **Food**

**Endpoint** : **GET /api/food?page=1**

Summary : to get food data

Request :

- Name : page <br>
  In : query <br>
  Description : To set pagination on data <br>
  Required : true <br>
  Type : Int <br>
  Default : 1

- Name : category <br>
  In : query <br>
  Description : To get food data by categories using category id <br>
  Required : false <br>
  Type : Int <br>

- Name : price <br>
  In : query <br>
  Description : To get food sorted by price can be asc or desc<br>
  Required : true <br>
  Type : String <br>
  Default : "asc"

- Name : rating <br>
  In : query <br>
  Description : To get food sorted by rating can be asc or desc<br>
  Required : false <br>
  Type : String <br>

- Name : order <br>
  In : query <br>
  Description : To get food sorted by order can be asc or desc<br>
  Required : false <br>
  Type : String <br>

Response Success :

```JSON
{
   "page" : 2,
   "total_pages" : 5,
   "total_results" : 20,
   "data" :[
      {
         "id" : 1,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 20000,
         "rating" : 5,
         "order" : 18
      },
      {
        "id" : 2,
         "name" : "Ramen",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 25000,
         "rating" : 3,
         "order" : 13
      },
      {
        "id" : 3,
         "name" : "Taco",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 10000,
         "rating" : 4,
         "order" : 12
      },
      {
        "id" : 4,
         "name" : "Soto Ayam",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 15000,
         "rating" : 0,
         "order" : 0
      },
   ]
}
```

Response Error :

```JSON
{
   "message" : "Data not found"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/food/:id**

Summary : to get food detail

Request :

- Name : id <br>
  In : params <br>
  Description : send id food to get food details <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data" :{
      "id" : 1,
      "name" : "Nasi Goreng",
      "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
      "description" : "Nasi goreng adalah makanan berupa nasi yang digoreng dan dicampur dalam minyak goreng, margarin, atau mentega.",
      "rating" : 5,
      "order" : 20,
      "category" : "Nusantara",
      "ingredients" : [
         {
            "amount" : 4,
            "name" : "sdt garam",
            "price" : 4000
         },
         {
            "amount" : 2,
            "name" : "potong ayam",
            "price" : 10000
         },
         {
            "amount" : 1,
            "name" : "siung bawang",
            "price" : 1000
         },
      ],
      "Method" : [
         {
            "step" : 1,
            "how" : "Panaskan minyak dan siapkan nasi yang sudah dingin"
         },
         {
            "step" : 2,
            "how" : "Masuan nasi dan aduk dengan bumbu"
         },
         {
            "step" : 3,
            "how" : "masukan telur dan ayam yang sudah di masak dengan matang"
         },
         {
            "step" : 4,
            "how" : "sajian di piring hangat hangat"
         },
      ]
   }
}
```

Response Error :

```JSON
{
   "message" : "Data not found"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/food/search**

Summary : to search food data by user query

Request :

- Name : query <br>
  In : query <br>
  Description : To get food by query search from user <br>
  Required : true <br>
  Type : String <br>

Response Success :

```JSON
{
   "data" :[
      {
         "id" : 1,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "category" : "Nusantara"
      },
      {
        "id" : 2,
         "name" : "Ramen",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "category" : "Jepang"
      },
      {
        "id" : 3,
         "name" : "Taco",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "category" : "Western"
      },
      {
        "id" : 4,
         "name" : "Soto Ayam",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "category" : "Nusantara"
      },
   ]
}
```

Response Error :

```JSON
{
   "data" : [],
   "message" : "Data not found"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/food/random**

Summary : to get food data with random with limitation

Request :

- Name : limit <br>
  In : query <br>
  Description : To set limit on data <br>
  Required : true <br>
  Type : Int <br>
  Default : 1

Response Success :

```JSON
{
   "data" :[
      {
         "id" : 1,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 20000,
         "rating" : 5,
         "order" : 18
      },
      {
        "id" : 2,
         "name" : "Ramen",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 25000,
         "rating" : 3,
         "order" : 13
      },
      {
        "id" : 3,
         "name" : "Taco",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 10000,
         "rating" : 4,
         "order" : 12
      },
      {
        "id" : 4,
         "name" : "Soto Ayam",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 15000,
         "rating" : 0,
         "order" : 0
      },
   ]
}
```

Response Error :

```JSON
{
   "message" : "Something went wrong"
}
```

### - **Bookmark**

**Endpoint** : **POST /api/bookmark/:food_id**

Summary : to add food on their bookmark / favorite

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : food_id <br>
  In : params <br>
  Description : id food from users click <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data" :{
      "id" : 1,
      "name" : "Nasi Goreng",
      "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
      "description" : "Nasi goreng adalah makanan berupa nasi yang digoreng dan dicampur dalam minyak goreng, margarin, atau mentega.",
      "rating" : 5,
      "order" : 20,
      "category" : "Nusantara",
      "ingredients" : [
         {
            "amount" : 4,
            "name" : "sdt garam",
            "price" : 4000
         },
         {
            "amount" : 2,
            "name" : "potong ayam",
            "price" : 10000
         },
         {
            "amount" : 1,
            "name" : "siung bawang",
            "price" : 1000
         },
      ],
      "Method" : [
         {
            "step" : 1,
            "how" : "Panaskan minyak dan siapkan nasi yang sudah dingin"
         },
         {
            "step" : 2,
            "how" : "Masuan nasi dan aduk dengan bumbu"
         },
         {
            "step" : 3,
            "how" : "masukan telur dan ayam yang sudah di masak dengan matang"
         },
         {
            "step" : 4,
            "how" : "sajian di piring hangat hangat"
         },
      ]
   },
   "message" : "Food successfully added to bookmark"
}
```

Response Error :

```JSON
{
   "message" : "data insert failed"
}
```

<br>
<hr>
<br>

**Endpoint** : **DELETE /api/bookmark/:food_id**

Summary : to delete food on their bookmark / favorite

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : food_id <br>
  In : params <br>
  Description : id food from users click <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data" : null,
   "message" : "Food successfully deleted from bookmark"
}
```

Response Error :

```JSON
{
   "message" : "data not found"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/bookmark?page=1**

Summary : to get user food bookmark / favorite

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : page <br>
  In : query <br>
  Description : To set pagination on data <br>
  Required : true <br>
  Type : Int <br>
  Default : 1

- Name : price <br>
  In : query <br>
  Description : To get food sorted by price can be asc or desc<br>
  Required : true <br>
  Type : String <br>
  Default : "asc"

- Name : rating <br>
  In : query <br>
  Description : To get food sorted by rating can be asc or desc<br>
  Required : false <br>
  Type : String <br>

- Name : order <br>
  In : query <br>
  Description : To get food sorted by order can be asc or desc<br>
  Required : false <br>
  Type : String <br>

Response Success :

```JSON
{
   "page" : 2,
   "total_pages" : 5,
   "total_results" : 20,
   "data" :[
      {
         "id" : 1,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 20000,
         "rating" : 5,
         "order" : 18
      },
      {
        "id" : 2,
         "name" : "Ramen",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 25000,
         "rating" : 3,
         "order" : 13
      },
      {
        "id" : 3,
         "name" : "Taco",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 10000,
         "rating" : 4,
         "order" : 12
      },
      {
        "id" : 4,
         "name" : "Soto Ayam",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 15000,
         "rating" : 0,
         "order" : 0
      },
   ]
}
```

Response Error :

```JSON
{
   "message" : "data not found"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/bookmark/:food_id**

Summary : to find food on their bookmark / favorite

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : food_id <br>
  In : params <br>
  Description : id food that want to search <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data" :{
         "id" : 1,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 20000,
         "rating" : 5,
         "order" : 18
   }
}
```

Response Error :

```JSON
{
   "message" : "data not found"
}
```

### - **Order**

**Endpoint** : **POST /api/order/:food_id**

Summary : to create order / food transaction on table order

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : food_id <br>
  In : params <br>
  Description : id of food want to order by user <br>
  Required : true <br>
  Type : Int <br>

- Name : location <br>
  In : body <br>
  Description : Location where food will be sent <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data" :{
      "id" : 1,
      "name" : "Nasi Goreng",
      "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
      "description" : "Nasi goreng adalah makanan berupa nasi yang digoreng dan dicampur dalam minyak goreng, margarin, atau mentega.",
      "rating" : 5,
      "order" : 20,
      "category" : "Nusantara",
      "ingredients" : [
         {
            "amount" : 4,
            "name" : "sdt garam",
            "price" : 4000
         },
         {
            "amount" : 2,
            "name" : "potong ayam",
            "price" : 10000
         },
         {
            "amount" : 1,
            "name" : "siung bawang",
            "price" : 1000
         },
      ],
      "Method" : [
         {
            "step" : 1,
            "how" : "Panaskan minyak dan siapkan nasi yang sudah dingin"
         },
         {
            "step" : 2,
            "how" : "Masuan nasi dan aduk dengan bumbu"
         },
         {
            "step" : 3,
            "how" : "masukan telur dan ayam yang sudah di masak dengan matang"
         },
         {
            "step" : 4,
            "how" : "sajian di piring hangat hangat"
         },
      ]
   },
   "message" : "Food successfully ordered"
}
```

Response Error :

```JSON
{
   "message" : "data insert failed"
}
```

<br>
<hr>
<br>

**Endpoint** : **PATCH /api/order/rating/:id**

Summary : to give rating on food that already ordered and auto-update on rating food tables

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : food_id <br>
  In : params <br>
  Description : id of food want to order by user <br>
  Required : true <br>
  Type : Int <br>

- Name : rating <br>
  In : body <br>
  Description : rate from user value can be beetwen 1-5 <br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "message" : "Food successfully rated"
}
```

Response Error :

```JSON
{
   "message" : "Patch / Update data failed"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/order**

Summary : to get user order history

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name : page <br>
  In : query <br>
  Description : To set pagination on data <br>
  Required : true <br>
  Type : Int <br>
  Default : 1

- Name : date <br>
  In : query <br>
  Description : To get food sorted by date can be asc or desc<br>
  Required : true <br>
  Type : String <br>
  Default : "desc"

- Name : price <br>
  In : query <br>
  Description : To get food sorted by price can be asc or desc<br>
  Required : false <br>
  Type : String <br>

Response Success :

```JSON
{
   "page" : 2,
   "total_pages" : 5,
   "total_results" : 20,
   "data" :[
      {
         "id" : 1,
         "food_id" : 20,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "date" : "2024-04-16T05:01:13.613Z",
         "price" : 20000,
         "rating" : 5,
      },
      {
        "id" : 2,
        "food_id" : 26,
         "name" : "Ramen",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "date" : "2024-04-16T05:01:13.613Z",
         "price" : 25000,
         "rating" : 3,
      },
      {
        "id" : 3,
        "food_id" : 8,
         "name" : "Taco",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "date" : "2024-04-16T05:01:13.613Z",
         "price" : 10000,
         "rating" : 4,
      },
      {
        "id" : 4,
        "food_id" : 9,
         "name" : "Soto Ayam",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "date" : "2024-04-16T05:01:13.613Z",
         "price" : 15000,
         "rating" : 0,
      },
   ]
}
```

Response Error :

```JSON
{
   "message" : "data not found"
}
```

<br>
<hr>
<br>

**Endpoint** : **GET /api/order/:id**

Summary : to get user order detail

Request :

- Name : user_uuid <br>
  In : cookie <br>
  Description : uuid account from that user <br>
  Required : true <br>
  Type : Int <br>

- Name :id <br>
  In : params <br>
  Description : id order from users click<br>
  Required : true <br>
  Type : Int <br>

Response Success :

```JSON
{
   "data" : {
         "id" : 1,
         "location" : "Jakarta Timur",
         "date" : "2024-04-16T05:01:13.613Z",
         "food_id" : 1,
         "name" : "Nasi Goreng",
         "image" : "https://qqnkeeuttacyfctgebzc.supabase.co/storage/v1/object/sign/WebFoodo/Kategori/korea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWJGb29kby9LYXRlZ29yaS9rb3JlYS5wbmciLCJpYXQiOjE3MDk2Mzk2MDUsImV4cCI6MTc3MjcxMTYwNX0.CrlG5v4LW3Zo9_9J82Y-qTfVlrydWMe4kPX_-M6HsdQ&t=2024-03-05T11%3A53%3A25.587Z",
         "price" : 20000,
         "ingredients" : [
         {
            "amount" : 4,
            "name" : "sdt garam",
            "price" : 4000
         },
         {
            "amount" : 2,
            "name" : "potong ayam",
            "price" : 10000
         },
         {
            "amount" : 1,
            "name" : "siung bawang",
            "price" : 1000
         },
      ]
   }
}
```

Response Error :

```JSON
{
   "message" : "data not found"
}
```

## Contributors

- **Agung**
- **Adam Wisnu Pradana**
- **Ibrahim Saputra**
- **Fachrizal Kurniawan**
- **Immanuel Bayumurti**
