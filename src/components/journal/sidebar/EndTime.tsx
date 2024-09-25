interface IEndTimeProps {
    endTimeValue: string;
    setEndTimeValue: (endTime: string) => void;
  }
  
  const EndTime = ({ endTimeValue, setEndTimeValue }: IEndTimeProps) => {
    return (
      <div className=" border-2 px-2 py-2 rounded-lg mb-4 w-full flex justify-between items-center">
        <label className=" text-sm">End Time</label>
        <input
          className=" bg-transparent outline-0"
          type="time"
          value={endTimeValue}
          onChange={(event) => {
            setEndTimeValue(event.target.value);
          }}
        />
      </div>
    );
  };
  
  export default EndTime;
  