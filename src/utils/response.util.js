/**
 * Sends a response with the provided data and status code.
 *
 * @param {Object} res - The response object
 * @param {number} statusCode - The status code of the response
 * @param {Object} data - The data to be sent in the response
 * @param {string} - An optional message to include in the response
 * @return {Object} The JSON response object
 */
const sendResponse = (res, statusCode, data, message, token) => {
    if (data instanceof Model) {
      data = data.toJSON();
    }
  
    const response = {
      success: statusCode < 400 ? true : false,
      ...(message ? { message } : null),
      ...(data
        ? Array.isArray(data.results)
          ? {
              data: data.results,
              total: data.total,
              currentCount: data.currentCount,
            }
          : { data }
        : {}),
      ...(token ? { token } : null),
    };
    return res.status(statusCode).json(response);
  };
  
  export default sendResponse;
  