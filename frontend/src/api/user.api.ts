export const getMeAPI = async (token: string) => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  const res = await fetch("http://localhost:4000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getUsersAPI = async (username: string) => {
  const res = await fetch(`http://localhost:4000/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
