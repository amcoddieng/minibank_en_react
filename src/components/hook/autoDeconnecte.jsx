import { useEffect } from "react";
import { removeToken } from "../api/api_lofin";
import { useNavigate } from "react-router-dom";

export default function AutoLogout({ children, timeout =   100 * 5 * 1000 }) { // 5 minutes
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        removeToken();
        navigate("/", { replace: true }); // redirige vers login
        alert("Session expirée pour cause d'inactivité !");
      }, timeout);
    };

    // Écoute des actions utilisateur
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // démarre le timer au chargement

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate, timeout]);

  return children;
}
