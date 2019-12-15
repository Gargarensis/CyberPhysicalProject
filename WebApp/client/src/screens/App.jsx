import React, { Component, Fragment } from 'react';

import { Container, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import Request from 'axios-request-handler';

import { AppHeader, SystemStatus, AlarmStatus } from "../components";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            sysStatus: false,
            alStatus: false
        };
        
        this.setSystemStatus = this.setSystemStatus.bind(this);
        this.setAlarmStatus = this.setAlarmStatus.bind(this);
    }
    
    componentDidMount() {
        const system = new Request('http://10.62.161.182:3001/alarm/enabled');
    
        const alarm = new Request('http://10.62.161.182:3001/alarm');
    
        system.poll(5000).get((res) => {
            if(res.hasOwnProperty("data") && res.data !== this.state.sysStatus){
                this.setState({ sysStatus: res.data });
            }
            else if (res.status > 399) {
                console.log( 'Error, please try again')
            }
        });
    
        alarm.poll(2000).get((res) => {
            console.log(res.data)
            if(res.hasOwnProperty("data") && res.data !== this.state.alStatus){
                this.setState({ alStatus: res.data });
            }
            else if (res.status > 399) {
                console.log( 'Error, please try again')
            }
        });
    }
    
    
    
    setSystemStatus(event, data){
        axios.post(`http://10.62.161.182:3001/alarm/${data.checked?"enable":"disable"}`, {}).then((res) => {
            this.setState(this.setState({ sysStatus: data.checked }))
        });
    }
    
    setAlarmStatus(){
        if(this.state.sysStatus){
            axios.post(`http://10.62.161.182:3001/alarm/${this.state.alStatus?"off":"on"}`, {}).then((res) => {
                this.setState(this.setState({ alStatus: !this.state.alStatus }))
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
                                <AlarmStatus status={this.state.alStatus}
                                             sysStatus={this.state.sysStatus}
                                             setStatus={this.setAlarmStatus}/>
                            </Container>
                        </Grid.Column>
                    </Grid>
            
                </Fragment>
            </div>
        );
    }
}

export default App;
