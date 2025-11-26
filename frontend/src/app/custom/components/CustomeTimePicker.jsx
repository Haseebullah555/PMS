import React from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function CustomTimePicker({ value, onChange }) {
  const handleFocus = () => {
    if (!value) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeString = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date(0, 0, 0, hours, minutes));
      onChange(timeString); // e.g., "9:10 AM"
    }
  };

  return (
    <div dir='ltr'>
    <TimePicker
      onFocus={handleFocus}
      onChange={onChange}
      value={value || ''} // pass string or empty
      format="h:mm a"
      disableClock={false}
      className="custom-time-picker"
    />
    </div>
  );
}

// import React from 'react'
// import TimePicker from 'react-time-picker'

// export default function CustomeTimePicker({value, onChange, className}) {
//   // Handler for focus event to set current time if value is empty or null
//   const handleFocus = () => {
//     if (!value) {
//       const now = new Date()
//       const formatted = new Intl.DateTimeFormat('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//       }).format(now)
//       onChange(formatted)
//     }
//   }

//   return (
//     <div dir='ltr'>
//       <TimePicker
//         onFocus={handleFocus}
//         onChange={onChange}
//         value={value}
//         disableClock={false}
//         format='h:mm a'
//         className={className}
//       />
//     </div>
//   )
// }
