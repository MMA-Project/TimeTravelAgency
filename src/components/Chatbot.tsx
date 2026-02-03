import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MessageCircle, X, Send, Clock, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.

Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement ces 3 destinations :

1. **Paris 1889** (Belle Époque)
- Prix : à partir de 12 500€
- Durée : 3-7 jours
- Risque : Faible
- Points forts : Inauguration Tour Eiffel, Exposition Universelle, cafés de Montmartre, artistes impressionnistes
- Idéal pour : amateurs de culture, élégance, vie urbaine

2. **Période Crétacé** (-66 millions d'années)
- Prix : à partir de 45 000€
- Durée : 1-3 jours
- Risque : Élevé (équipement de survie obligatoire)
- Points forts : T-Rex, Tricératops, safari préhistorique, nature primordiale
- Idéal pour : aventuriers, passionnés de nature et dinosaures

3. **Florence 1504** (Renaissance)
- Prix : à partir de 18 900€
- Durée : 5-10 jours
- Risque : Modéré
- Points forts : Michel-Ange (David), Léonard de Vinci, ateliers d'artistes, cour des Médicis
- Idéal pour : amateurs d'art, histoire, architecture

FAQ importantes :
- Sécurité : 100% de retours réussis, protocoles développés avec physiciens quantiques
- Équipement : vêtements d'époque fournis, guide chrononaute personnel
- Préparation : briefing de 2h avant départ, formation survie pour le Crétacé

Réponds toujours en français, de manière concise (2-3 phrases max sauf si on te demande des détails).
Tu peux suggérer des destinations selon les intérêts du client.`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call Mistral API
      const response = await fetch(
        "https://api.mistral.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: input },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Je suis désolé, je rencontre des difficultés techniques. Veuillez réessayer dans quelques instants ou nous contacter directement pour toute question sur nos voyages temporels.",
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      const form = document.querySelector(
        "form[data-chatbot-form]",
      ) as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 100);
  };

  const suggestedQuestions = [
    "Quelle destination me conseillez-vous ?",
    "Est-ce dangereux de voir des dinosaures ?",
    "Comment se déroule un voyage temporel ?",
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Ouvrir le chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-secondary/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-foreground">Chronos</h3>
                    <span className="text-xs text-muted-foreground">
                      Assistant TimeTravel
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Fermer le chat"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-none p-4">
                    <p className="text-foreground text-sm leading-relaxed">
                      Bienvenue chez TimeTravel Agency ! Je suis Chronos, votre
                      guide à travers les époques. Comment puis-je vous aider à
                      planifier votre voyage temporel ?
                    </p>
                  </div>

                  {/* Suggested Questions */}
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">
                      Questions suggérées :
                    </span>
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => sendSuggestedQuestion(question)}
                        className="block w-full text-left px-3 py-2 text-sm text-foreground bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary/50 text-foreground rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-none p-4">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              data-chatbot-form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border bg-secondary/30"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-3 bg-input border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="w-12 h-12 flex-shrink-0"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
