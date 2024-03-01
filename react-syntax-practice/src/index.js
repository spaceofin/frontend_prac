import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const onButtonStyle = {
    padding: '30px 50px',
    margin: '100px',
    backgroundColor: 'SpringGreen',
    fontSize: '50px',
    borderRadius: '20px',
    borderWidth: '10px',
}

const offButtonStyle = {
    padding: '30px 50px',
    margin: '100px',
    backgroundColor: 'LightCoral',
    fontSize: '50px',
    borderRadius: '20px',
    borderWidth: '10px',
}

const buttonOff = {
    margin: '70px',
    fontSize: '50px',
    fontWeight: 'bold',
}

const OnButton = (props) => <button style={onButtonStyle} onClick={props.onClick}>On</button>;
const OffButton = (props) => <button style={offButtonStyle} onClick={props.onClick}>Off</button>;


const App = () => {
    const [isButtonOn, setIsButtonOn] = useState(false);

    const handleClick = () => {
        setIsButtonOn(!isButtonOn);
    }

    let button;
    if (isButtonOn) {
        button = <OnButton onClick={handleClick} />;
    } else {
        button = <OffButton onClick={handleClick} />;
    }
    return (
        <div>
            {button}<br />
            {isButtonOn && button}<br />
            {isButtonOn ? button : <p style={buttonOff}>ButtonOff</p>}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);