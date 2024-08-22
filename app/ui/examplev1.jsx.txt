"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";

export default function Example({
  chaptersOrVerses,
  label,
  selectedEntryIndex,
  name,
}) {
  const [selected, setSelected] = useState(
    chaptersOrVerses[selectedEntryIndex]
  );

  return (
    <div className=" z-20">
      {/* <div className="w-28 md:w-[72px] z-20"> */}
      {/* <div className="h-screen w-16 pt-20 "> */}
      <Listbox value={selected} onChange={setSelected} name={name}>
        <ListboxButton className="border border-white flex justify-between items-center w-[120px] md:w-[72px] h-12 md:h-auto py-px px-0.5 ">
          {/* <ListboxButton className="border border-black flex justify-between items-center w-16 bg-orange-400 "> */}
          {`${label} ${selected.CORVNumberString}`}
          <ChevronDownIcon className="size-4 " />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          // anchor="bottom start"
          className="border border-black bg-yellow-100 z-20"
        >
          <div
            className={clsx(
              "grid ",
              label === "Ch." && "grid-cols-3",
              label === "Ve." && "grid-cols-8"
              // label === "Ch." && "grid-cols-1",
              // label === "Ve." && "grid-cols-4"
            )}
          >
            {chaptersOrVerses.map((person) => (
              <ListboxOption
                key={person.CORVNumberString}
                value={person}
                className="group flex cursor-default items-center p-1 select-none data-[focus]:bg-orange-400"
                // className="group flex cursor-default items-center px-1 select-none data-[focus]:bg-orange-400"
              >
                <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                {person.CORVNumberString}
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
