import StatusRadio from "./status-radio";
import Filters from "./filters";

export default function Toolbar() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <StatusRadio />

      <Filters />
    </div>
  );
}
