import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
