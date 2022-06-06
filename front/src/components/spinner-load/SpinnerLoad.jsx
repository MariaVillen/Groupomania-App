import classes from './SpinnerLoad.module.scss';

export default function SpinnerLoad({className}) {
  return (
    <div className={`${classes.container} ${className}`}>
    <div className={classes.lds_ring}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
