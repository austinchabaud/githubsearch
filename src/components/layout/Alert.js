import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Alert = ({ alert }) => {
	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className='fa fa-info-circle' /> {alert.msg}
			</div>
		)
	);
};

export default Alert;
