import React from "react";
import { QuestionAnswerProps } from "./types";

const InterestCard: React.FC<QuestionAnswerProps> = ({
   question,
   answer,
}) => {
    return (
        <div className="relative flex flex-col bg-white w-full">
            <span className="w-full p-3 text-2x1 font-semibold text-purple-800">{question}</span>
            <p className="text-base text-gray-800 text-wrap w-full">{answer}</p>
        </div>
    );
};

export default InterestCard;