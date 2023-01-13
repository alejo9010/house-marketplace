import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      //AUTENTICANDO CON FIREBASE
      const auth = getAuth();

      //SELECCIONANDO GOOGLE COMO PROVEEDOR
      const provider = new GoogleAuthProvider();

      //RESULTADO DEL INICIO DE SESION CON GOOGLE UTILIZANDO EL AUTH Y EL PROVEEDOR
      const result = await signInWithPopup(auth, provider);

      //OBTENIENDO INFORMACION DEL USUARIO
      const user = result.user;

      //CREANDO DOCUMENTO NUEVO PARA VER SI EXISTE
      const docRef = doc(db, 'users', user.uid);

      //OBTENIENDO DOCUMENTO EN BASE A DOCREF
      const docSnap = await getDoc(docRef);

      //SI EL DOCSNAP NO REGRESA NADA EL USUARIO ES NUEVO POR ENDE AGREGARLO AL DOCUMENTO USERS
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      //REDIRECCIONANDO A HOME
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'}</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
