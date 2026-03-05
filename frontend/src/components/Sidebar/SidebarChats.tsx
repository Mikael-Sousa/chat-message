import { useState, useEffect } from "react";
import { Input } from "../Input/Input";
import { ChatItem } from "../ChatItem"
import { listFriendsAPI } from "../../api/friend.api"

type SidebarChatsProps = {
  onOpenProfile: () => void;
  onOpenUser: (username: string) => void;
};

type Friend =
  {
    username: string,
    avatar_url?: string
  }
  ;

export default function SidebarChats({
  onOpenProfile,
  onOpenUser,
}: SidebarChatsProps) {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) return;

    onOpenUser(name);
    setName("");
  }

  useEffect(() => {
    const loadMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await listFriendsAPI(token);
        console.log(res.data);
        setFriends(res.data)
      } catch (err) {
        console.error(err);
      }
    };

    loadMe();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label=""
          placeholder="Pesquisar usuário..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <div className="chat-list">
        <ChatItem
          type="me"
          name="Meu Perfil"
          Message="Toque para detalhes"
          active
          onClick={onOpenProfile}
        />

        {friends.map((f, i) => (
          <ChatItem
            key={i}
            type={"friend"}
            name={f.username}
            Message={"Toque para conversar"}
          />
        ))}
      </div>
    </>
  );
}