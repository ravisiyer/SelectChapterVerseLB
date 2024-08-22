import Example from "./example";

function ChapterOrVerseListBox({
  label = "Ch.", // 'Chapter' or 'Verse'
  maxCORVNumber = 18, // maxChapterORVerseNumber
  firstEntryBlank = false, // true/false
  selectedEntryIndex = 0,
  name = "", // name used for FormData
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

  return (
    <Example
      chaptersOrVerses={chaptersOrVerses}
      label={label}
      selectedEntryIndex={selectedEntryIndex}
      name={name}
    />
  );
}
export default ChapterOrVerseListBox;
