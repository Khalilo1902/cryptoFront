interface IPriceProps {
  priceValue: string;
  setPriceValue: (priceValue: string) => void;
}
const Price = ({ priceValue, setPriceValue }: IPriceProps) => {
  return (
    <div className="border-2 px-2 py-2 rounded-lg w-full flex justify-between items-center">
      <label>Entry: </label>
      <input
        className="bg-transparent outline-0 w-full px-2"
        type="number"
        placeholder="98,75"
        value={priceValue}
        onChange={(event) => {
          setPriceValue(event.target.value);
        }}
      />
    </div>
  );
};

export default Price;
