const Notification = ({ message, isError }) => {
  let alertColor = "green";

  if (message === null) {
    return null;
  }

  if (isError !== null && isError) {
    alertColor = "red";
  }

  const notificationStyles = {
    color: alertColor,
    background: "lightgrey",
    borderColor: alertColor,
    borderStyle: "solid",
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyles}>{message}</div>;
};

export default Notification;
