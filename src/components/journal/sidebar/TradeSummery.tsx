interface ITradeSummeryProps {
    tradeSummeryValue: string;
    setTradeSummeryValue: (tradeSummeryValue: string) => void;
  }
  
  const TradeSummery = ({
    tradeSummeryValue,
    setTradeSummeryValue,
  }: ITradeSummeryProps) => {
    return (
      <div>
        <textarea
          className="w-full border-2 outline-0 rounded-lg mt-4 p-2 bg-transparent"
          name=""
          id=""
          cols={30}
          rows={5}
          placeholder="Description"
          value={tradeSummeryValue}
          onChange={(event) => {
            setTradeSummeryValue(event.target.value);
          }}
        />
      </div>
    );
  };
  
  export default TradeSummery;
  