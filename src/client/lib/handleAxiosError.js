export default (error) => {
  if (error instanceof Error) {
    const { message, stack, response: { data, status } } = error;
    
    let alertMessage;
    switch (status) {
      case 400:
        alertMessage = `Bad request.\n:${data}`;
        break;
      case 404:
        alertMessage = `Delta Server not found.\n${message}`;
        break;
      default:
        alertMessage = 
          `Something went wrong, please try again.\n${data}\n${message}\n${stack}`;
        break;
    }
    alert(alertMessage);
  } else {
    alert(error);
  }
};
