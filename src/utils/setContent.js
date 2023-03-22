import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";

export const setContent = (process, Component, data) => {
  switch (process) {
    case "Waiting":
      return <Skeleton />;
    case "Loading":
      return <Spinner />;
    case "Confirmed":
      return <Component data={data} />;
    case "Error":
      return <ErrorMessage />;

    default:
      throw new Error("Unexpected process state");
  }
};
