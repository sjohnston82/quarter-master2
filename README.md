# Quartermaster Pantry Inventory Manager

## Introduction

Quartermaster is a family-based pantry inventory manager where you can keep track of all the food items in your house. Invite your family members to a Household and everyone can stay up-to-date on what's on your shelves, what's on your shopping list and when things are going to expire.

## Features

- Easily add items by using your phone's camera to scan bar codes
- Invite the whole family to stay up-to-date together
- Track expiration dates so you cut down on wastage
- Share shopping lists so everyone knows what's needed at home while they're out
- User authentication with Gmail and Facebook login
- Responsive design ensuring optimal user experience on different devices

## Usage

To start using Quartermaster, visit [https://www.quarter-master.net](https://www.quarter-master.net) and sign in with either your Gmail or Facebook account.

You will be redirected to a page where you can either create a new Household, which is the name for the space which you and whoever you invite can share inventories of your food items and shopping lists, or where you can join an existing household if you were sent an invitation code via email.

Once you have created a new household, you can start by either inviting your family members to join you, or by creating a Storage Area, which is where the food items in your house are stored, (pantry, refrigerator, etc...). Once you create one, you can start adding the food items you have there either by scanning the item's bar code, or by entering the item's information manually. You can add information such as expiration dates, brand, flavor and what type of food it is.

## Installation

If you wish to install Quartermaster on your local machine, you can follow the following steps:

1. Clone the repository:

```
git clone https://github.com/sjohnston82/quarter-master2.git
```

2.  Navigate to the project directory:

```
cd quarter-master2
```

3.  Install dependencies:

```
npm install
```

4. Create a **.env** file based on the provided **.env.example** file and update the environment variables with your configuration.

5. Set up the PostgreSQL database:

- Create a new database in PostgreSQL.
- Update the **DATABASE_URL** variable in the **.env** file with your database connection URL.

6. Run database migrations:

```
npx prisma migrate dev
```

7. Start the development serverL

```
npm run dev
```

8. Open your browser and navigate to http://localhost:3000 to access the application.

## Contributing

Contributions to Quartermaster are welcome! If you encounter issues or have suggestions, please open an issue on the [Github Repository](https://github.com/sjohnston82/quarter-master2/issues/)

Created and maintained by [Stephen Johnston](https://stephenmjohnston.net)
