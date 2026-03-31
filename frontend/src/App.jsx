import MainLayout from "./layout/MainLayout";
import Button from "./components/Button";

function App() {
  return (
    <MainLayout>
      
      {/* Page Content */}
      <h1 className="text-2xl font-bold">Welcome to FoodieHub 🍔</h1>
      
      <p className="text-gray-600 mt-2">
        Discover the best food near you.
      </p>

      <div className="mt-4">
        <Button>Explore Now</Button>
      </div>

    </MainLayout>
  );
}

export default App;