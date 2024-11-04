import React, { useState, useEffect } from 'react';
import './EventManager.css';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({ name: '', company: '', client: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch events from API when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing event logic
      // Assuming you have an API for updating events
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentEvent),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const newEvent = await response.json();
        setEvents((prev) => [...prev, newEvent]);
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
    setCurrentEvent({ name: '', company: '', client: '', date: '' });
    setIsEditing(false);
  };

  // Edit event
  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
  };

  // Delete event
  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
        method: 'DELETE',
      });
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="manage-events">
      <form onSubmit={handleSubmit}>
        <h1>اضف مؤتمر</h1>
        <input
          type="text"
          name="name"
          value={currentEvent.name}
          placeholder="عنوان المؤتمر"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          value={currentEvent.company}
          placeholder="ممثل جهاز مستقبل مصر"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="client"
          value={currentEvent.client}
          placeholder="العميل"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={currentEvent.date}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
      </form>

  <div className="event-list">
  <h1>قائمه المؤتمرات</h1>
  {events.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>اسم المؤتمر</th>
          <th>الشركة</th>
          <th>العميل</th>
          <th>التاريخ</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>{event.company}</td>
            <td>{event.client}</td>
            <td>{new Date(event.date).toLocaleDateString()}</td>
            <td>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h2>لايوجد مؤتمر</h2>
  )}
</div>

    </div>
  );
};

export default EventManager;
