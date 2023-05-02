import SingleItem from "./SingleItem";
import { useFetchTasks } from "./hooks/useFetchTasks";

const Items = () => {
  const { isLoading, data, error } = useFetchTasks();

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  // entweder so...
  // if (isError) {
  //   return <p style={{ marginTop: "1rem" }}>There was an error..</p>;
  // }

  // oder so... 👇
  if (error) {
    // Falls es einen Error gibt, werfe eine error.msg (kommt von Axios)
    return <p style={{ marginTop: "1rem" }}>{error.msg}</p>;
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
