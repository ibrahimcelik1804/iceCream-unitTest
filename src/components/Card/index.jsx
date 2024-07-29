import React from "react";

const Card = ({ item, setBasket, basket }) => {
  //sepette bu üründen kaç tane var
  const found = basket.filter((i) => i.name == item.name);
  const amount = found.length;
  console.log(item);
  // karttaki eleman ismine ait bütün sepetteki ürünleri kaldir
  const handleReset = () => {
    setBasket(basket.filter((i) => i.name !== item.name));
  };
  return (
    <div
      style={{ width: "190px" }}
      className="d-flex flex-column align-items-center gap-1 border rounded p-3"
    >
      <img height={100} src={item.imagePath} alt="çeşit-resim" />
      <span className="fs-5 text-nowrap">{item.name}</span>
      <div className="d-flex gap-2 mt-4 align-items-center ">
        <button onClick={handleReset} className="btn btn-sm btn-outline-danger">
          Sıfırla
        </button>
        <span data-testid="amount" className="fs-2">{amount}</span>
        <button
          onClick={(i) => setBasket([...basket, item])}
          className="btn btn-sm btn-outline-success"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default Card;
