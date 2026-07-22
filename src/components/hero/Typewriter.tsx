import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setCurrentText((prev) => currentFullWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Handlers for switching states
    if (!isDeleting && currentText === currentFullWord) {
      // Word is fully typed: wait and then start deleting
      timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && currentText === "") {
      // Word is fully deleted: move to next word and start typing
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-saas-blue via-saas-purple to-saas-teal">
      {currentText}
      <span className="absolute -right-1.5 top-0 bottom-0 w-[2px] bg-saas-purple animate-pulse-slow" style={{ opacity: 0.8 }} />
    </span>
  );
}
