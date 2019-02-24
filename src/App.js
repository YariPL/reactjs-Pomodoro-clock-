import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			sessionLength:25,
			seconds: '00', 
	  		minutes: '',
			saveTimeOnPause:null,
			currentBreakSessionMode:true,
			currentTimerState: 'pause',
			timer:null,
			secondsRemaining:null,
			temporaryHours: null
		};
		//this.intervalHandle=null; 
	   this.start_stop = this.start_stop.bind(this);
		this.tick = this.tick.bind(this);
		this.reset = this.reset.bind(this);
		this.pause = this.pause.bind(this);

		//this.renderAfterPlusMinus = this.renderAfterPlusMinus.bind(this);
	}
	start_stop = function() {
		if(this.state.currentTimerState === 'pause'){
				console.log('start');
				//start timer
				this.intervalHandle = setInterval(this.tick, 1000);
				//check whether session or breal mode
				if(this.state.currentBreakSessionMode === true){
					//set time to minutes value
					let time = this.state.minutes ? this.state.minutes : this.state.sessionLength;
					this.secondsRemaining = this.state.secondsRemaining ? this.state.secondsRemaining :time * 60;

				} else {
					let time = this.state.minutes ? this.state.minutes : this.state.breakLength;
					this.secondsRemaining = this.state.secondsRemaining ? this.state.secondsRemaining :time * 60;

				}
				//change current state to start
				this.setState({currentTimerState:'start'},()=>({currentTimerState: 'start'}))
			
		} else if(this.state.currentTimerState === 'start') {
			this.pause();
		}
	}
	pause = function() {
		clearInterval(this.intervalHandle);
			//change current state to pause
		this.setState({currentTimerState:'pause'},()=>({currentTimerState: 'pause',}))

	}
	//running each second
	tick = function() {
		let min = Math.floor(this.secondsRemaining / 60);
		let sec = this.secondsRemaining - (min * 60);
		this.setState({minutes: min, seconds: sec})
		//adding zero if value is less then zero
		if (sec < 10) {
		  this.setState({
		    seconds: "0" + this.state.seconds,
		  })
		}
		//adding zero if value is less then zero
		if (min < 10) {
		this.setState({
		  value: "0" + min,
		 })
		}
		//decrement seconds
		this.secondsRemaining--;
		if(this.state.minutes === 0 && this.state.seconds === '00') {
			alert('stop')
			clearInterval(this.intervalHandle);
			this.setState({currentBreakSessionMode:!true,currentTimerState:"pause"},()=>{
				this.start_stop();
			})
		} 
		
	}
	reset = function() {
		this.setState({
			minutes:25, 
			seconds:'00'
		})
		this.pause();//clearInterval(this.intervalHandle);

	}

	//increase / decrease time functions
	breakPlus = function() {
		this.setState((breakLength) => ({
			breakLength:this.state.breakLength+1,
			//secondsRemaining: this.state.secondsRemaining + 60

		}));
		this.pause();
		//this.renderAfterPlusMinus();
	}
	breakMinus = function() {
		this.setState((breakLength) => ({
			breakLength:this.state.breakLength-1,
			//secondsRemaining: this.state.secondsRemaining - 60

		}));
		this.pause();
		//this.renderAfterPlusMinus();
	}
	sessionPlus = function() {
		//adding +1 minute
		this.setState({minutes: this.state.minutes + 1, seconds: '00'},() => {});
		this.pause();
		//this.renderAfterPlusMinus();

	}
	sessionMinus = function() {
		this.setState({minutes: this.state.minutes - 1, seconds: '00'},() => {});
		this.pause();
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
						{this.state.minutes ? this.state.minutes : this.state.sessionLength}:{this.state.seconds }
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
