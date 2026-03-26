import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Brain, Zap, Globe, Baby, EyeOff, Target, 
  ArrowRight, CheckCircle2, XCircle, RotateCcw, Award, Calendar, Lightbulb, FlaskConical
} from 'lucide-react';

// --- DADOS DO CONTEÚDO ---

const topics = [
  {
    icon: <EyeOff className="w-8 h-8 text-blue-500" />,
    title: "1. Psicologia como Ciência",
    desc: "Watson defendia que a psicologia deveria estudar apenas o que é observável e mensurável: o comportamento. Rejeitava a consciência, as emoções internas e a introspecção como objetos de estudo científico."
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "2. Estímulo → Resposta",
    desc: "Coração do behaviorismo: todo comportamento é uma resposta a um estímulo do ambiente. A ideia central é que o comportamento é aprendido por associação."
  },
  {
    icon: <Globe className="w-8 h-8 text-green-500" />,
    title: "3. Determinismo Ambiental",
    desc: "O ambiente molda o indivíduo. O ser humano nasce como uma 'tábula rasa' e o ambiente define seus comportamentos, habilidades e até personalidade."
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-purple-500" />,
    title: "4. Aprendizagem por Condicionamento",
    desc: "O comportamento é adquirido por associações repetidas. Um estímulo neutro passa a provocar uma resposta após associação com outro estímulo (condicionamento clássico)."
  },
  {
    icon: <Baby className="w-8 h-8 text-pink-500" />,
    title: "5. Emoções Aprendidas",
    desc: "Emoções não são puramente 'internas', mas sim respostas fisiológicas condicionadas. O ambiente e as experiências moldam o que sentimos diante de cada situação."
  },
  {
    icon: <Brain className="w-8 h-8 text-red-500" />,
    title: "6. Rejeição da Mente",
    desc: "Rompimento com a psicologia tradicional. Não se estuda pensamentos ou sentimentos subjetivos, apenas o comportamento observável, criando uma psicologia baseada em evidências."
  },
  {
    icon: <Target className="w-8 h-8 text-indigo-500" />,
    title: "7. Previsão e Controle",
    desc: "O grande objetivo: prever e controlar o comportamento humano. Se sabemos o estímulo, prevemos a resposta; se controlamos o ambiente, moldamos o comportamento."
  }
];

const flashcardsData = [
  { q: "Quem é considerado o pai do Behaviorismo?", a: "John B. Watson." },
  { q: "Qual é o principal objeto de estudo do Behaviorismo?", a: "O comportamento observável e mensurável." },
  { q: "O que o Behaviorismo rejeita como método de estudo?", a: "A introspecção, a consciência e emoções internas." },
  { q: "Qual é o modelo central do Behaviorismo?", a: "O modelo Estímulo → Resposta (E → R)." },
  { q: "O que significa 'Determinismo Ambiental' para Watson?", a: "A ideia de que o ambiente molda completamente o indivíduo ('tábula rasa')." },
  { q: "Como ocorre a aprendizagem no Behaviorismo Clássico?", a: "Por meio do condicionamento (associações repetidas entre estímulos)." },
  { q: "O que o experimento do 'Pequeno Albert' provou?", a: "Que emoções, como o medo, podem ser aprendidas e condicionadas." },
  { q: "Qual o principal objetivo da psicologia behaviorista?", a: "Prever e controlar o comportamento humano." },
  { q: "No modelo (E → R), o que representa o Estímulo (E)?", a: "Qualquer evento ou acontecimento do ambiente." },
  { q: "Como Watson via as emoções humanas?", a: "Como respostas fisiológicas condicionadas, não fenômenos puramente subjetivos." }
];

const quizData = [
  {
    question: "O principal objeto de estudo da psicologia para John B. Watson é:",
    options: ["A consciência", "Os processos mentais inconscientes", "O comportamento observável", "A subjetividade"],
    correct: 2,
    explanation: "Watson rejeitava o estudo da consciência e da subjetividade. Ele fundou o Behaviorismo com a premissa de que a psicologia só seria uma ciência verdadeira se focasse exclusivamente naquilo que pode ser visto, medido e testado: o comportamento observável."
  },
  {
    question: "O modelo central do behaviorismo é:",
    options: ["Id–Ego–Superego", "Estímulo–Resposta", "Consciência–Inconsciência", "Cognição–Emoção"],
    correct: 1,
    explanation: "O coração do behaviorismo é o modelo Estímulo-Resposta (E → R). Ele defende que todo comportamento (Resposta) é uma reação direta a algo que acontece no ambiente (Estímulo), rejeitando constructos mentais teóricos."
  },
  {
    question: "O conceito de “tábula rasa” indica que:",
    options: ["O ser humano nasce com instintos definidos", "O comportamento é herdado geneticamente", "O indivíduo nasce sem conteúdo mental prévio", "A mente é imutável"],
    correct: 2,
    explanation: "A ideia de 'tábula rasa' (folha em branco) significa que o ser humano não nasce com comportamentos pré-definidos. Para Watson, é o ambiente e as experiências de vida que moldam completamente quem a pessoa se tornará."
  },
  {
    question: "No experimento do “Pequeno Albert”, foi demonstrado que:",
    options: ["A inteligência é hereditária", "Emoções são inatas", "Emoções podem ser condicionadas", "A mente controla o comportamento"],
    correct: 2,
    explanation: "Watson provou que o medo não precisava ser inato ou vir do inconsciente. Ao associar um rato branco (estímulo neutro) a um barulho assustador, ele condicionou o bebê a sentir medo do rato, provando que emoções são aprendidas."
  },
  {
    question: "O objetivo da psicologia behaviorista é:",
    options: ["Interpretar sonhos", "Compreender o inconsciente", "Prever e controlar o comportamento", "Estudar a subjetividade"],
    correct: 2,
    explanation: "Ao contrário da psicanálise (que foca no inconsciente), o behaviorismo tem um objetivo prático e científico: ao entender a relação entre estímulos e respostas, torna-se possível prever como alguém vai agir e controlar o ambiente para modificar comportamentos."
  }
];

// --- COMPONENTES ---

const Flashcard = ({ q, a, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-56 cursor-pointer group perspective-1000"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`w-full h-full transition-transform duration-500 transform-style-3d shadow-lg rounded-2xl ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* Frente da Carta (Pergunta) */}
        <div className="absolute inset-0 backface-hidden bg-white border-t-4 border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <span className="absolute top-4 left-4 text-blue-300 font-bold text-xl">#{index + 1}</span>
          <BookOpen className="w-8 h-8 text-blue-500 mb-4 opacity-50" />
          <h3 className="font-bold text-slate-800 text-lg sm:text-xl">{q}</h3>
          <p className="absolute bottom-4 text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1">
            Toque para girar <RotateCcw className="w-3 h-3" />
          </p>
        </div>

        {/* Verso da Carta (Resposta) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-inner">
          <h3 className="font-semibold text-lg sm:text-xl leading-relaxed">{a}</h3>
        </div>

      </div>
    </div>
  );
};

const QuizQuestion = ({ data, index, onAnswer, isLocked }) => {
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handleSelect = (optIndex) => {
    if (selectedOpt !== null || isLocked) return;
    setSelectedOpt(optIndex);
    const isCorrect = optIndex === data.correct;
    onAnswer(isCorrect);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6 border border-slate-100 transition-all hover:shadow-lg">
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-6">
        <span className="text-blue-500 mr-2">{index + 1}.</span> {data.question}
      </h3>
      <div className="space-y-3">
        {data.options.map((opt, i) => {
          const isSelected = selectedOpt === i;
          const isCorrectAnswer = i === data.correct;
          const showReveal = selectedOpt !== null;

          let btnClass = "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200";
          let Icon = null;

          if (showReveal) {
            if (isCorrectAnswer) {
              btnClass = "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500";
              Icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
            } else if (isSelected) {
              btnClass = "bg-red-50 border-red-500 text-red-800 ring-1 ring-red-500";
              Icon = <XCircle className="w-5 h-5 text-red-600" />;
            } else {
              btnClass = "bg-slate-50 opacity-50 border-slate-200";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selectedOpt !== null}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${btnClass} ${selectedOpt === null ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
            >
              <span className="font-medium">{opt}</span>
              {Icon && <span>{Icon}</span>}
            </button>
          );
        })}
      </div>
      
      {/* Box de Explicação Aprimorado */}
      {selectedOpt !== null && (
        <div className={`mt-6 p-5 rounded-xl text-sm md:text-base border-l-4 animate-fade-in ${selectedOpt === data.correct ? 'bg-green-50 border-green-500 text-green-900' : 'bg-red-50 border-red-500 text-red-900'}`}>
          <div className="font-bold flex items-center gap-2 mb-2">
            {selectedOpt === data.correct ? <><CheckCircle2 className="w-5 h-5"/> Você Acertou!</> : <><XCircle className="w-5 h-5"/> Você Errou!</>}
          </div>
          <p className="leading-relaxed">
            {data.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-1000 { perspective: 1000px; }
      .transform-style-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }
      html { scroll-behavior: smooth; }
      .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) setScore(prev => prev + 1);
    setAnsweredCount(prev => {
      const newCount = prev + 1;
      if (newCount === quizData.length) {
        setTimeout(() => setShowResult(true), 1500); // Mais tempo para ler a última explicação
      }
      return newCount;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      
      {/* HEADER / HERO */}
      <header className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
            <Brain className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-semibold tracking-wide text-blue-100">Psicologia Científica</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Behaviorismo <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              A Ciência do Comportamento
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Descubra as ideias de John B. Watson e como o ambiente molda quem somos, transformando a forma como entendemos a mente humana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#mapa" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-2">
              Ver Mapa Mental <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#quiz" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2">
              Ir para o Quiz
            </a>
          </div>
        </div>
        
        {/* Wave divisor */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] sm:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,130.23,197.8,122.9,239.54,118.23,281.33,83.4,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-32">
        
        {/* SEÇÃO 1: MAPA MENTAL */}
        <section id="mapa" className="scroll-mt-24 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">Mapa Mental</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Uma visão geral e visual das principais ideias de John B. Watson e do surgimento do Behaviorismo Clássico.</p>
          </div>
          <div className="bg-white p-2 sm:p-4 rounded-3xl shadow-xl border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <img 
              src="mapa-behavorismo.png" 
              alt="" 
              className="w-full h-auto rounded-2xl shadow-inner"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/800x600.png?text=Mapa+Mental";
              }}
            />
          </div>
        </section>

        {/* SEÇÃO 2: BIOGRAFIA DE WATSON */}
        <section id="biografia" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-slate-200 relative">
              {/* Fallback de imagem elegante com a tag solicitada caso a url quebre */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/John_Broadus_Watson.JPG" 
                alt="" 
                className="w-full h-full object-cover object-top min-h-[300px]"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/400x500.png?text=John+B.+Watson";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                 <span className="text-white font-bold text-xl drop-shadow-md">John B. Watson</span>
              </div>
            </div>
            <div className="md:w-2/3 p-8 sm:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-4">O Fundador do Behaviorismo</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                John Broadus Watson (1878–1958) foi um psicólogo norte-americano que revolucionou a forma de pensar o ser humano no século XX. Incomodado com a falta de rigor científico da psicologia da época, que focava em métodos subjetivos, ele decidiu mudar as regras do jogo.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5"/> O Grande Objetivo
                </h4>
                <p className="text-blue-800">
                  Transformar a Psicologia em uma verdadeira <strong>ciência objetiva</strong>, baseada puramente na observação e experimentação. Para Watson, não se devia estudar sentimentos ou pensamentos invisíveis, mas sim o comportamento observável que pode ser mensurado e controlado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: SURGIMENTO DO BEHAVIORISMO */}
        <section id="surgimento" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-6">O Marco Inicial</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                O Behaviorismo nasceu oficialmente em uma época em que a Psicologia buscava se afirmar ao lado de ciências exatas e biológicas, influenciada fortemente pelos estudos de adaptação de Charles Darwin.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600 shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xl">1913: O Manifesto</h4>
                    <p className="text-slate-600">Publicação do artigo <em>"Psychology as the Behaviorist Views It"</em>, considerado o manifesto fundador da teoria behaviorista.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shrink-0">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xl">A Ideia Central</h4>
                    <p className="text-slate-600">Todo e qualquer comportamento é resultado direto da interação entre os <strong>estímulos do ambiente</strong> e as <strong>respostas do organismo</strong>. O ser humano aprende a agir a partir de suas vivências e condicionamentos.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl transform md:rotate-2">
              <h3 className="text-2xl font-bold mb-4 opacity-90">"A Psicologia como o Behaviorista a vê..."</h3>
              <p className="text-lg italic leading-relaxed opacity-80 mb-6">
                "...é um ramo puramente objetivo da ciência natural. Seu objetivo teórico é a previsão e o controle do comportamento. A introspecção não é parte essencial de seus métodos..."
              </p>
              <div className="text-right font-bold text-indigo-200">– John B. Watson, 1913</div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: CONCEITOS PRINCIPAIS */}
        <section id="resumo" className="scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">Conceitos Principais</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Tudo que você precisa saber sobre a teoria de Watson, condensado para facilitar o aprendizado para a prova.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-slate-100 flex flex-col h-full">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{topic.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">{topic.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 5: O PEQUENO ALBERT */}
        <section id="albert" className="scroll-mt-24">
           <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-pink-500 font-bold uppercase tracking-wider text-sm mb-4">
                    <FlaskConical className="w-5 h-5"/> Estudo de Caso
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-6">O Experimento do Pequeno Albert</h2>
                  
                  <div className="prose prose-slate text-slate-600 space-y-4 mb-6">
                    <p>
                      Um dos experimentos mais famosos (e hoje eticamente questionáveis) de Watson foi realizado em 1920 com um bebê de 9 meses, conhecido como "Pequeno Albert". O objetivo era <strong>provar que as emoções humanas poderiam ser condicionadas</strong>.
                    </p>
                    <p>
                      <strong>Como funcionou:</strong> No início, Albert não tinha medo de um rato branco (estímulo neutro). Porém, Watson passou a associar a presença do rato com um barulho muito alto e assustador provocado por uma barra de metal (estímulo aversivo).
                    </p>
                    <p>
                      Após várias repetições, Albert começou a chorar e demonstrar medo apenas ao ver o rato branco, mesmo sem o barulho. O medo também se generalizou para outros objetos peludos, como coelhos e casacos.
                    </p>
                  </div>
                  
                  <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-xl mt-4">
                    <h4 className="font-bold text-pink-900 mb-2">Conclusão do Experimento</h4>
                    <p className="text-pink-800">
                      O experimento do Pequeno Albert evidenciou de forma clara que as emoções não são puramente inatas ou frutos misteriosos do inconsciente. <strong>Emoções, como o medo, são respostas aprendidas (condicionadas)</strong> através da interação constante com o ambiente.
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-900 relative min-h-[300px] lg:min-h-full">
                  <img 
                    src="https://aventurasnahistoria.com.br/wp-content/uploads/curiosidades/little-albert-crying-with-a-rabbit.jpg" 
                    alt="" 
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/800x600.png?text=O+Pequeno+Albert";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-8 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold mb-2">O Poder do Condicionamento Clássico</h3>
                    <p className="text-slate-300">Como uma associação repetida pode moldar respostas fisiológicas e criar novas emoções.</p>
                  </div>
                </div>
              </div>
           </div>

           {/* Legado - Caixa de destaque após o experimento */}
           <div className="mt-12 bg-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
              <Award className="w-64 h-64" />
            </div>
            <div className="relative z-10 md:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-3">
                <Award className="text-yellow-400" /> O Legado na Psicologia
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                Watson rompeu com métodos subjetivos e estabeleceu que o <strong>comportamento observável</strong> deveria ser o objeto principal. Isso abriu caminho para pesquisadores como <em>B. F. Skinner</em> e consolidou a Psicologia como ciência experimental, influenciando até hoje a educação, clínica e treinamento de comportamentos.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6: FLASHCARDS */}
        <section id="flashcards" className="scroll-mt-24">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Preparação Rápida</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">Flashcards de Revisão</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Teste sua memória! Toque nas cartas para girar e ver a resposta das principais perguntas do tema.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {flashcardsData.map((card, idx) => (
              <Flashcard key={idx} q={card.q} a={card.a} index={idx} />
            ))}
          </div>
        </section>

        {/* SEÇÃO 7: QUIZ */}
        <section id="quiz" className="scroll-mt-24 max-w-3xl mx-auto pb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">Desafio Final</h2>
            <p className="text-slate-500">Responda às 5 perguntas de múltipla escolha para ver como você se sai.<br/><strong>Atenção:</strong> Você só tem uma chance por questão e receberá a explicação de cada uma!</p>
          </div>

          <div className="space-y-4">
            {quizData.map((q, idx) => (
              <QuizQuestion 
                key={idx} 
                data={q} 
                index={idx} 
                onAnswer={handleQuizAnswer}
              />
            ))}
          </div>

          {/* Resultado Final animado */}
          {showResult && (
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white text-center shadow-2xl animate-fade-in border-4 border-white/20">
              <h3 className="text-3xl font-bold mb-2">Seu Desempenho</h3>
              <div className="text-6xl font-extrabold my-6">
                {score} <span className="text-3xl text-blue-200">/ 5</span>
              </div>
              <p className="text-xl font-medium mb-6 text-blue-100">
                {score === 5 ? '🏆 Perfeito! Você gabaritou e com certeza vai tirar 10!' :
                 score >= 3 ? '👏 Muito bem! Você entendeu os conceitos principais do Behaviorismo.' :
                 '📚 Que tal revisar as explicações e tentar de novo?'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg active:scale-95 inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Tentar Novamente
              </button>
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <Brain className="w-8 h-8 mx-auto text-slate-600 mb-4" />
          <p className="font-medium text-slate-300 mb-2">Trabalho de Psicologia - Behaviorismo</p>
          <p className="text-sm">Criado para auxiliar a turma na fixação do conteúdo.</p>
          <br></br>
          <br></br>
          <br></br>
          <p className="font-medium text-slate-300 mb-2">Faculdade Mais de Ituiutaba Fac Mais</p>
          <p className="text-sm">Psicologia - 1° e 2° Período</p>

          <br></br>
          <p className="font-medium text-slate-300 mb-2">Alunos:</p>
          <p className="text-sm">Cleusmar Martins da Costa<br></br>Daniana Nascimento de Oliveira Ferreira<br></br>Eliene Garcia de Medeiros<br></br>Karen Oliveira Pereira<br></br>Leidiane Moraes Oliveira<br></br>Márcia Regina Balieiro<br></br>Matheus Gabriel Martins Parreira<br></br>Rejane Maria de Castro</p>

        </div>
      </footer>

    </div>
  );
}