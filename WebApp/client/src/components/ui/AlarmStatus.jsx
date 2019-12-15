import React from 'react'
import { Button, Checkbox, Container, Grid, Label, Segment } from 'semantic-ui-react'

import styles from './Common.module.css';

export const AlarmStatus = ({
	                            status,
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
						System Status
					</div>
				</Segment>
			</Grid.Column>
			<Grid.Column computer={4}
			             tablet={6}
			             mobile={8}>
				<Segment compact className={styles.appStatus}>
					<Checkbox toggle
					          checked={status}
					          label={status ? "ON" : "OFF"}
					          onChange={setStatus}
					/>
				</Segment>
			</Grid.Column>
			
		</Grid>
	</div>
);
