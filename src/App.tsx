import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Product } from "./Product";
import { Products, State } from "./types";

const INITIAL_STATE: State = {
  data: [],
  isLoading: false,
  basket: [],
};

function App() {
  const [state, setState] = useState<State>(INITIAL_STATE);

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetch("https://dummyjson.com/carts/1")
      .then((res) => res.json())
      .then((res: Products) => {
        setState({
          data: res.products,
          basket: res.products
            .filter((product) => product.quantity > 0)
            .map((product) => product.id),
          isLoading: false,
        });
      });
  }, []);

  const handleRemoveItem = (id: number) => {
    setState((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item.id !== id),
      basket: prev.basket.filter((item) => item !== id),
    }));
  };

  const handleChangeCount = (id: number, count: number) => {
    setState((prev) => ({
      ...prev,
      basket:
        count === 0
          ? prev.basket.filter((item) => item !== id)
          : prev.basket.includes(id)
            ? prev.basket
            : [...prev.basket, id],
      data: prev.data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: count,
            total: item.price * count,
          };
        }
        return item;
      }),
    }));
  };

  const getTotalSum = useMemo(() => {
    return state.basket.reduce(
      (a, c) => a + (state.data.find((Item) => Item.id === c)?.total || 0),
      0,
    );
  }, [state.basket, state.data]);

  if (state.isLoading) return <div>Uploading data ...</div>;

  return (
    <div className="app">
      <div className="products">
        {state.data.map((product) => (
          <Product
            onChangeCount={handleChangeCount}
            onRemove={handleRemoveItem}
            product={product}
          />
        ))}
      </div>
      <div className="total">Result: {getTotalSum} rub.</div>
    </div>
  );
}

export default App;
