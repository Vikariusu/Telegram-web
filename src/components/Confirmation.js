import React from 'react';
import { withRouter } from "react-router-dom";

// TODO: display the last submitted telegram (from localStorage) OR display error page
function Confirmation (props) {
    const message = props.location ? props.location.message : '';

    return (
        <div>
            <p>Your message</p>
            <p>{message}</p>
        </div>
    )
}

export default withRouter(Confirmation);