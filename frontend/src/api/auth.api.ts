export interface User {
  username?: string;
  email: string;
  password: string;
}

export const registerAPI = async (user: User) => {
  try {
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erro ao registrar");
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
