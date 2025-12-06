import { PageProvider } from "./components/context";
import CreateYourPizza from "./components/CreateYourPizza";
import { PizzaProvider } from "./components/CreateYourPizza/usePizzaContext";
import NameSection from "./components/NameSection";
import Orders from "./components/Orders";

export default function Home() {
  return (
    <main>
      <PageProvider>
        <NameSection />

        <Orders />

        <PizzaProvider>
          <CreateYourPizza />
        </PizzaProvider>
      </PageProvider>
    </main>
  );
}
