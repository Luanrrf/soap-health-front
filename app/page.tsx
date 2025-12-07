import CreateYourPizza from "./components/CreateYourPizza";
import { PizzaProvider } from "./components/CreateYourPizza/usePizzaContext";
import NameSection from "./components/NameSection";
import Orders from "./components/Orders";

export default function Home() {
  return (
    <main>
      <NameSection />

      <Orders />

      <PizzaProvider>
        <CreateYourPizza />
      </PizzaProvider>
    </main>
  );
}
