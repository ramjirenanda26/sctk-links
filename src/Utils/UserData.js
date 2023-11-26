// Mendapatkan data pengguna dari localStorage
export const getUserDataFromLocalStorage = () => {
  const usersData = localStorage.getItem('user');
  return usersData ? JSON.parse(usersData) : null;
};

// Mendapatkan role pengguna dari localStorage
export const getUserRoleFromLocalStorage = () => {
  const userData = getUserDataFromLocalStorage();
  return userData ? userData.role : '';
};
