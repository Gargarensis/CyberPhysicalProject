import React from 'react'
import { Button, Checkbox, Container, Grid, Label, Segment } from 'semantic-ui-react'

import styles from './Common.module.css';

export const AlarmStatus = ({
	                            status,
	                            sysStatus,
	                            setStatus
                            }) => (
	<div>
		<Grid centered
		      columns={2}>
			<Grid.Column computer={4}
			             tablet={6}
			             mobile={8}>
				<Segment compact className={[styles.statusLabel, styles.appStatus].join(' ')}>
					<div>
						Alarm Status
					</div>
				</Segment>
			</Grid.Column>
			<Grid.Column computer={4}
			             tablet={6}
			             mobile={8}>
				<Segment compact className={styles.appStatus}>
					<Button circular
					        color={sysStatus? status ? "red" : "green" : "grey"}
					        disabled={!sysStatus}
					        icon={status ? "alarm" : "alarm mute"}
					        onClick={setStatus}/>
				</Segment>
			</Grid.Column>
			
		</Grid>
	</div>
);
