interface IStopLossProps {
  stopLossValue: string;
  setStopLossValue: (stopLossValue: string) => void;
}
const StopLoss = ({ stopLossValue, setStopLossValue }: IStopLossProps) => {
  return (
    <div className="border-2 px-2 py-2 rounded-lg w-full flex justify-between items-center">
      <label>SL: </label>
      <input
        className="bg-transparent outline-0 w-full px-2"
        type="number"
        placeholder="12,25"
        value={stopLossValue}
        onChange={(event) => {
          setStopLossValue(event.target.value);
        }}
      />
    </div>
  );
};

export default StopLoss;
