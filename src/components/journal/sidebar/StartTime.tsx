interface IStartTimeProps {
  startTimeValue: string;
  setStartTimeValue: (startTime: string) => void;
}

const StartTime = ({ startTimeValue, setStartTimeValue }: IStartTimeProps) => {
  return (
    <div className=" border-2 px-2 py-2 rounded-lg mb-4 w-full flex justify-between items-center">
      <label className=" text-sm">Start Time</label>
      <input
        className=" bg-transparent outline-0"
        type="time"
        value={startTimeValue}
        onChange={(event) => {
          setStartTimeValue(event.target.value);
        }}
      />
    </div>
  );
};

export default StartTime;
