var connection = require('../../config/db.config');

exports.findAll = async (table, attributes, orderByColumn, orderDirection) => {
  let columnsString;
  console.log(attributes);

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
  req,
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
  let type;
  let format;

  console.log(req.body.type, req.body.format);
  if (req.body.type !== undefined && req.body.type !== null) {
    type = req.body.type;
  }
  if (req.body.format !== undefined && req.body.format !== null) {
    format = req.body.format;
  }

  return new Promise((resolve, reject) => {
    let whereClause = {};
    if (type !== undefined) {
      whereClause.match_format = type;
    }
    if (format !== undefined) {
      whereClause.status_str = format;
    }
    const selectQuery = `SELECT ${columnsString}, COUNT(*) OVER() as totalItems 
  FROM ${table} 
  ${buildWhereClause(whereClause)} 
  ORDER BY ${orderByColumn} ${orderDirection} 
  LIMIT ${limit} OFFSET ${offset}`;

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

//

exports.findByMatchID = async (table, attributes, id, matchType) => {
  let columnsString;

  if (attributes) {
    columnsString = attributes.join(', ');
  } else {
    columnsString = '*';
  }

  return new Promise((resolve, reject) => {
    let whereClause = {};

    if (id !== undefined) {
      whereClause.id = id;
    }
    if (
      matchType !== undefined ||
      matchType !== 'undefined' ||
      matchType !== null ||
      matchType !== 'null'
    ) {
      whereClause.status_str = matchType;
    }
    if (matchType == 'undefined' || matchType == undefined) {
      delete whereClause.status_str;
    }

    const query = `SELECT ${columnsString} FROM ${table} ${buildWhereClause(
      whereClause
    )}`;
    console.log('query', whereClause);

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

//

exports.findMatchIDFromChieldTable = async (table, attributes, id) => {
  let columnsString;

  if (attributes) {
    columnsString = attributes.join(', ');
  } else {
    columnsString = '*';
  }

  return new Promise((resolve, reject) => {
    let whereClause = {};

    if (id !== undefined) {
      whereClause.match_id = id;
    }

    const query = `SELECT ${columnsString} FROM ${table} ${buildWhereClause(
      whereClause
    )}`;
    console.log('query', whereClause);

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
//

exports.closeConnection = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err);
      return;
    }
    console.log('Connection closed');
  });
};

const buildWhereClause = (conditions) => {
  const conditionsArray = Object.entries(conditions).map(
    ([key, value]) => `${key} = "${value}"`
  );
  if (conditionsArray.length > 0) {
    return `WHERE ${conditionsArray.join(' AND ')}`;
  }
  return '';
};
