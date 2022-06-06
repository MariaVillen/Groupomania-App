import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./AdminReportCard.module.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Avatar from "../avatar/avatar.component";
import DefaultAvatar from "../../images/avatar-default.png";


// Card to show the reports on the admin report pannel.
function AdminReportCard({ report, className }) {

  // Api
  const axios = useAxiosPrivate();

  // Link to post url
  const urlid = report.postId ? `/post/${ report.postId }` : `/post/${ report.comment.postId }`;

  // States
  const [ status, setStatus ] = useState(report.state || "Non lu")

  // State Event Handler Api
  const stateHandler = async ( e )=>{
    const option = e.target.value;
    const options = [ "Non lu", "En cours", "Accepté", "Rejeté", "Archivé" ];
    if ( options.includes( option ) ){
      await axios.put(`/report/${ report.id }`, { state: option });
      setStatus(option);
    }
  }

  return (
    <div className={`${ classes.reportAdminCard } ${ className }`}>

      <div className={ classes.reportAdminCard_header }>

        <Avatar 
          userImage= { report?.user?.profilePicture || DefaultAvatar } 
          userId = { report?.userId } 
          userName = { report?.user?.name ||"Invité" }
        />

        <div className={ classes.reportAdminCard_header_title }>Signalement</div>
        <div>{ report.createdAt } </div>

      </div>

      <div className={ classes.reportAdminCard_main }>

        <div className={ classes.reportAdminCard_body }>

          <div className={ classes.reportAdminCard_body_report }>
            { report.reason }
          </div>

        </div>

        <div className={ classes.reportAdminCard_footer }>

          <Link to={ urlid } replace>Aller au message signalé </Link>

          <form>

            <label>Etat: </label>

            <select onChange={stateHandler} value={status}> 

              <option>Non lu</option>
              <option>En cours</option>
              <option>Accepté</option>
              <option>Rejeté</option>
              <option>Archivé</option>

            </select>

          </form>

        </div>
      </div>
    </div>
  );
}

export default AdminReportCard;
