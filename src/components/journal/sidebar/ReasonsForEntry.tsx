interface IReasonsForEntryProps {
  reasonsforEntryValue: string;
  setReasonsforEntryValue: (reasonsforEntryValue: string) => void;
}

const ReasonsForEntry = ({
  reasonsforEntryValue,
  setReasonsforEntryValue,
}: IReasonsForEntryProps) => {
  return (
    <div>
      <textarea
        className="w-full border-2 outline-0 rounded-lg mt-4 p-2 bg-transparent"
        name=""
        id=""
        cols={30}
        rows={5}
        placeholder="Description"
        value={reasonsforEntryValue}
        onChange={(event) => {
          setReasonsforEntryValue(event.target.value);
        }}
      />
    </div>
  );
};

export default ReasonsForEntry;
