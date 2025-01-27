1-Description

This project is an online grocery sales website that includes features such as: add to cart, add to wishlist, order management, admin panel for managing products and users, sending tickets, etc. This project is developed using Next.js (version 14) and mongoDB.


2-Project Structure
/
|-- src/            
|    |-- app/               # main directory for next.js files
|    |   |- about/          # about us page 
|    |   |- api/            # API routes
|    |   |- cart/           # cart page
|    |   .
|    |   .
|    |   .
|    |
|    |-- components/        # reUsable components
|    |-- styles/            # Styles (css file) + tailwindcss
|    |__ utils/             # helper functions
|
|-- public/                 # Public files (static & uploaded images & ...)
|-- models/                 # Database Collections models
|-- config/                 # Database connection configs
|-- .env                    # Environment Variables
|-- jsonconfig.json         # Project Configs
|-- next.config.mjs         # next.js configs
|-- tailwind.config.js      # tailwindcss configs
|__ README.md               # Project descriptions 


3-Features
    Users:
        1- view Product list and Details of each Product
        2- Add products to Cart
        3- Save favorite Products
        4- Send a Ticket
        5- Post Comment for Products

    Admins:
        1- Products Management (add , edit , delete)
        2- view and Manage user orders
        3- Users Management
        4- Reply to Tickets
        5- Add Discount Code & Category
        6- Approve or reject Comments submitted by users


4-technologies

    FrontEnd : Next.js (version 14) , Tailwind Css , React
    BackEnd : Next.js server actions , API routes
    Database : MongoDB
    Authentication : JWT (admin & users)
    data validation : zod
    Slider : Swiper
    Display Messages : sweetalert2
    Charts : recharts
    icons : react-icons
    Database Connection : mongoose
    Password hashing : bcryptjs

5-Demo
    site Demo : http://shopinogrocerystore.ir/