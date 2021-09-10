# Corcus Data Dashboard

![screenshot](http://blogs.ubc.ca/rajdeepdev/files/2021/08/Capture.png)



Your task is to build a data dashboard that retrieves data from a DB and displays them in a front-end application in a variety of charts.

#### Tasks

- Create RESTfuls APIs to query data from the db.
- Create a React application to query and render the data.
- Follow standard Git commit workflows.

## Set up:

- Install PostgressDB and pg_restore tools

  ```sh
  npm run db:create

  npm run db:restore

  npm start
  ```

- Install node 10.23
- Npm install all modules
- Restore the database: You will have access to the `data.dump` file. If you are unable to open the dump file, please let me know.
- Connect run the database connection file.

## Tools/Framworks used:

- React (Hooks): https://reactjs.org/docs/getting-started.html
- Express: http://expressjs.com/en/guide/routing.html
- Sequelize: https://sequelize.org/v5/

## DB relationship:

1. A creator belongs to a user
2. A user can have many applications
3. A creator can have many applications
4. A company can have many listings
5. A listing can have many applications

Users are split into `user_type` of `brands` and `creators`

## Data to display:

- Total number of `creators` who created their accounts every day. Fidelity can be changed from days to weeks to months.
- Total new `creators` `applications` every day. Fidelity can be changed from days to weeks to months.
- Total `creators` `categories` organized by each category.
- Average `applications` per `listings` over `x` period. `x` should adjustable to days, weeks.
- Total new campaigns created over `x` period. `x` should adjustable.

**Note:**

- Default time period should be the entire time scale.
- You should use a variety of charts

## Type of charts:

You should decide what is the best type of chart to display the above information.
You can choose one of the charting libraries from below:

- https://formidable.com/open-source/victory/
- https://nivo.rocks/#/
- https://uber.github.io/react-vis/
- https://www.chartjs.org

## We are looking to see how you:

- Pick up new frameworks.
- Ynderstand the data-structure and create queries from a relational DB.
- Nake design decisions regarding APIs.

## Communication during project:

While you are expected to work on this task yourself, feel free to contact rongxin.zhang@corcus.io at any time if you have questions or want to discuss ideas or unsure about something.

## Timeline:

This project should take around a day's work. However, you will have 1 week to complete this project.
