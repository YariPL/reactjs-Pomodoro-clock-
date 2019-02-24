import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			sessionLength:25,
			seconds: '00', 
	  		minutes: 25,
			saveTimeOnPause:null,
			currentBreakSessionMode:true,
			currentTimerState: 'pause',
			timer:null
		};


			this.secondsRemaining=this.state.sessionLength * 60; 
			this.intervalHandle=null; 
		
		    this.start_stop = this.start_stop.bind(this);
			this.tick = this.tick.bind(this);

	}
	start_stop = function() {
		if(this.state.currentTimerState === 'pause'){
			console.log('start')
			this.intervalHandle = setInterval(this.tick, 1000);
			let time = this.state.minutes;
			this.secondsRemaining = time * 60;
			
			this.setState({currentTimerState:'start'},()=>({
				currentTimerState: 'start'
			}))

		} else if(this.state.currentTimerState === 'start') {

			alert('stop!');

			clearInterval(this.intervalHandle);

			this.setState({currentTimerState:'pause'},()=>({
				currentTimerState: 'pause',
			}))
			console.log(this.state.minutes);
			console.log(this.state.seconds);
		}
	}

	tick = function() {
		let min = Math.floor(this.secondsRemaining / 60);
		let sec = this.secondsRemaining - (min * 60);
		this.setState({
		  minutes: min,
		  seconds: sec
		})
		if (sec < 10) {
		  this.setState({
		    seconds: "0" + this.state.seconds,
		  })
		}
		if (min < 10) {
		this.setState({
		  value: "0" + min,
		 })
		}
		this.secondsRemaining--


		this.setState({seconds:sec},()=>({
			seconds:sec,
			minutes:min
		}))
		console.log(this.secondsRemaining)
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
						{this.state.minutes}:{this.state.seconds }
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
