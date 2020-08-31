import React from 'react';
import { withRouter, Link } from "react-router-dom";

// TODO: display the last submitted telegram (from localStorage) OR display error page
function Confirmation (props) {
    const message = props.location ? props.location.message : '';

    return (
        <div>
            <p>Your payment was received, check the email for more details.</p>
            <p>Your message</p>
            <p>{message}</p>

            <Link to="/new">
                <button>Send another telegram</button>
            </Link>

        </div>
    )
}

export default withRouter(Confirmation);