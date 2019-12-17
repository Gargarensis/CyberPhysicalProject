import React from 'react'
import { Checkbox, Grid, Segment } from 'semantic-ui-react'

import styles from './Common.module.css';

export const SystemStatus = ({
	                            status,
	                            setStatus
                            }) => (
	<div>
		<Grid centered
		      columns={2}>
			<Grid.Column computer={4}
			             tablet={6}
			             mobile={6}>
				<Segment compact className={[styles.statusLabel, styles.appStatus].join(' ')}>
					<div>
						System Status
					</div>
				</Segment>
			</Grid.Column>
			<Grid.Column computer={6}
			             tablet={6}
			             mobile={10}>
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