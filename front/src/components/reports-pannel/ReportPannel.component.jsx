import { useEffect, useState } from "react";
import AdminReportCard from "../admin-report-card/AdminReportCard.component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import classes from "./ReportPannel.module.scss";
import SpinnerLoad from "../spinner-load/SpinnerLoad";

function ReportPannel() {

  const axiosPrivate = useAxiosPrivate();
  const [reports, setReports ] = useState();
  const [isLoading, setIsLoading ] = useState(true);


  useEffect(  () => {

    let isMounted = true;
    const controller = new AbortController();

    const getReports = async ()=> {
      try {
        const response = await axiosPrivate.get("/report/", {signal: controller.signal})
        const data = response.data;
    
        if (isMounted) {
          // Stock data
          setReports(data);
          setIsLoading(false);
        } 
      
      } catch(err) {
        console.log(err.message);
      }
    }

    getReports();

    // if unmounted component
    return ()=> {
      isMounted=false;
      controller.abort();
    }
  }, []);


  return (
    <div className={classes.reportList}>
      { isLoading 
          ? <SpinnerLoad/>
          : reports && (reports?.length > 0)
              ? reports.map(
                (r) => {
                  return (
                  <AdminReportCard
                    className = {classes.cards}
                    key={r.id}
                    report={r}
                  />
                )})
              : <p className={classes.notFound}>Pas de signalements trouvées.</p>
      }           
    </div>
  );
}

export default ReportPannel;
