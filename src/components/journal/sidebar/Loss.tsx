interface ILossProps {
    lossValue: string;
    setLossValue: (lossValue: string) => void;
  }
  const Loss = ({ lossValue, setLossValue }: ILossProps) => {
    return (
      <div className="border-2 px-2 py-2 rounded-lg w-full flex justify-between items-center">
        <label>loss: </label>
        <input
          className="bg-transparent outline-0 w-full px-2"
          type="number"
          placeholder="100"
          value={lossValue}
          onChange={(event) => {
            setLossValue(event.target.value);
          }}
        />
      </div>
    );
  };
  
  export default Loss;
  