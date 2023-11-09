// useUserRole.js
import { useState, useEffect, useContext, createContext } from "react";

const UserRoleContext = createContext();
const token=localStorage.getItem("token")

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token){
        const fetchUserRole = async () => {
            try {
              const response = await fetch("/api/getUserRole"); 
              const data = await response.json();
              setUserRole(data.userRole);
            } catch (error) {
              console.error("Error fetching user role:", error);
            }
          };
      
          fetchUserRole();

    }
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/getUserRole"); // Replace with your API endpoint
        const data = await response.json();
        setUserRole(data.userRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <UserRoleContext.Provider value={userRole}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const userRole = useContext(UserRoleContext);
  if (userRole === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return userRole;
};
