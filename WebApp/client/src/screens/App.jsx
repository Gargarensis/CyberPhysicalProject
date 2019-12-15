import React, { Component, Fragment } from 'react';

import { Container, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';

import { AppHeader, SystemStatus, AlarmStatus } from "../components";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            sysStatus: false
        };
        
        this.setSystemStatus = this.setSystemStatus.bind(this)
    }
    
    componentDidMount() {
        axios.get("http://10.62.161.182:3001/alarm/enabled").then((res) => {
            if(res.data && res.data !== this.state.status){
                this.setState({ sysStatus: res.data });
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
                                <AlarmStatus status={this.state.sysStatus}
                                              setStatus={this.setSystemStatus}/>
                            </Container>
                        </Grid.Column>
                    </Grid>
            
                </Fragment>
            </div>
        );
    }
}

export default App;
