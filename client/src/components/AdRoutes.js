// import React from "react";
// import { useState, useEffect } from "react";
// function AdRoutes() {
//   const token = localStorage.getItem("token");
//   const [routes, setRoutes] = useState([]);
//   useEffect(() => {
//     fetch("http://127.0.0.1:5500/routes")
//       .then((res) => res.json())
//       .then((data) => {
//         setRoutes(data);
//       });
//   }, []);

//   return (
//     <>
//       <div className="row mt-4 mb-4">
//         {routes.map((route) => (
//           <div className="col-4 mt-4" key={route.id}>
//             <div className="card">
//               <div className="card-body">
//                 <p className="card-text mt-2">
//                   <strong>From:</strong>
//                   {route.start_point}.
//                 </p>
//                 <p className="card-text">
//                   <strong>To:</strong>
//                   {route.end_point}.
//                 </p>
//                 <p className="card-text">
//                   <strong>Price:</strong>
//                   {route.price}.
//                 </p>
//                 <button className="btn btn-dark btn-sm m-2">Update</button>
//                 <button className="btn btn-danger btn-sm">Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default AdRoutes;
// import React, { useState, useEffect } from "react";
// import "../App.css";

// function AdRoutes() {
//   const token = localStorage.getItem("token");
//   const [routes, setRoutes] = useState([]);
//   const [updateFormData, setUpdateFormData] = useState({
//     id: "",
//     start_point: "",
//     end_point: "",
//     price: "",
//   });
//   const [isModalVisible, setModalVisibility] = useState(false);

//   const handleUpdateClick = (route) => {
//     setUpdateFormData({
//       id: route.id,
//       start_point: route.start_point,
//       end_point: route.end_point,
//       price: route.price,
//     });
//     setModalVisibility(true);
//   };

//   const handleUpdateFormSubmit = (event) => {
//     event.preventDefault();
//     // Implement your update logic here
//     // You can make a PUT request to update the route with the updateFormData
//     // After successful update, hide the modal and fetch routes again
//     // Reset updateFormData state
//     setModalVisibility(false);
//   };

//   useEffect(() => {
//     fetch("http://127.0.0.1:5500/routes")
//       .then((res) => res.json())
//       .then((data) => {
//         setRoutes(data);
//       });
//   }, []);

//   return (
//     <>
//       <div className="row mt-4 mb-4">
//         {routes.map((route) => (
//           <div className="col-4 mt-4" key={route.id}>
//             <div className="card">
//               <div className="card-body">
//                 <p className="card-text mt-2">
//                   <strong>From:</strong>
//                   {route.start_point}.
//                 </p>
//                 <p className="card-text">
//                   <strong>To:</strong>
//                   {route.end_point}.
//                 </p>
//                 <p className="card-text">
//                   <strong>Price:</strong>
//                   {route.price}.
//                 </p>
//                 <button
//                   className="btn btn-dark btn-sm m-2"
//                   onClick={() => handleUpdateClick(route)}
//                 >
//                   Update
//                 </button>
//                 <button className="btn btn-danger btn-sm">Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalVisible && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setModalVisibility(false)}>
//               &times;
//             </span>
//             <h2>Update Route</h2>
//             <form onSubmit={handleUpdateFormSubmit}>
//               <label>
//                 Start Point:
//                 <input
//                   type="text"
//                   value={updateFormData.start_point}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       start_point: e.target.value,
//                     })
//                   }
//                 />
//               </label>
//               <label>
//                 End Point:
//                 <input
//                   type="text"
//                   value={updateFormData.end_point}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       end_point: e.target.value,
//                     })
//                   }
//                 />
//               </label>
//               <label>
//                 Price:
//                 <input
//                   type="text"
//                   value={updateFormData.price}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       price: e.target.value,
//                     })
//                   }
//                 />
//               </label>
//               <button type="submit">Update</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default AdRoutes;
import React, { useState, useEffect } from "react";

function AdRoutes() {
  const token = localStorage.getItem("token");
  const [routes, setRoutes] = useState([]);
  const [errors, setErrors] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    start_point: "",
    end_point: "",
    price: "",
  });
  const [isUpdateFormVisible, setUpdateFormVisibility] = useState(false);

  const handleUpdateClick = (route) => {
    setUpdateFormData({
      id: route.id,
      start_point: route.start_point,
      end_point: route.end_point,
      price: route.price,
    });
    setUpdateFormVisibility(true);
  };
  const handleDelete = async (id) => {
    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:5500/routes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Route Successfully deleted...");
          fetch("http://127.0.0.1:5500/routes")
            .then((res) => res.json())
            .then((data) => {
              setRoutes(data);
            });
        } else {
          // Handle error scenarios, e.g., unauthorized, server errors, etc.
          console.error("Failed to delete route");
        }
      } catch (error) {
        setErrors(error);
      }
    }
  };
  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();
    if (token) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5500/routes/${updateFormData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              start_point: updateFormData.start_point,
              end_point: updateFormData.end_point,
              price: parseFloat(updateFormData.price),
            }),
          }
        );

        if (response.ok) {
          fetch("http://127.0.0.1:5500/routes")
            .then((res) => res.json())
            .then((data) => {
              setRoutes(data);
            });
          // Route successfully updated
          // Fetch routes again to reflect changes
        } else {
          console.log(
            updateFormData.start_point,
            updateFormData.end_point,
            updateFormData.price
          );
          // Handle error scenarios, e.g., unauthorized, server errors, etc.
          console.error("Failed to update route");
        }
      } catch (error) {
        setErrors(error);
      }
    }

    // Reset update form visibility and data
    setUpdateFormVisibility(false);
    setUpdateFormData({
      id: "",
      start_point: "",
      end_point: "",
      price: "",
    });
  };

  //   const handleUpdateFormSubmit = (event) => {
  //     event.preventDefault();
  //     if(token){

  //     }
  //     // Implement your update logic here
  //     // You can make a PUT request to update the route with the updateFormData
  //     // After successful update, hide the form and fetch routes again
  //     // Reset updateFormData state
  //     setUpdateFormVisibility(false);
  //   };

  useEffect(() => {
    fetch("http://127.0.0.1:5500/routes")
      .then((res) => res.json())
      .then((data) => {
        setRoutes(data);
      });
  }, []);

  return (
    <>
      {errors && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {errors}{" "}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {isUpdateFormVisible && (
        <div className="container mt-4">
          <h2 className="text-center mb-4">Update Route</h2>
          <form onSubmit={handleUpdateFormSubmit}>
            <div className="mb-3">
              <label htmlFor="start" className="form-label">
                Start Point:
              </label>
              <input
                id="start"
                type="text"
                className="form-control"
                value={updateFormData.start_point}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    start_point: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="end" className="form-label">
                End Point:
              </label>
              <input
                id="end"
                type="text"
                className="form-control"
                value={updateFormData.end_point}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    end_point: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                id="price"
                type="text"
                className="form-control"
                value={updateFormData.price}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setUpdateFormVisibility(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <h1 className="text-center mt-3">Routes</h1>

      <div className="row mt-4 mb-4">
        {routes.map((route) => (
          <div className="col-4 mt-4" key={route.id}>
            <div className="card">
              <div className="card-body">
                <p className="card-text mt-2">
                  <strong>From:</strong>
                  {route.start_point}.
                </p>
                <p className="card-text">
                  <strong>To:</strong>
                  {route.end_point}.
                </p>
                <p className="card-text">
                  <strong>Price:</strong>
                  {route.price}.
                </p>
                <button
                  className="btn btn-dark btn-sm m-2"
                  onClick={() => handleUpdateClick(route)}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(route.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdRoutes;
