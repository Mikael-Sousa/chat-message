import Sidebar from "../src/components/Sidebar/Sidebar";
import Chat from "../src/components/Chat/Chat";

function App() {
  return (
    <div className="container-fluid vh-100 p-0 bg-dark">
      <div className="row g-0 h-100">

        <aside className="col-12 col-md-4 col-lg-3 p-3 sidebar">
          <Sidebar />
        </aside>

        <main className="col-md-8 col-lg-9 d-none d-md-flex flex-column chat">
          <Chat />
        </main>

      </div>
    </div>
  );
}

export default App;
