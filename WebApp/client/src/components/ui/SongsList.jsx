import React from 'react'
import { Button, Grid, List, Segment } from 'semantic-ui-react'

import styles from './Common.module.css';

export const SongsList = ({
	                          songs,
	                          selected,
	                          setSong
                          }) => (
	<div>
		<Grid centered
		      columns={2}>
			<Grid.Column computer={4}
			             tablet={6}
			             mobile={6}>
				<Segment compact className={[styles.statusLabel, styles.appStatus].join(' ')}>
					<div>
						Songs
					</div>
				</Segment>
			</Grid.Column>
			<Grid.Column computer={6}
			             tablet={6}
			             mobile={10}>
				<Segment compact className={styles.appStatus}>
					{songs && (
						<List divided relaxed>
						{songs.map((song) => (
							<List.Item key={`key-${song}`}>
								<List.Content floated='right'>
									<Button circular
									        song={song}
									        color={selected === song? 'grey':'blue'}
									        disabled={selected === song}
									        icon={selected === song? 'close':'checkmark'}
											onClick={setSong}/>
								</List.Content>
								<List.Icon name='music' size='small' verticalAlign='middle' />
								<List.Content>{song}</List.Content>
							</List.Item>
						))}
					</List>
					)}
				</Segment>
			</Grid.Column>
		
		</Grid>
	</div>
);