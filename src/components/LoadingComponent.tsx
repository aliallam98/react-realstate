import Card from "./Card";

const LoadingComponent = () => {
  return (
    <div className="container grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
      {[...Array(8)].map((_, i) => (
        <Card.Skeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingComponent;
