import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getAssetPath } from "@/lib/utils";
import { ChevronRight, Sparkles, RotateCcw } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      {
        id: "a",
        label: "Culturelle et artistique",
        points: { paris: 1, florence: 2, cretaceous: 0 },
      },
      {
        id: "b",
        label: "Aventure et nature",
        points: { paris: 0, florence: 0, cretaceous: 2 },
      },
      {
        id: "c",
        label: "Élégance et raffinement",
        points: { paris: 2, florence: 1, cretaceous: 0 },
      },
    ],
  },
  {
    id: 2,
    question: "Votre période préférée ?",
    options: [
      {
        id: "a",
        label: "Histoire moderne (XIXe-XXe siècle)",
        points: { paris: 2, florence: 0, cretaceous: 0 },
      },
      {
        id: "b",
        label: "Temps anciens et origines",
        points: { paris: 0, florence: 0, cretaceous: 2 },
      },
      {
        id: "c",
        label: "Renaissance et classicisme",
        points: { paris: 1, florence: 2, cretaceous: 0 },
      },
    ],
  },
  {
    id: 3,
    question: "Vous préférez :",
    options: [
      {
        id: "a",
        label: "L'effervescence urbaine",
        points: { paris: 2, florence: 1, cretaceous: 0 },
      },
      {
        id: "b",
        label: "La nature sauvage",
        points: { paris: 0, florence: 0, cretaceous: 2 },
      },
      {
        id: "c",
        label: "L'art et l'architecture",
        points: { paris: 1, florence: 2, cretaceous: 0 },
      },
    ],
  },
  {
    id: 4,
    question: "Votre activité idéale :",
    options: [
      {
        id: "a",
        label: "Visiter des monuments",
        points: { paris: 2, florence: 1, cretaceous: 0 },
      },
      {
        id: "b",
        label: "Observer la faune",
        points: { paris: 0, florence: 0, cretaceous: 2 },
      },
      {
        id: "c",
        label: "Explorer des musées",
        points: { paris: 1, florence: 2, cretaceous: 0 },
      },
    ],
  },
];

const destinations = {
  paris: {
    name: "Paris - 1889",
    image: getAssetPath("/Paris 1889 16_9.png"),
    description:
      "Votre profil révèle un amateur de l'élégance et de l'effervescence urbaine ! Paris en 1889 est fait pour vous. Assistez à l'inauguration de la Tour Eiffel et plongez dans la Belle Époque, une période d'innovation et de raffinement.",
  },
  florence: {
    name: "Florence - 1504",
    image: getAssetPath("/Florence 1504 16_9.png"),
    description:
      "Votre âme d'artiste vous appelle vers la Renaissance ! Florence en 1504 vous attend avec ses chefs-d'œuvre. Rencontrez Léonard de Vinci et Michel-Ange, et vivez l'apogée de l'art occidental.",
  },
  cretaceous: {
    name: "Période Crétacé",
    image: getAssetPath("/Crétacé 16_9.png"),
    description:
      "Aventurier dans l'âme ! Le Crétacé est votre destination. Observez les dinosaures dans leur habitat naturel et vivez l'expérience la plus intense de votre vie dans un monde primordial.",
  },
};

type DestinationKey = keyof typeof destinations;

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<DestinationKey | null>(null);

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionId });

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calculate result
      setTimeout(() => calculateResult(), 300);
    }
  };

  const calculateResult = () => {
    const scores = { paris: 0, florence: 0, cretaceous: 0 };

    Object.entries(answers).forEach(([questionIdx, optionId]) => {
      const question = questions[parseInt(questionIdx)];
      const option = question.options.find((o) => o.id === optionId);
      if (option) {
        scores.paris += option.points.paris;
        scores.florence += option.points.florence;
        scores.cretaceous += option.points.cretaceous;
      }
    });

    // Get the destination with the highest score
    const winner = Object.entries(scores).reduce((a, b) =>
      b[1] > a[1] ? b : a,
    )[0] as DestinationKey;

    setResult(winner);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  return (
    <section id="quiz" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
            <Sparkles className="inline w-4 h-4 mr-2" />
            Recommandation IA
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
            Trouvez Votre Destination Idéale
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Répondez à 4 questions et découvrez quelle époque correspond le
            mieux à votre personnalité.
          </p>
        </motion.div>

        {/* Quiz Container */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        idx <= currentQuestion ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div className="mb-8">
                  <span className="text-primary text-sm tracking-wider uppercase">
                    Question {currentQuestion + 1}/{questions.length}
                  </span>
                  <h3 className="text-2xl font-serif text-foreground mt-2">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                        answers[currentQuestion] === option.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50"
                      }`}
                    >
                      <span className="text-foreground">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                {result && (
                  <>
                    {/* Result Image */}
                    <div className="relative h-64">
                      <img
                        src={destinations[result].image}
                        alt={destinations[result].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>

                    {/* Result Content */}
                    <div className="p-8 text-center">
                      <span className="text-primary text-sm tracking-widest uppercase mb-2 block">
                        Votre destination idéale
                      </span>
                      <h3 className="text-3xl font-serif text-foreground mb-4">
                        {destinations[result].name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {destinations[result].description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() =>
                            document
                              .getElementById("booking")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                        >
                          Réserver ce voyage
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" onClick={resetQuiz}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Refaire le quiz
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
