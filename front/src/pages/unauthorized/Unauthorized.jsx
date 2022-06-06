import { useNavigate } from "react-router-dom";
import NoEntry from "../../images/noentry.jpg";
import classes from "./Unauthorized.module.scss";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className={classes.unAuth}>
      <div className={classes.unAuth_wrapper}>
        <h1>Access Interdit</h1>
        <img
          src={NoEntry}
          alt="Entrée non autorisée"
          className={classes.unAuth_img}
        />
        <div className={classes.unAuth_footer}>
          <button onClick={goBack}> Retouner </button>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
