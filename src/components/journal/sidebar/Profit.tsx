interface IProfitProps {
    profitValue: string;
    setProfitValue: (profitValue: string) => void;
  }
  const Profit = ({ profitValue, setProfitValue }: IProfitProps) => {
    return (
      <div className="border-2 px-2 py-2 rounded-lg w-full flex justify-between items-center">
        <label>Profit: </label>
        <input
          className="bg-transparent outline-0 w-full px-2"
          type="number"
          placeholder="100"
          value={profitValue}
          onChange={(event) => {
            setProfitValue(event.target.value);
          }}
        />
      </div>
    );
  };
  
  export default Profit;
  