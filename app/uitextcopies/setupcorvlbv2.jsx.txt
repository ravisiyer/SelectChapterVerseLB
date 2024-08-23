import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  SCV_CHAPTER_LABEL,
} from "../constants/constants";
import COrVLB from "./corvlb";

function SetupCOrVLB({
  label = SCV_CHAPTER_LABEL, // Chapter or Verse label
  maxCORVNumber = LAST_CHAPTERNUMBER, // maxChapterORVerseNumber
  firstEntryBlank = false, // true/false
  selectedCORVNumberString,
  setSelectedCORVNumberString,
  // name = "", // name used for FormData
}) {
  let chaptersOrVerses = [];
  let CORVIndex = 0;

  if (firstEntryBlank) {
    chaptersOrVerses[0] = { id: 0, CORVNumberString: "-" };
    CORVIndex = 1;
  }
  const maxCORVIndex = firstEntryBlank ? maxCORVNumber : maxCORVNumber - 1;
  for (; CORVIndex <= maxCORVIndex; CORVIndex++) {
    const entryNumber = firstEntryBlank ? CORVIndex : CORVIndex + 1;
    chaptersOrVerses[CORVIndex] = {
      id: entryNumber,
      CORVNumberString: entryNumber.toString(),
    };
  }

  // let selectedEntryIndex = 0;
  // const tmp = parseInt(selectedCORVNumberString);
  // if (tmp && tmp > 0 && tmp <= maxCORVNumber) {
  //   selectedEntryIndex = firstEntryBlank ? tmp : tmp - 1;
  // }

  return (
    <COrVLB
      chaptersOrVerses={chaptersOrVerses}
      label={label}
      selectedCORVNumberString={selectedCORVNumberString}
      setSelectedCORVNumberString={setSelectedCORVNumberString}
      // name={name}
    />
  );
}
export default SetupCOrVLB;
