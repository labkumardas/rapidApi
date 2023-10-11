var connection = require('../../config/db.config');

exports.findAll = async (table, attributes, orderByColumn, orderDirection) => {
  let columnsString;
  if (attributes) {
    columnsString = attributes.join(', ');
  } else {
    columnsString = '*';
  }
  const limit = 10;

  return new Promise((resolve, reject) => {
    const query = `SELECT ${columnsString} FROM ${table}  ORDER BY ${orderByColumn} ${orderDirection} `;

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err); // Reject the promise with the error
        return;
      }

      // Resolve the promise with the query results
      resolve(results);
    });
  });
};

exports.findAndCount = async (
  table,
  attributes,
  orderByColumn,
  orderDirection,
  offset
) => {
  // Pagination parameters
  const limit = 10;

  const columnsString = attributes.join(', ');
  let jsonObj;

  return new Promise((resolve, reject) => {
    // Query to get the paginated results with total count
    const selectQuery = `SELECT ${columnsString}, COUNT(*) OVER() as totalItems 
  FROM ${table} 
  ORDER BY ${orderByColumn} ${orderDirection} 
  LIMIT ${limit} OFFSET ${offset}`;

    // Execute the select query
    connection.query(selectQuery, (selectErr, selectResults) => {
      if (selectErr) {
        console.error('Error executing select query:', selectErr);
        return;
      }

      // Extract the total count from the first result row
      const totalItems =
        selectResults.length > 0 ? selectResults[0].totalItems : 0;

      // Remove the totalItems property from each result row
      const records = selectResults.map(({ totalItems, ...rest }) => rest);
      jsonObj = {
        totalItems: totalItems,
        records: records,
      };

      resolve(jsonObj);
    });
  });
};

exports.closeConnection = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err);
      return;
    }
    console.log('Connection closed');
  });
};
