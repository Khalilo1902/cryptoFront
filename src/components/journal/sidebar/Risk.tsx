interface IRiskProps {
  riskValue: string;
  setRiskValue: (riskValue: string) => void;
}

const Risk = ({ riskValue, setRiskValue }: IRiskProps) => {
  return (
    <div className="border-2 px-2 py-2 rounded-lg w-full grid grid-cols-12 justify-items-center place-items-center">
      <label className="w-full text-sm col-span-8">Risk/Reward Ratio: </label>
      <input
        className="col-span-4 bg-transparent outline-0  px-2 w-full"
        type="text"
        placeholder="3,5"
        value={riskValue}
        onChange={(event) => {
          setRiskValue(event.target.value);
        }}
      />
    </div>
  );
};

export default Risk;
