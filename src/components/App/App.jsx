import "./App.css";
import Layout from "../Layout/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
