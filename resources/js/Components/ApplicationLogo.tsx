import { Link } from '@tanstack/react-location';
import React from 'react';
import appLogo from "../../public/logo.webp"


export default function ApplicationLogo({className}) {
    return (
        <Link className={className} to='tasks'>
            <img style={{height: '100%'}} src={appLogo} alt="Virtual Mistress"/>
        </Link>
    );
}
