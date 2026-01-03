import React from 'react';
import QuestionAnswer from "./QuestionAnswer";

const QandA: React.FC = () => {
    return (
        <div id="interests" className="container mx-auto bg-white flex flex-col">
            <div className="w-3/4 mw-3/4 ml-auto mr-auto pb-12">
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-light mb-0 p-8">Questions & Answers</h1>
                </div>
                <div className="flex flex-col items-stretch gap-4">
                    <QuestionAnswer
                        question="Why did you choose your profession?"
                        answer="I don’t know if I chose this line of work, so much as it chose me. Computers have always just made sense to me and came naturally, much like breathing. I liked the challenge
                        and constant learning as technology evolved, and with it's evolution, the number of possibilities exponentially expanded and with so many worlds to explore, I simply kept exploring."
                    />
                    <QuestionAnswer
                        question="Who are your main influences?"
                        answer="I get inspiration from unlikely sources, like Leonardo Davinci in his approach to understanding the mechanics of how all life and things operate. Or sometimes in rules that
                        rang true, such as “form follows function” – Bauhaus, or “the simplest explanation is often the most accurate” – Occam’s Razor, or principles and insights from the Art of War."
                    />
                    <QuestionAnswer
                        question="What is your greatest accomplishment?"
                        answer="I believe that my greatest accomplishment is yet to come. While I’ve done many things I consider milestones, such as writing my first album and being offered a record contract
                        at 21, spawning a counter-culture that influenced thousands and continues to grow even now, or designing and building solutions like my house remodel or Jeep, there is, however,
                        something much greater coming, possibly today."
                    />
                    <QuestionAnswer
                        question="What tools do you use?"
                        answer="I firmly believe in using the best tool for the task at hand. When building something, being able to choose between wood, metal, carbon fiber, plastic and glass allows freedom
                        in creating, but starts with selection and planning. Does the item being created need to be strong or soft, flexible or rigid, light or heavy, heat resistent or malleable.  With each
                        defining factor the medium to use becomes more clear until you know where you should start. In technology the same principals apply and each programming language, methodology, design
                        pattern, and platform has benefits and drawbacks, strengths and weaknesses.  People gravitate to what they know, but that doesn't make it the best choice and I prefer building things
                        to their maximum potential."
                    />
                    <QuestionAnswer
                        question="What advice would you give someone just starting in your profession?"
                        answer="Don’t be limited to believing in singular solutions. Be open-minded and truly understand each idea and possibility objectively, viewing the benefits that make it a better choice
                        and areas it may lack in.  Be complete in your evaluation, factoring in performance, scalability, security, reliability and most importantly, how well it accomplishes the task it was
                        designed to complete. Always remember that nothing is impossible, it just comes down to time and expense."
                    />
                </div>
            </div>
        </div>
    );
};

export default QandA;