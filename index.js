const {
  Application,
  ApplicationMessages,
  Creators,
  Users,
  UserCategory,
  Listing,
  Company,
  CompanyManagers,
  Category,
  sequelize
} = require("./db/sequelize");

const express = require("express");
const Sequelize = require("sequelize");
const app = express();

// const getAllUsers = async () => {
//   console;
//   try {
//     const allUsers = await Users.findAll();
//     console.log("Users", allUsers.length);
//     return allUsers.length;
//   } catch (error) {}
// };

// getAllUsers();


//ROUTES//


app.get("/api", (req, res) => {
  res.json({"message": "Hello from server"});
});


/* GET the dates, frequency a creator created account */
app.get("/api/creators-date", async (req, res) => {
  console;
  try {
    const allDates = await Creators.findAll({
      attributes: [
          [Sequelize.literal(`DATE("createdAt")`), 'date'],
          [Sequelize.literal(`COUNT(*)`), 'count']
      ],
      group: ['date']
  });

    res.status(200).json(allDates);
  } catch (error) {console.log(error.message)}
});



/* GET the dates an application was created by an user who is a creator */
app.get("/api/application-creators-date", async (req, res) => {
  console;
  try {
    const allDates = await Application.findAll({
      include: [
        {
        model: Users,
        where: {user_type: ['creator']},
        attributes: []
        },
      ],
      attributes: [
        ["createdAt", "date"],
      ],
      group: ['date']
    });

    res.status(200).json(allDates);
  } catch (error) {console.log(error)}
});




/* GET the categories, frequency by users who are a creator */
app.get("/api/creators-category-frequency", async (req, res) => {
  console;
  try {
    const [allCategories, metadata] = await sequelize.query(`
      SELECT categories.value, COUNT(*) FROM categories 
      JOIN user_categories ON categories.id=user_categories.category_id 
      JOIN users ON user_categories.id=users.id 
      WHERE users.user_type='{creator}' 
      GROUP BY categories.value;
    `);

    res.status(200).json(allCategories);
  } catch (error) {console.log(error.message)}
});




/* GET the application_count, listing_count, and dates for the dates an application was created */
app.get("/api/application-listing-dates", async (req, res) => {
  console;
  try {
    const [allCategories, metadata] = await sequelize.query(`
          SELECT application_table.date, SUM(application_table.count) AS "application_count", COALESCE(SUM(listing_table.count), 0) AS "listing_count"
          FROM
            (SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') AS "date", COUNT(*) AS "count" 
              FROM applications 
              GROUP BY "date") AS application_table
          LEFT JOIN
            (SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') AS "date", COUNT(*) AS "count" 
              FROM listings 
              GROUP BY "date") AS listing_table
          ON application_table.date=listing_table.date
          GROUP BY application_table.date;
    `);

    res.status(200).json(allCategories);
  } catch (error) {console.log(error.message)}
});




/* GET the application_count, listing_count, and week number an application was created 
  Date is in YYYY-WW format where WW is week number of that year
*/
app.get("/api/application-listing-weeks", async (req, res) => {
  console;
  try {
    const [allCategories, metadata] = await sequelize.query(`
          SELECT application_table.date, SUM(application_table.count) AS "application_count", COALESCE(SUM(listing_table.count), 0) AS "listing_count"
          FROM
            (SELECT TO_CHAR("createdAt", 'IYYY"-"IW') AS "date", COUNT(*) AS "count" 
              FROM applications 
              GROUP BY "date") AS application_table
          LEFT JOIN
            (SELECT TO_CHAR("createdAt", 'IYYY"-"IW') AS "date", COUNT(*) AS "count" 
              FROM listings 
              GROUP BY "date") AS listing_table
          ON application_table.date=listing_table.date
          GROUP BY application_table.date;
    `);

    res.status(200).json(allCategories);
  } catch (error) {console.log(error.message)}
});


app.listen(3001, () => {
  console.log("Node is listening on port 3001...");
});