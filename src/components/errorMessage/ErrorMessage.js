import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <img
      style={{
        display: "block",
        width: "200px",
        height: "200px",
        objectFit: "contain",
        margin: "auto",
      }}
      src={img}
      alt="Error"
    />
  );
};

export default ErrorMessage;
