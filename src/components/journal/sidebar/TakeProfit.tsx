interface ITakeProfitProps {
  takeProfitValue: string;
  setTakeProfitValue: (takeProfitValue: string) => void;
}
const TakeProfit = ({
  takeProfitValue,
  setTakeProfitValue,
}: ITakeProfitProps) => {
  return (
    <div className="border-2 px-2 py-2 rounded-lg w-full flex justify-between items-center">
      <label>TP: </label>
      <input
        className="bg-transparent outline-0 w-full px-2"
        type="number"
        placeholder="80,50"
        value={takeProfitValue}
        onChange={(event) => {
          setTakeProfitValue(event.target.value);
        }}
      />
    </div>
  );
};

export default TakeProfit;
