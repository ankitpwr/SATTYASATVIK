export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Festival",
    name: "Festival",
    componentType: "select",
    options: [
      // { id: "men", label: "Men" },
      // { id: "women", label: "Women" },
      // { id: "kids", label: "Kids" },
      // { id: "accessories", label: "Accessories" },
      // { id: "footwear", label: "Footwear" },
       { id: "Diwali", label: "Diwali" },
        { id: "Ganesh Pooja", label: "Ganesh Pooja"},
        { id: "Holi", label: "Holi"},
        { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan"},
        { id: "Gifts", label: "Gifts"},
    ],
  },
  {
    label: "Idols",
    name: "Idols",
    componentType: "select",
    options: [
      // { id: "nike", label: "Nike" },
      // { id: "adidas", label: "Adidas" },
      // { id: "puma", label: "Puma" },
      // { id: "levi", label: "Levi's" },
      // { id: "zara", label: "Zara" },
      // { id: "h&m", label: "H&M" },

       { id: "Lakshmi Mata", label: "Lakshmi Mata"},
        { id: "Ganesha", label: "Ganesha"},
        { id: "Adiyogi", label: "Adiyogi"},
        { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha"},
        { id: "Saraswati Mata", label: "Saraswati Mata"},
        { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati"},
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "Diwali",
    label: "Diwali",
    path: "/shop/listing",
  },
  {
    id: "Ganesh Pooja",
    label: "Ganesh Pooja",
    path: "/shop/listing",
  },
  {
    id: "Holi",
    label: "Holi",
    path: "/shop/listing",
  },
  {
    id: "Raksha Bandhan",
    label: "Raksha Bandhan",
    path: "/shop/listing",
  },
  {
    id: "Gifts",
    label: "Gifts",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  Diwali: "Diwali",
  GaneshaPooja: "Ganesha Pooja",
  Holi: "Holi",
  RakhshaBandhan: "Raksha Bandhan",
  Gifts: "Gifts",
};

export const brandOptionsMap = {
  LakshmiMata: "Lakshmi Mata",
  Ganesha: "Ganesha",
  Adiyogi: "Adiyogi",
  "Lakshmi&Ganesha": "Lakshmi & Ganesha",
  SaraswatiMata: "Saraswati Mata",
  "Lakshmi&Saraswati": "Lakshmi & Saraswati",
};

export const filterOptions = {
  Festival: [
       { id: "Diwali", label: "Diwali" },
        { id: "Ganesh Pooja", label: "Ganesh Pooja"},
        { id: "Holi", label: "Holi"},
        { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan"},
        { id: "Gifts", label: "Gifts"},
  ],
  Idols: [
    { id: "Lakshmi Mata", label: "Lakshmi Mata"},
        { id: "Ganesha", label: "Ganesha"},
        { id: "Adiyogi", label: "Adiyogi"},
        { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha"},
        { id: "Saraswati Mata", label: "Saraswati Mata"},
        { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati"},
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
