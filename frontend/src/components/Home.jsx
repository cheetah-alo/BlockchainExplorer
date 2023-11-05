import { Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function Home() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submitForm = (data) => {
    console.log(data);
    // check data and on depend of the data redirect to the match rout to get the information
    if (data.data.length === 66) {
      navigate(`tx/${data.data}`);
    } else if (data.data.length === 42) {
      navigate(`balance/${data.data}`);
    } else if (/^\d+\.?\d*$/.test(data.data)) {
      navigate(`block/${data.data}`);
    }
  };
  return (
    <div className="container">
      <h1>Chain Block Explorer</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <input {...register("data")}></input>
        <button className="btn btn-primary">Go</button>
      </form>
      <Outlet />
    </div>
  );
}
