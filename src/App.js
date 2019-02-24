import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import './App.css';

const renderer = ({  minutes, seconds }) => {

    return <span>{minutes<10 ? '0' + minutes : minutes }:{seconds<10 ? '0' + seconds : seconds }</span>;
  	
};
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength:5,
			sessionLength:25,
			saveTimeOnPauseMM:null,
			saveTimeOnPauseSS:null,
			currentBreakSessionMode:true,
			currentTimerState: 'stop',
			timer:null
		};
		    this.start_stop = this.start_stop.bind(this);

	}
	start_stop = function() {
		console.log('start_stop');
		this.video.play();
	};
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
					 <Countdown
					    date={Date.now() + (this.state.sessionLength * 60000)}
					    key={'timer'}
					    zeroPadTime={2}
					    renderer={renderer}
					    autoStart={false}

					     ref={Countdown => this.Countdown = Countdown}
					  />
					<div id="start_stop" onClick={this.start_stop}>
						START/STOP
					</div>
					
				</div>

			</div>
		);
	}
}

export default App;

