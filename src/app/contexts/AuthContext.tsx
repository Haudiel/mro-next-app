'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

// Tipo para el contexto
interface AuthContextProps {
  children: ReactNode;
}

// Tipo para los datos del usuario
interface UserData {
  empleadoId: string;
}

// Tipo para el contexto
interface AuthContextType {
  user: UserData | null;
  login: (empleadoId: string) => void;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto
export const AuthProvider = ({ children }: AuthContextProps) => {
    const [user, setUser] = useState<UserData | null>(() => {
      // Al cargar la página, intenta obtener el usuario almacenado en localStorage
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    // Función para iniciar sesión
    const login = (empleadoId: string) => {
      // Realizar una petición GET al servidor para verificar el acceso
      axios
        .get(`https://localhost:7063/AdminUser/Access?emplid=${empleadoId}`)
        .then((response) => {
          if (response.data.mensaje === 'Access') {
            const newUser = { empleadoId };
            // Almacenar el usuario en localStorage
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
          } else {
            // Manejar un mensaje de error si el acceso no es válido
            console.error('Acceso no válido');
          }
        })
        .catch((error) => {
          console.error('Error al iniciar sesión', error);
        });
    };
  
    // Función para cerrar sesión
    const logout = () => {
      // Eliminar el usuario de localStorage al cerrar sesión
      localStorage.removeItem('user');
      setUser(null);
    };
  
    useEffect(() => {
      // Puedes agregar lógica aquí para cargar el usuario desde localStorage
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

// Función para usar el contexto en otros componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
