import { useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { getAuth, updateProfile, reauthenticateWithCredential, updatePassword, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { db } from '../Config/firebase';

const GetRegistration = ({ setRegistrations, selectedStatus }) => {
  useEffect(() => {
    const registrationsCollection = collection(db, 'registration');
    let registrationsQuery = registrationsCollection;

    // Tambahkan orderBy untuk mengurutkan berdasarkan tanggal secara descending
    registrationsQuery = query(registrationsQuery, orderBy('tgl', 'desc'));

    // Tambahkan filter berdasarkan status yang dipilih
    if (selectedStatus) {
      registrationsQuery = query(registrationsQuery, where('status', '==', selectedStatus));
    }

    const unsubscribe = onSnapshot(registrationsQuery, (querySnapshot) => {
      const registrationsData = querySnapshot.docs.map((doc) => doc.data());
      setRegistrations(registrationsData);
    });

    return () => unsubscribe();
  }, [setRegistrations, selectedStatus]);

  return null;
};

const GetDetailRegistration = ({ setRegistration, setViewPort, id }) => {
  useEffect(() => {
    const docRef = doc(db, 'registration', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRegistration(data);
        setViewPort((prevViewport) => ({
          ...prevViewport,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        }));
      } else {
        console.log('No such document!');
      }
    });

    return () => unsubscribe();
  }, [setRegistration, setViewPort, id]);

  return null;
};

const GetRegistrationByid = ({ setRegistrations, uid }) => {
  useEffect(() => {
    const registrationsCollection = collection(db, 'registration');
    const q = query(registrationsCollection, where('uid', '==', uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const registrationsData = querySnapshot.docs.map((doc) => doc.data());
      setRegistrations(registrationsData);
    });

    return () => unsubscribe();
  }, [setRegistrations, uid]);

  return null;
};

const handleDeleteRegistration = async (registrationId) => {
  try {
    const userRef = doc(db, 'registration', registrationId);
    await deleteDoc(userRef);
    console.log('User deleted successfully!');
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};

const GetUserById = ({ setUser, uid }) => {
  useEffect(() => {
    const docRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData);
      } else {
        console.log('User data not found in Firestore.');
      }
    });

    return () => unsubscribe();
  }, [setUser, uid]);
};

const GetUserWhereRole = ({ setUsers, setRole }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'users'), where('role', '==', setRole)),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setUsers, setRole]);

  return null;
};

const handleDeleteUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    console.log('User deleted successfully!');
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};

const updatePasswordProfile = (currentPassword, newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  return reauthenticateWithCredential(user, credential)
    .then(() => {
      return updatePassword(user, newPassword);
    })
    .catch((error) => {
      throw new Error('Failed to update password: ' + error.message);
    });
};

const updateUserProfile = async (uid, newData) => {
  const auth = getAuth();

  try {
    await updateProfile(auth.currentUser, {
      displayName: newData.name,
    });
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, newData);

    const updatedUser = {
      ...newData,
    };
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update profile: ' + error.message);
  }
};

const handleDeleteAkun = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    await deleteUser(user);
    console.log('Akun pengguna berhasil dihapus');
  } else {
    console.log('Tidak ada pengguna yang saat ini masuk');
  }
};

const handelChangeStatus = async (setRegistration, setStatus, id) => {
  await updateDoc(doc(db, 'registration', id), { status: setStatus });

  setRegistration((prevReport) => ({
    ...prevReport,
    status: setStatus,
  }));
};

export { updateUserProfile, GetRegistration, GetUserById, GetRegistrationByid, GetDetailRegistration, GetUserWhereRole, handleDeleteUser, updatePasswordProfile, handleDeleteAkun, handelChangeStatus, handleDeleteRegistration };
