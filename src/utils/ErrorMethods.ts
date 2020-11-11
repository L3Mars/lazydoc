export const displayAxiosError = (error: any): string => {
  console.log(error.response);
  if (error.response) {
    // Request made and server responded
    if (error.response?.data?.message ?? error.response?.data?.Message) {
      return error.response.data.message ?? error.response.data.Message;
    } else if (typeof error.response.data === 'string' || error.response.data instanceof String)
      return `${error.response.data}`;
    else return `Error , ${error.response.status} ${error.response.statusText}`;
  } else {
    // The request was made but no response was received
    return `${error.message ?? error.Message}`;
  }
};
