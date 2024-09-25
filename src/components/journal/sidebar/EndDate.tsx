interface IEndDateProps {
    endDateValue: string;
    setEndDateValue: (EndDate: string) => void;
  }
  
  const EndDate = ({ endDateValue, setEndDateValue }: IEndDateProps) => {
    return (
      <div className=" border-2 px-2 py-2 rounded-lg mb-4 w-full flex justify-between items-center">
        <label className=" text-sm">End Date</label>
        <input
          className=" bg-transparent outline-0"
          type="date"
          value={endDateValue}
          onChange={(event) => {
            setEndDateValue(event.target.value);
          }}
        />
      </div>
    );
  };
  
  export default EndDate;
  