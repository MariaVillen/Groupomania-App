
import { useNavigate } from "react-router-dom";
import NotfoundImage from "../../images/notfoundimage.png";
import classes from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className={classes.unAuth}>
      <div className={classes.unAuth_wrapper}>
        <h2>Page non trouvée</h2>
        <p>La page que vous recherchez semble introuvable. </p>

        <img
          src={NotfoundImage}
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

export default NotFound;

