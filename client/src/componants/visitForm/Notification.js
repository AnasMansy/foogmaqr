// Notification.js
import React from 'react';

const Notification = ({ message }) => (
  message ? <div className="notification">{message}</div> : null
);

export default Notification;
