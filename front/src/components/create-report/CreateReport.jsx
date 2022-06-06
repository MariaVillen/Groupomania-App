import { useRef, useState, useEffect } from "react";
import classes from "./CreateReport.module.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import TextareaRezise from "../textarea-rezise/TextareaResize.component";

// Show a form to allow user create a report to a comment or post.

export default function CreateReport({ messageId, typeMessage, setOnReport }) {

  // Api
  const axiosPrivate = useAxiosPrivate();

  // Refs
  const textRef = useRef();

  // States
  const [text, setText] = useState("");

  // Focus on textarea on init
  useEffect( () => {
    textRef.current.focus();
  }, []);

  // Event Handler: cancel button.
  const cancelHandler = ( e ) => {
    setText( "" );
    setOnReport( false );
  }

  // Event Handler: submit form, send report.
  const submitHandler = ( e ) => {

    e.preventDefault();

    if ( text ) {

      let reportObject;
      
      if ( typeMessage === "post" ) {
      
        reportObject = { 
          reason: text, 
          postId: messageId 
        }
      
      } else if ( typeMessage === "comment" ) {

        reportObject = {
          reason: text, 
          commentId: messageId
        }

      } else {

        console.log( "Error: type de commentaire non indiqué" );
      
      }

      axiosPrivate
        .post( "/report", reportObject )
        .then( () => {
          setText( "" );
          setOnReport( false );
        })
        .catch( ( err ) => {
          console.log( err );
        });
    } else {
      console.log( "Indiquez la raison du signalement." );
    }

  };


  return (
        <div className={classes.createReport}>
          <div className={classes.createReport_card}>

            <div className={classes.createReport_header}>
              <p> Signaler cette publication </p>
            </div>

            <form>
              <div className={classes.createReport_body}>

                <p> Indiquez la raison du singalement:</p>

                <div className={classes.createReport_body_text}>
                  <TextareaRezise
                    name="textOfComment"
                    innerRef={textRef}
                    onChange={(e) => setText(e.target.value)}
                    placeHolder="Pour quoi vous signalez cette publication?"
                    className={classes.createReport_body_text_edit}
                    text={text}
                  />
                </div>

              </div>

              <div className={classes.createReport_footer}>

              <button
                  onClick={cancelHandler}
                  className={`${classes.btn} ${classes.btn_cancel}`}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={submitHandler}
                  className={`${classes.btn} ${classes.btn_cancel}`}
                >
                  Signaler
                </button>
              </div>
          </form>
          </div>
        </div>)
}
