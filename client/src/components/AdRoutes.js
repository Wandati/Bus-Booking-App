import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AdRoutes({ setUserRole,userRole }) {
  const navigate=useNavigate()
  const token = localStorage.getItem("token");
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
  }, [token, setUserRole]);
  useEffect(() => {
    if (!token || userRole !== "Admin") {
      navigate("/");
    }
  }, [token, navigate, userRole]);
  const [routes, setRoutes] = useState([]);
  const [errors, setErrors] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    start_point: "",
    end_point: "",
    price: "",
  });
  const [isUpdateFormVisible, setUpdateFormVisibility] = useState(false);

  const handleCreateClick = () => {
    setUpdateFormData({
      id: "",
      start_point: "",
      end_point: "",
      price: "",
    });
    setUpdateFormVisibility(true);
  };

  const handleUpdateClick = (route) => {
    setUpdateFormData({
      id: route.id,
      start_point: route.start_point,
      end_point: route.end_point,
      price: route.price,
    });
    setUpdateFormVisibility(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { id, start_point, end_point, price } = updateFormData;

    try {
      const response = await fetch(
        id
          ? `http://127.0.0.1:5500/routes/${id}`
          : "http://127.0.0.1:5500/routes",
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            start_point,
            end_point,
            price: parseFloat(price),
          }),
        }
      );

      if (response.ok) {
        fetchRoutes();
        setUpdateFormVisibility(false);
        setUpdateFormData({
          id: "",
          start_point: "",
          end_point: "",
          price: "",
        });
      } else {
        setErrors("Failed to save route. Please try again.");
      }
    } catch (error) {
      setErrors(error.message || "An error occurred. Please try again later.");
    }
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
          fetchRoutes();
        } else {
          console.error("Failed to delete route");
        }
      } catch (error) {
        setErrors(
          error.message || "An error occurred. Please try again later."
        );
      }
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5500/routes");
      if (response.ok) {
        const data = await response.json();
        setRoutes(data);
      } else {
        console.error("Failed to fetch routes");
      }
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <>
      {errors && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {errors}
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
          <h2 className="text-center mb-4">
            {updateFormData.id ? "Update" : "Create"} Route
          </h2>
          <form onSubmit={handleFormSubmit}>
            {/* Form fields for start_point, end_point, and price */}
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
              <button type="submit" className="btn btn-dark">
                {updateFormData.id ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setUpdateFormVisibility(false);
                  setUpdateFormData({
                    id: "",
                    start_point: "",
                    end_point: "",
                    price: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <h1 className="text-center mt-3">Routes</h1>

      <div className="text-center mt-3">
        <button className="btn btn-outline-dark" onClick={handleCreateClick}>
          Create Route
        </button>
      </div>

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
