import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			sessionLength:25,
			saveTimeOnPause:null,
			currentBreakSessionMode:true,
			currentTimerState: 'stop'
		};
		
 		this.startTimer = this.startTimer.bind(this);
 		this.start_stop = this.start_stop.bind(this);

	}
		timera = null;
		startTimer = function(duration, display) {
			let timer = duration, minutes, seconds;
			this.timera = setInterval(function () {
				minutes = parseInt(timer / 60, 10)
				seconds = parseInt(timer % 60, 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				display.textContent = minutes + ":" + seconds;
				this.setState( {
					saveTimeOnPause:`${minutes} : ${seconds}`
				},() => {
				    console.log("stateValue:");
				});
				if (--timer < 0) {
				   timer = duration;

				}
			}, 1000); 
		};

		start_stop = function() {
			if(this.state.currentTimerState === 'stop'){	
				let fiveMinutes = 60 * this.state.sessionLength,
				display = document.querySelector('#time-left');
				this.startTimer(fiveMinutes, display);
				console.log('RUN TIMER')
				this.setState({
					currentTimerState: 'run'
				})
			} else if(this.state.currentTimerState === 'run'){
				console.log('STOP TIMER')
				console.log(this.state.saveTimeOnPause)
				console.log(this.timera)

				clearInterval(this.timera);
			}
		}



		//increase / decrease time functions
		breakPlus = function() {
			this.setState({
				breakLength:this.state.breakLength+1
			});
		};
		breakMinus = function() {
			this.setState({
				breakLength:this.state.breakLength-1
			});
		};
		sessionPlus = function() {
			this.setState({
				sessionLength:this.state.sessionLength+1
			});
		};
		sessionMinus = function() {
			this.setState({
				sessionLength:this.state.sessionLength-1
			});
		};

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
					<Timer sessionLength = {this.state.sessionLength}/>
					<div id="start_stop" onClick={()=>this.start_stop()}>
						START/STOP
					</div>
					
				</div>

			</div>
		);
	}
}

class Timer extends Component {




	render() {
		return (
			<div id="time-left">
				{this.props.sessionLength}:00
			</div>
		);
	}
}

export default App;

