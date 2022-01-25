import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const dummyProducts = [
    {
      id: "p1",
      title: "Sushi",
      price: 19.99,
      description: "Finest fish and veggies",
    },
    {
      id: "p2",
      title: "Schnitzel",
      price: 11.59,
      description: "A german specialty!",
    },
    {
      id: "p3",
      title: "Barbecue Burger",
      price: 10.99,
      description: "American, raw, meaty",
    },
    {
      id: "p4",
      title: "Green Bowl",
      price: 18.99,
      description: "Healthy...and green...",
    },
  ];
  const Products = dummyProducts.map((item) => {
    return (
      <ul key={item.id}>
        <ProductItem
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
      </ul>
    );
  });
  return (
    <section className={classes.products}>
      <h2>Taste our best meals</h2>
      <div> {Products}</div>
    </section>
  );
};

export default Products;
