import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setuserId] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setuserId(user.uid);
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }

    return () => (isMounted.current = false);
  }, [isMounted]);

  return { loggedIn, checkingStatus, userId };
};

export default useAuthStatus;
