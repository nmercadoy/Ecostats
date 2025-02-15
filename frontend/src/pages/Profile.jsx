import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    profileImage: "https://via.placeholder.com/150", // Imagen por defecto
    username: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    gender: "",
  });

  useEffect(() => {
    // Simulación de obtener datos del usuario (reemplazar con una API real)
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser({
            profileImage: data.profileImage || "https://via.placeholder.com/150",
            username: data.username,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.gender,
          });
        } else {
          console.error("Error al obtener perfil:", data.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-4">Perfil del Usuario</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={user.profileImage}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          <div>
            <p>
              <span className="font-semibold">Nombre de usuario:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Correo electrónico:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Fecha de nacimiento:</span> {user.dateOfBirth}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span> {user.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Dirección:</span> {user.address}
            </p>
            <p>
              <span className="font-semibold">Género:</span> {user.gender}
            </p>
            <div className="mt-4">
              <a
                href="/edit-profile"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Editar Perfil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
