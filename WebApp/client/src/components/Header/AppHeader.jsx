import React from 'react'
import { Header } from 'semantic-ui-react'
import styles from './AppHeader.module.css';

export const AppHeader= () => (
	<div className={styles.container}>
		<Header as={'h1'}
		        dividing>
			Intrusion Detection System
		</Header>
	</div>
	
);
