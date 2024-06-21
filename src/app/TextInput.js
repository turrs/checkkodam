"use client";
import { Description, Field, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import dataKhodam from "../../public/kodam.json";

export default function TextInput() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [khodamValue, setKhodamValue] = useState("");

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const isNotKhodam = getRandomInteger(0, 1);
    if (isNotKhodam === 1) {
      const valueRandom = getRandomInteger(1, 500);
      const valuekhodam = dataKhodam[valueRandom]?.nama_kodam || "";
      setKhodamValue(valuekhodam);
      setName(inputValue);
      speak(inputValue, valuekhodam);
    } else {
      speak(inputValue, "Khodam Kosong");
      setKhodamValue("Khodam Kosong");
    }
  };

  const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const speak = (text, khodam) => {
    const utterance = new SpeechSynthesisUtterance(`${text} ${khodam}`);
    utterance.lang = "id-ID";
    const voices = window.speechSynthesis.getVoices();
    const indonesianFemaleVoice = voices.find(
      voice => voice.lang === "id-ID" && voice.name.includes("Female")
    );
    if (indonesianFemaleVoice) {
      utterance.voice = indonesianFemaleVoice;
    } else {
      console.log("No Indonesian female voice found. Using default voice.");
    }
    window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded on component mount
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      console.log("Voices loaded.");
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-night-sky-top to-night-sky-bottom">
      <div className="w-full max-w-screen-xl px-4">
        <div className="flex items-center justify-center h-full">
          <div className="max-w-md w-full">
            <div class="bg-indigo-900 rounded-full text-center py-4 lg:px-4">
              <div
                class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                  Check Khodam
                </span>
                <span class="font-semibold mr-2 text-left flex-auto">
                  {name} {khodamValue}
                </span>
                <svg
                  class="fill-current opacity-75 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </div>
            </div>

            <Field className="">
              <div className="flex mt-3">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  className={clsx(
                    "block w-full p-2 rounded-lg border-none bg-blue-600 text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-300"
                  )}
                />
                <Button
                  onClick={handleButtonClick}
                  className={clsx(
                    "ml-2 p-2 items-center gap-2 rounded-md bg-blue-500 text-sm font-semibold text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300",
                    "hover:bg-blue-600 hover:shadow-md"
                  )}
                >
                  Check Khodam
                </Button>
              </div>
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}
