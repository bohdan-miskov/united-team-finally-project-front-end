import css from "./Loader.module.css";
import { PropagateLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.loader}>
      <PropagateLoader aria-label="Loading Spinner" size={15} color="blue" />
    </div>
  );
}
