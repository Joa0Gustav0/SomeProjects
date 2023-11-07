import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import styles from './App.module.css'

function App() {
  return (
    <main>
      <DataForm />
      <Dashboard />
      <DataList />
    </main>
  );
}

export default App;
