import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer:'00:00',
			breakLength:5,
			sessionLength:25
		};

	}
	render() {
		return (
			<div className="App">
				<div className="title"> 
					Promodo Clock
				</div>
				<div className="changingDisplay">
					<div className="breakLength">
						<div className="breakLengthTitle">
							Break Length:
						</div>
						<div className="breakLengthDisplay">
							<span>+</span>
							<span>{this.state.breakLength}</span>
							<span>-</span>
						</div>
					</div>
					<div className="sessionLength">
						<div className="sessionLengthTitle">
							Session Length:
						</div>
						<div className="sessionLengthDisplay">
							<span>+</span>
							<span>{this.state.sessionLength}</span>
							<span>-</span>
						</div>
					</div>
				</div>

				<div className="sessionTimer">
					<div className="sessionTimerTitle">
						Session
					</div>
					<Timer timerValue = {this.state.timer}/>
					<div className="buttons">
						BUTTONS
					</div>
				</div>

			</div>
		);
	}
}

class Timer extends Component {
	constructor() {
		 super();
	}
	render() {
		return (
			<div className="timer">
				{this.props.timerValue}
			</div>
		);
	}
}

export default App;

