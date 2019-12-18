import React, { Component, Fragment } from 'react';

import { Container, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import Request from 'axios-request-handler';

import {
	AppHeader,
	SystemStatus,
	Schedule,
	AlarmStatus,
	SongsList
} from "../components";
import url from '../settings/url'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			sysStatus: false,
			schStatus: false,
			alStatus: false,
			songs: undefined,
			selectedSong: undefined
		};
		
		this.setSystemStatus = this.setSystemStatus.bind(this);
		this.setScheduleStatus = this.setScheduleStatus.bind(this);
		this.setAlarmStatus = this.setAlarmStatus.bind(this);
		this.setSong = this.setSong.bind(this);
	}
	
	componentDidMount() {
		const system = new Request(url + 'enabled');
		const schedule = new Request(url + 'day-enabled');
		const alarm = new Request(url);
		const selectedSong = new Request(url + 'sound');
		
		system.poll(5000).get((res) => {
			if ( res.hasOwnProperty("data") && res.data !== this.state.sysStatus ) {
				this.setState({ sysStatus: res.data });
			} else if ( res.status > 399 ) {
				console.log('Error, please try again')
			}
		});
		
		schedule.poll(10000).get((res) => {
			if ( res.hasOwnProperty("data") && res.data !== this.state.schStatus ) {
				this.setState({ schStatus: res.data });
			} else if ( res.status > 399 ) {
				console.log('Error, please try again')
			}
		});
		
		alarm.poll(1000).get((res) => {
			if ( res.hasOwnProperty("data") && res.data !== this.state.alStatus ) {
				this.setState({ alStatus: res.data });
			} else if ( res.status > 399 ) {
				console.log('Error, please try again')
			}
		});
		
		selectedSong.poll(20000).get((res) => {
			if ( res.data && res.data !== this.state.selectedSong ) {
				this.setState({ selectedSong: res.data });
			} else if ( res.status > 399 ) {
				console.log('Error, please try again')
			}
		});
		
		axios.get(url + 'sounds').then((res) => {
			
			if ( res.data ) {
				this.setState({ songs: res.data });
				console.log(res.data)
			} else if ( res.status > 399 ) {
				console.log('Error, please try again')
			}
		});
	}
	
	
	setSystemStatus(event, data) {
		axios.post(url+`${data.checked ? "enable" : "disable"}`, {}).then((res) => {
			this.setState({ sysStatus: data.checked });
		});
	}
	
	setScheduleStatus(event, data) {
		axios.post(url+`${!data.checked ? "day-enable" : "day-disable"}`, {}).then((res) => {
			this.setState({ schStatus: !data.checked });
		});
	}
	
	setAlarmStatus() {
		if ( this.state.sysStatus ) {
			axios.post(url+`${this.state.alStatus ? "off" : "on"}`, { "isManual": true}).then((res) => {
				this.setState({ alStatus: !this.state.alStatus })
			});
		}
	}
	
	setSong(event, data) {
		console.log(event, data.song);
		if ( !this.state.alStatus ) {
			axios.post(url+'sound', { "fileName": data.song }).then((res) => {
				this.setState({ selectedSong: data.song })
			});
		}
	}
	
	render() {
		return (
			<div className="App">
				<Fragment>
					<Grid centered>
						<Grid.Column computer={12}
						             tablet={12}
						             mobile={16}>
							<Container>
								<AppHeader/>
								
								<SystemStatus status={this.state.sysStatus}
								              setStatus={this.setSystemStatus}/>
								
								<Schedule status={this.state.schStatus}
								          setStatus={this.setScheduleStatus}/>
								              
								<AlarmStatus status={this.state.alStatus}
								             sysStatus={this.state.sysStatus}
								             setStatus={this.setAlarmStatus}/>
								<SongsList songs={this.state.songs}
								           selected={this.state.selectedSong}
								           setSong={this.setSong}/>
							</Container>
						</Grid.Column>
					</Grid>
				
				</Fragment>
			</div>
		);
	}
}

export default App;
