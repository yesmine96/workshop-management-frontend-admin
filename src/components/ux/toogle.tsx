import { useState } from 'react';
interface Props {
  active: boolean;
  onlyActive?: boolean;
  onChange: () => void;
}
export default function Toggle({ onlyActive, active, onChange }: Props) {
  const [enabled, setEnabled] = useState(active);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
          <div
            onClick={() => {
              if (onlyActive) {
                setEnabled(true);
              } else setEnabled(!enabled);
              onChange();
            }}
            className="w-11 h-6 bg-gray rounded-full peer  peer-focus:ring-green  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"
          ></div>
        </label>
      </div>
    </div>
  );
}
