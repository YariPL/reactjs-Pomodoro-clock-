import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			sessionLength:25,
			sec:'00',
			saveTimeOnPause:null,
			currentBreakSessionMode:true,
			currentTimerState: 'pause',
			timer:null
		};
		    this.start_stop = this.start_stop.bind(this);
		    

	}
	start_stop = function() {
		if(this.startStop === 'pause'){
			
		} else if(this.startStop === 'start') {

		}
	}
	//increase / decrease time functions
	breakPlus = function() {
		this.setState((breakLength) => ({
			breakLength:this.state.breakLength+1
		}));
	}
	breakMinus = function() {
		this.setState((breakLength) => ({
			breakLength:this.state.breakLength-1
		}));
	}
	sessionPlus = function() {
		this.setState((sessionLength) => ({
			sessionLength:this.state.sessionLength+1
		}));
	}
	sessionMinus = function() {
		this.setState((sessionLength) => ({
			sessionLength:this.state.sessionLength-1
		}));
	}

	render() {
		
		return (
			<div className="App">
				<div className="title"> 
					Promodo Clock
				</div>
				<div className="changingDisplay">
					<div className="breakLength">
						<div id="break-label">
							Break Length:
						</div>
						<div className="breakLengthDisplay">
							<span id="break-decrement" onClick={()=>this.breakMinus()}>-</span>
							<span id="break-length">{this.state.breakLength}</span>
							<span id="break-increment" onClick={()=>this.breakPlus()}>+</span>
						</div>
					</div>
					<div className="sessionLength">
						<div id="session-label">
							Session Length:
						</div>
						<div className="sessionLengthDisplay">
							<span id="break-increment" onClick={()=>this.sessionMinus()}>-</span>
							<span id="session-length">{this.state.sessionLength}</span>
							<span id="session-increment" onClick={()=>this.sessionPlus()}>+</span>
						</div>
					</div>
				</div>
				
				<div className="sessionTimer">
					
					<div id="timer-label">
						{this.state.currentBreakSessionMode ? 'Session' : 'Break'}
					</div>
					<div id='time-left'>
						{this.state.sessionLength}:{this.state.sec}
					</div>
					<div id="start_stop" onClick={this.start_stop}>
						START/STOP
					</div>
					
				</div>

			</div>
		);
	}
}

export default App;

/*					 Date.now() + (this.state.sessionLength * 60000)

{minutes<10 ? '0' + minutes : minutes }:{seconds<10 ? '0' + seconds : seconds }
*/

this.timer =function {
	setInterval 
}