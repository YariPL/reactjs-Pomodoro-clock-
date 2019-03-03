import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			sessionLength:25,
			seconds: 0, 
	  		minutes: 25,
			saveTimeOnPause:null,
			currentBreakSessionMode:true,
			currentTimerState: 'pause',
			timer:null,
			secondsRemaining:0,
			temporaryHours: null,
		};
	   this.start_stop = this.start_stop.bind(this);
		this.tick = this.tick.bind(this);
		this.reset = this.reset.bind(this);
		this.pause = this.pause.bind(this);
	}
	start_stop = function() {
		if(this.state.currentTimerState === 'pause'){
			//change current state to start
			this.setState({currentTimerState:'start'},()=>(console.log('success:start')));

			//start timer
			this.intervalHandle = setInterval(this.tick, 1000);

			//check whether session or breal mode
			if(this.state.currentBreakSessionMode === true){
				console.log('changecurrrentbreaksessionmode true')

				//set time to minutes value
				let time = this.state.minutes ? this.state.minutes : this.state.sessionLength;
				this.secondsRemaining = this.state.secondsRemaining ? this.state.secondsRemaining :time * 60;
				this.setState({secondsRemaining:this.secondsRemaining},()=>(console.log('success:new secondsRemaining')))
			} else if(this.state.currentBreakSessionMode === false) {
				console.log('changecurrrentbreaksessionmode false')
				let time = this.state.minutes ? this.state.minutes : this.state.breakLength;
				this.secondsRemaining = this.state.secondsRemaining ? this.state.secondsRemaining :time * 60;
				this.setState({secondsRemaining:this.secondsRemaining},()=>(console.log('success:new secondsRemaining')))

			}
		
			
		} else if(this.state.currentTimerState === 'start') {    
			this.pause();
		}
	}
	pause = function() {
		clearInterval(this.intervalHandle);
		//change current state to pause
		this.setState({currentTimerState:'pause'},()=>(console.log('success:pause')))
	}
	//running each second
	tick = function() {
		//console.log('%c here we start the show', 'font-size:22px;')
		let min = Math.floor(this.state.secondsRemaining / 60);
		let sec = this.state.secondsRemaining - (min * 60);
		//set minutes and seconds to value of min and sec
		this.setState({minutes: min, seconds: sec},()=>(console.log('')))
		//adding zero if value is less then zero
		/*if (sec < 10) {
		  this.setState({
		    seconds: "0" + this.state.seconds,
		  })
		}
		//adding zero if value is less then zero
		if (min < 10) {
		this.setState({
		  minutes: "0" + min,
		 })
		}*/
		console.log('%c MINUS','font-size:44px')
		this.setState({
			secondsRemaining:this.state.secondsRemaining - 1},
			()=>(console.log('decrement' + this.state.minutes + 'sss' + this.state.seconds)))
		//decrement seconds
		if(this.state.minutes === 0 && this.state.seconds === 0) {
			clearInterval(this.intervalHandle);
			this.setState({
				currentBreakSessionMode:this.state.currentBreakSessionMode ? false : true,
				currentTimerState:"pause",
				minutes:this.state.currentBreakSessionMode ? this.state.breakLength: this.state.sessionLength,
				seconds:0,
				secondsRemaining:null
			},()=>{
				this.start_stop();
				console.log(this.state.seconds)
				console.log(this.state.minutes)
			//	alert('00')
			})
		} 
		
	}
	reset = function() {
		this.setState({
			minutes:25, 
			seconds:0,
			breakLength:5,
			sessionLength:25,
			secondsRemaining:null,
			currentBreakSessionMode:true
		})
		this.pause();

	}

	//increase / decrease time functions
	breakPlus = function() {
		this.setState({
			breakLength:this.state.breakLength >= 60 ? 60 : this.state.breakLength + 1})

		if(!this.state.currentBreakSessionMode) {
			this.setState({
				minutes: this.state.minutes >= 60 ? 60 : this.state.breakLength,
				seconds: 0,
				secondsRemaining: this.state.milliSecondsRemaining + 1},() => {});
			this.pause();
		}
	}
	breakMinus = function() {
		this.setState({
			breakLength: this.state.breakLength <= 1 ? 1 : this.state.breakLength - 1})
		if(!this.state.currentBreakSessionMode) {

			this.setState({
				minutes: this.state.minutes <= 1 ? 1 : this.state.breakLength, 
				seconds: 0, 
				secondsRemaining: this.state.milliSecondsRemaining - 1},() => {});
			this.pause();
		}
	}
	sessionPlus = function() {
		//adding +1 minute
		this.setState({
			sessionLength: this.state.sessionLength >= 60 ? 60 : this.state.sessionLength + 1 ,
			minutes: this.state.minutes >= 60 ? 60 : this.state.minutes + 1,
			seconds: 0,
			secondsRemaining: this.state.milliSecondsRemaining + 1},() => {});
		this.pause();

	}
	sessionMinus = function() {
		this.setState({
			sessionLength: this.state.sessionLength <= 1 ? 1 : this.state.sessionLength - 1,
			minutes: this.state.minutes <= 1 ? 1 : this.state.minutes - 1, 
			seconds: 0,
			secondsRemaining: this.state.milliSecondsRemaining - 1},() => {});
		this.pause();
	}

	render() {
		
		return (
			<div className="App">
				<audio src="alarm.mp3"></audio>
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
							<span id="session-decrement" onClick={()=>this.sessionMinus()}>-</span>
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
						{this.state.minutes < 10 ? '0' : ''}
						{this.state.minutes || this.state.minutes === 0 ? this.state.minutes : this.state.sessionLength}:
						{this.state.seconds < 10 ? '0' : ''}
						{this.state.seconds}
					</div>
					<div id="start_stop" onClick={this.start_stop}>
						START/STOP
					</div>
					<div id="reset" onClick={this.reset}>
						reset					
					</div>
				</div>

			</div>
		);
	}
}

export default App;
