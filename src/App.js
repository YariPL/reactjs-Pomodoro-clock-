import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			seconds: '00', 
	  		minutes: 25,
			saveTimeOnPause:null,
			currentBreakSessionMode:true,
			currentTimerState: 'pause',
			timer:null,
			secondsRemaining:null

		};


			//this.secondsRemaining=this.state.sessionLength * 60; 
			this.intervalHandle=null; 
		
		   this.start_stop = this.start_stop.bind(this);
			this.tick = this.tick.bind(this);
			this.renderAfterPlusMinus = this.renderAfterPlusMinus.bind(this);
	}
	start_stop = function() {
		if(this.state.currentTimerState === 'pause'){
			console.log('start')
			this.intervalHandle = setInterval(this.tick, 1000);
			let time = this.state.minutes;
			console.log(this.state.secondsRemaining);
			this.secondsRemaining = this.state.secondsRemaining ? this.state.secondsRemaining : time * 60;
			
			this.setState({currentTimerState:'start'},()=>({
				currentTimerState: 'start'
			}))

		} else if(this.state.currentTimerState === 'start') {


			clearInterval(this.intervalHandle);

			this.setState({currentTimerState:'pause'},()=>({
				currentTimerState: 'pause',
			}))
			console.log(this.state.minutes);
			console.log(this.state.seconds);
		}
	}
	//running each second
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


		
		console.log(this.secondsRemaining);
		this.setState({sec, min},()=>({
			seconds:sec,
			minutes:min,
		}))
			this.setState({	
				secondsRemaining:this.secondsRemaining
			});



	}
	
	renderAfterPlusMinus = function() {
		let min = Math.floor(this.state.secondsRemaining / 60);
		let sec = this.state.secondsRemaining - (min * 60);
		this.setState({
		  minutes: min,
		  seconds: sec
		})


		
	}

	//increase / decrease time functions
	breakPlus = function() {
		this.setState((breakLength) => ({
			breakLength:this.state.breakLength+1,
			//secondsRemaining: this.state.secondsRemaining + 60

		}));
		this.renderAfterPlusMinus();
	}
	breakMinus = function() {
		this.setState((breakLength) => ({
			breakLength:this.state.breakLength-1,
			//secondsRemaining: this.state.secondsRemaining - 60

		}));
		this.renderAfterPlusMinus();
	}
	sessionPlus = function() {
		this.setState((secondsRemaining) => ({
			//secondsRemaining: this.state.secondsRemaining + 60,
			minutes: this.state.minutes + 1

		}));
		//this.renderAfterPlusMinus();
	}
	sessionMinus = function() {
		this.setState((secondsRemaining) => ({
			secondsRemaining: this.state.secondsRemaining - 60

		}));
		//this.renderAfterPlusMinus();
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
