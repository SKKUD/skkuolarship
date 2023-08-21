import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const Popup = ({ alertOpen, alertMessage }) => {
  const [open, setOpen] = useState(alertOpen);

  useEffect(() => {
    setOpen(alertOpen);
  }, [alertOpen]);

  useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [alertOpen]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '6',
        }}
      >
        {open && (
          <div
            style={{
              textAlign: 'center',
              width: '80%', // Adjust the width of the alert container as needed
              maxWidth: '400px', // Set a maximum width if necessary
              position: 'relative',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Alert
              style={{
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
              }}
              icon={false}
            >
              <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ textAlign: 'center', padding: '5px 20px' }}>{alertMessage}</div>
              </div>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default Popup;

// import { CssBaseline,  Alert } from '@mui/material';
// import { useState, useEffect } from 'react';

// const Popup = ({ alertOpen, alertMessage }) => {
//     const [open, setOpen] = useState(alertOpen);
//     useEffect(() => {
//         setOpen(alertOpen);
//         console.log('alertOpen', alertOpen);
//       }, [alertOpen]);

//     useEffect(() => {
//         if(alertOpen){
//         const timer = setTimeout(() => {
//           setOpen(false);
//         }, 1000);
    
//         return () => clearTimeout(timer);
//         }
//       }, [alertOpen]);

//     return(
//           <>
//             <CssBaseline />
//             <div style={{ position: 'relative', zIndex:'6' }}>
//             {open && (
//                 <div
//                 style={{
//                   zIndex: '5',
//                   textAlign:'center',
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                 }}
//               >
//                 <Alert style={{ color:'black', backgroundColor:'white', borderRadius:'15px', boxShadow: '0px 5px 10px rgba(0,0,0,0.5)' }} icon={false}>
//                     <div style={{
//                         display: "flex",
//                         height: "100%",
//                     }}>
//                         <div style={{textAlign: 'center', padding:'5px 20px'}}>{alertMessage}</div>
//                     </div> 
//                 </Alert>
//               </div>
//             )}
//             </div>
//           </>
//     )
// }

// export default Popup;