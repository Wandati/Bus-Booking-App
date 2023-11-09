// // import React from 'react'
// // import { useNavigate } from 'react-router-dom'

// // function Users() {
// //     const token = localStorage.getItem("token")
// //     const navigate=useNavigate()

// //     const data=()=>{
// //         if (token){

// //         }else{
// //             navigate("/")
// //         }
// //     }
// //   return (
// //     <div className='container text-center'>
// //         <h2>Users</h2>
// //     </div>
// //   )
// // }

// // export default Users
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Users() {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [errors, setErrors] = useState(null);

//   useEffect(() => {
//     if (token) {
//       // Fetch the list of users from your API endpoint
//       fetch("http://127.0.0.1:5500/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else if (response.status === 401) {
//             navigate("/");
//           } else {
//             throw new Error("Failed to fetch users");
//           }
//         })
//         .then((data) => {
//             console.log(data)
//           const filteredUsers = data.filter(
//             (user) => user.user_type !== "Admin"
//           );
//           setUsers(filteredUsers);
//         })
//         .catch((error) => {
//           setErrors(error.message);
//         });
//     } else {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   //   const bookingsUsers = users.filter((user) => user.user_type === 'Customer');
//   //   const busesUsers = users.filter((user) => user.user_type === 'BusOwner');

//   return (
//     <div className="container text-center">
//       <h2>Users</h2>
//       {errors && (
//         <div className="alert alert-danger alert-dismissible" role="alert">
//           {errors}{" "}
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="alert"
//             aria-label="Close"
//           ></button>
//         </div>
//       )}

//       <div className="row mt-4 mb-4">
//         {users.map((user) => (
//           <div className="col-4 mt-4" key={user.id}>
//             <div className="card">
//               <div className="card-body">
//                 <p className="card-text mt-2">
//                   <strong>Email: </strong>
//                   {user.email}.
//                 </p>
//                 <p className="card-text">
//                   <strong>User_type: </strong>
//                   {user.user_type}.
//                 </p>
//                 {user.user_type === "Customer" && (
//                   <Link
//                     className="btn btn-outline-dark"
//                     to={`/users/${user.id}`}
//                   >
//                     Show Bookings
//                   </Link>
//                 )}
//                 {user.user_type === "BusOwner" && (
//                   <Link
//                     className="btn btn-outline-dark"
//                     to={`/users/${user.id}`}
//                   >
//                     Show Buses
//                   </Link>
//                 )}
//                 <button
//                   //   onClick={handleDelete(user.id)}
//                   className="btn btn-danger mt-2"
//                 >
//                   Delete User
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Users;
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Users({setUserRole}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:5500/check_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data["User_Role"]);
          console.log(data);
        });
    } else {
      console.log("Hello World");
    }
  }, [token,setUserRole]);

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:5500/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            navigate("/");
          } else {
            throw new Error("Failed to fetch users");
          }
        })
        .then((data) => {
          const filteredUsers = data.filter(
            (user) => user.user_type !== "Admin"
          );
          setUsers(filteredUsers);
        })
        .catch((error) => {
          setErrors(error.message);
        });
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:5500/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("User Successfully deleted...");
          // Refresh the user list after deletion
          fetch("http://127.0.0.1:5500/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const filteredUsers = data.filter(
                (user) => user.user_type !== "Admin"
              );
              setUsers(filteredUsers);
            });
        } else {
          // Handle error scenarios, e.g., unauthorized, server errors, etc.
          console.error("Failed to delete user");
        }
      } catch (error) {
        setErrors(error.message);
      }
    }
  };

  return (
    <div className="container text-center">
      <h2>Users</h2>
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

      <div className="row mt-4 mb-4">
        {users.map((user) => (
          <div className="col-4 mt-4" key={user.id}>
            <div className="card">
              <div className="card-body">
                <p className="card-text mt-2">
                  <strong>Email: </strong>
                  {user.email}.
                </p>
                <p className="card-text">
                  <strong>User_type: </strong>
                  {user.user_type}.
                </p>
                {user.user_type === "Customer" && (
                  <Link
                    className="btn btn-outline-dark"
                    to={`/users/${user.id}`}
                  >
                    Show Bookings
                  </Link>
                )}
                {user.user_type === "BusOwner" && (
                  <Link
                    className="btn btn-outline-dark"
                    to={`/users/${user.id}`}
                  >
                    Show Buses
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-outline-danger mt-2"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
