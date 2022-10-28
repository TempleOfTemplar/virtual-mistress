import {Link} from '@tanstack/react-location';
import React, {FC} from 'react';
import classNames from "classnames";
import classes from './app-logo.module.css';
import {router} from "@/routes";

const AppLogo: FC<{ className: string }> = ({className}) => {
    // const linkInfo = router.buildLink({
    //     to: '/tasks',
    // });
    // const {
    //     handleClick,
    //     handleFocus,
    //     handleEnter,
    //     handleLeave,
    //     isActive,
    //     next,
    // } = linkInfo
    return (
        <div className={classNames(className, classes.appLogo)}>
            <span className={classes.logoText}>Вир<span className={classes.blinkText}>т</span>уальная<br/>гос<span
                className={classes.blinkText}>по</span>жа</span>
            {/*<div className={classes.textEffect}>*/}
            {/*    <span className={classes.neonText} data-text="Виртуальная госпожа        ">Виртуальная госпожа        </span>*/}
            {/*    <div className={classes.gradient}/>*/}
            {/*    <div className={classes.spotlight}/>*/}
            {/*</div>*/}
            {/*<img style={{height: '100%'}} src={appLogo} alt="Virtual Mistress"/>*/}
        </div>
    );
}

export default AppLogo;
