"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getValNumericChapterNumber,
  getValNumericVerseNumber,
  calcNumericVerseId,
  getMaxVersesInChapter,
} from "../lib/util";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
  NUMBER_OF_VERSES_IN_CHAPTERS,
  SCV_VERSE_LABEL,
  SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
} from "../constants/constants";
import SetupCOrVLB from "./setupcorvlb";

// idSuffix is used to differentiate between SelectChapterVerse's input element ids if two parent
// Navbar components are used on same page - e.g. at top of page and bottom of page.
// Note that HTML spec. states that each element id must be unique
function SelectChapterVerse({
  initialChapterNumber = SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
  initialVerseNumber = SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR,
  idSuffix = "",
  closeMobileMenuIfOpen,
}: {
  initialChapterNumber: string;
  initialVerseNumber: string;
  idSuffix: string;
  closeMobileMenuIfOpen: () => void;
}) {
  const [chapterNumber, setChapterNumber] = useState(
    SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
  );
  // const [chapterNumber, setChapterNumber] = useState("1");
  const [verseNumber, setVerseNumber] = useState(
    SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
  );

  // console.log("SCV: initialChapterNumber: ", initialChapterNumber);
  // console.log("SCV: initialVerseNumber: ", initialVerseNumber);
  // console.log("SCV: chapterNumber: ", chapterNumber);
  // console.log("SCV: verseNumber: ", verseNumber);

  useEffect(() => {
    setChapterNumber(initialChapterNumber);
    setVerseNumber(initialVerseNumber);

    // const valChapterNumber = getValNumericChapterNumber(initialChapterNumber);
    // if (valChapterNumber.valid) {
    //   setChapterNumber(initialChapterNumber);
    //   const valVerseNumber = getValNumericVerseNumber(
    //     initialVerseNumber,
    //     valChapterNumber.numericChapterNumber
    //   );
    //   if (valVerseNumber.valid) {
    //     setVerseNumber(initialVerseNumber);
    //   } else {
    //     setVerseNumber("-");
    //   }
    // } else {
    //   setChapterNumber("-");
    //   setVerseNumber("-");
    // }

    // console.log(
    //   `SCV UseEffect: Set chapter and verse number state variables to passed & changed props: initialChapterNumber: ${initialChapterNumber}, initialVerseNumber :${initialVerseNumber}`
    // );
  }, [initialChapterNumber, initialVerseNumber]);

  useEffect(() => {
    const valChapterNumber = getValNumericChapterNumber(chapterNumber);
    if (valChapterNumber.valid) {
      const valVerseNumber = getValNumericVerseNumber(
        verseNumber,
        valChapterNumber.numericChapterNumber
      );
      if (valVerseNumber.valid) {
        goToChapterVerse();
      } else {
        setVerseNumber(SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR);
        goToChapterVerse(true); //ignoreVerse set to true
      }
    }
  }, [chapterNumber, verseNumber]);

  // useEffect(() => {

  //   goToChapterVerse();
  //   // if (verseNumber !== "" && verseNumber !== "-") {
  //   //   const valChapterNumber = getValNumericChapterNumber(chapterNumber);
  //   //   if (valChapterNumber.valid) {
  //   //     goToChapterVerse();
  //   //   }
  //   // }
  // }, [verseNumber]);

  const { replace } = useRouter();

  function goToChapterVerse(ignoreVerse = false) {
    const chapterErrorMessage =
      `For chapter (Ch.), please specify a number between ` +
      `${FIRST_CHAPTERNUMBER} and ${LAST_CHAPTERNUMBER}`;

    const valChapterNumber = getValNumericChapterNumber(chapterNumber);
    if (!valChapterNumber.valid) {
      alert(chapterErrorMessage);
      return;
    }
    const numericChapterNumber = valChapterNumber.numericChapterNumber;

    if (
      ignoreVerse ||
      // verseNumber.trim() === "" ||
      verseNumber.trim() === SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
    ) {
      replace(`/chapter/${chapterNumber}`);
      closeMobileMenuIfOpen();
      return;
    }
    const verseErrorMessage =
      `For verse (Ve.) in chapter (Ch.) ${numericChapterNumber}, please specify a number between ` +
      `${MIN_VERSE_NUMBER_IN_ALL_CHAPTERS} and ` +
      `${NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]}`;

    const valVerseNumber = getValNumericVerseNumber(
      verseNumber,
      numericChapterNumber
    );
    if (!valVerseNumber.valid) {
      alert(verseErrorMessage);
      return;
    }
    const numericVerseNumber = valVerseNumber.numericVerseNumber;
    const numericVerseId = calcNumericVerseId(
      numericChapterNumber,
      numericVerseNumber
    );
    replace(`/verse/${numericVerseId}`);
    closeMobileMenuIfOpen();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // console.log("SCV handleSubmit handler invoked.");
    e.preventDefault();
    goToChapterVerse();
  }

  const idChapterNumber = `chapternumber${idSuffix}`;
  const idVerseNumber = `versenumber${idSuffix}`;

  return (
    <form className="inline" onSubmit={handleSubmit}>
      <div className="flex gap-x-1 justify-center items-center">
        {/* Chapter LB (by default) */}
        <SetupCOrVLB
          firstEntryBlank={true}
          selectedCORVNumberString={chapterNumber}
          setSelectedCORVNumberString={setChapterNumber}
          // firstEntryDisabled={false}
          firstEntryDisabled={true}
          key={`Ch.${chapterNumber}`}
        />
        {/* Verse LB */}
        <SetupCOrVLB
          label={SCV_VERSE_LABEL}
          maxCORVNumber={
            getValNumericChapterNumber(chapterNumber).valid
              ? getMaxVersesInChapter(chapterNumber)
              : MAX_VERSE_NUMBER_IN_ALL_CHAPTERS
          }
          firstEntryBlank={true}
          selectedCORVNumberString={verseNumber}
          setSelectedCORVNumberString={setVerseNumber}
          firstEntryDisabled={false}
          listboxDisabled={
            chapterNumber === SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR
              ? true
              : false
          }
          key={`Ve.${verseNumber}`}
        />
        {/* <input
          type="submit"
          value="Go"
          className="px-1 ml-1 leading-normal  text-black md:text-lg  bg-orange-400 rounded-md cursor-pointer hover:text-black hover:bg-violet-50 active:scale-90 "
          onSubmit={(e) => console.log(e)}
        /> */}
      </div>
    </form>
  );
}
export default SelectChapterVerse;
