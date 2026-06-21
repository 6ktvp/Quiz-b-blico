import { Question } from './types';

export const QUESTIONS_POOL: Question[] = [
  // ================= 20 PERGUNTAS FÁCEIS (level: 1, levelName: 'Fácil') =================
  {
    id: 'f1',
    theme: 'Personagens do Gênesis',
    level: 1,
    levelName: 'Fácil',
    question: 'Quem construiu a arca para salvar sua família e os animais do Dilúvio?',
    options: ['Abraão', 'Noé', 'Moisés', 'Davi'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 6:14, 22'
  },
  {
    id: 'f2',
    theme: 'Estrutura da Bíblia',
    level: 1,
    levelName: 'Fácil',
    question: 'Quantos livros possui a Bíblia completa (divididos em Escrituras Hebraicas e Gregas)?',
    options: ['40 livros', '50 livros', '66 livros', '73 livros'],
    correctAnswerIndex: 2,
    citation: 'jw.org (Tópicos de estudo da Bíblia)'
  },
  {
    id: 'f3',
    theme: 'Vida de Jesus',
    level: 1,
    levelName: 'Fácil',
    question: 'Segundo o Evangelho de Mateus, em que cidade Jesus nasceu?',
    options: ['Jerusalém', 'Nazaré', 'Belém', 'Jericó'],
    correctAnswerIndex: 2,
    citation: 'Mateus 2:1'
  },
  {
    id: 'f4',
    theme: 'Davi e Golias',
    level: 1,
    levelName: 'Fácil',
    question: 'Que jovem pastor derrotou o gigante filisteu Golias usando apenas uma funda e uma pedra?',
    options: ['Davi', 'Salomão', 'Sansão', 'Saul'],
    correctAnswerIndex: 0,
    citation: '1 Samuel 17:49, 50'
  },
  {
    id: 'f5',
    theme: 'Criação',
    level: 1,
    levelName: 'Fácil',
    question: 'De acordo com o livro de Gênesis, quem foi a primeira mulher criada por Deus?',
    options: ['Sara', 'Eva', 'Rute', 'Maria'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 3:20'
  },
  {
    id: 'f6',
    theme: 'Criação',
    level: 1,
    levelName: 'Fácil',
    question: 'Como se chamava o belo jardim que Jeová Deus preparou como o primeiro lar para os humanos?',
    options: ['Jardim do Éden', 'Monte Sinai', 'Jardim do Getsêmani', 'Planície de Moabe'],
    correctAnswerIndex: 0,
    citation: 'Gênesis 2:8'
  },
  {
    id: 'f7',
    theme: 'Origem do Pecado',
    level: 1,
    levelName: 'Fácil',
    question: 'Que criatura foi usada no jardim do Éden para enganar Eva e induzi-la a desobedecer a Deus?',
    options: ['Um leão', 'Uma serpente', 'Um falcão', 'Um leopardo'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 3:1'
  },
  {
    id: 'f8',
    theme: 'Parábolas de Jesus',
    level: 1,
    levelName: 'Fácil',
    question: 'Na famosa parábola de Jesus, quem esbanjou toda a sua herança e depois voltou arrependido para os braços do pai?',
    options: ['O jovem rico', 'O fariseu hipócrita', 'O filho pródigo', 'O bom samaritano'],
    correctAnswerIndex: 2,
    citation: 'Lucas 15:11-24'
  },
  {
    id: 'f9',
    theme: 'O Êxodo',
    level: 1,
    levelName: 'Fácil',
    question: 'Quem olhou para trás ao fugir de Sodoma e acabou se tornando uma estátua de sal?',
    options: ['A esposa de Ló', 'A filha de Noé', 'A mãe de Sansão', 'Sarai'],
    correctAnswerIndex: 0,
    citation: 'Gênesis 19:26'
  },
  {
    id: 'f10',
    theme: 'Milagres de Jesus',
    level: 1,
    levelName: 'Fácil',
    question: 'Qual amigo querido de Jesus foi ressuscitado por ele depois de já estar morto por quatro dias?',
    options: ['Bartolomeu', 'Lázaro', 'Tomé', 'Simão de Cirene'],
    correctAnswerIndex: 1,
    citation: 'João 11:39, 43, 44'
  },
  {
    id: 'f11',
    theme: 'Os Dez Mandamentos',
    level: 1,
    levelName: 'Fácil',
    question: 'Em que montanha Moisés recebeu as tábuas de pedra contendo as Leis divinas entregues por Jeová?',
    options: ['Monte Nebo', 'Monte Sinai', 'Monte das Oliveiras', 'Monte Gerizim'],
    correctAnswerIndex: 1,
    citation: 'Êxodo 19:18, 20'
  },
  {
    id: 'f12',
    theme: 'Os Apóstolos',
    level: 1,
    levelName: 'Fácil',
    question: 'Qual dos doze apóstolos guiou os guardas armados para prender Jesus noGetsêmani?',
    options: ['Pedro', 'Judas Iscariotes', 'André', 'Filipe'],
    correctAnswerIndex: 1,
    citation: 'Mateus 26:47-49'
  },
  {
    id: 'f13',
    theme: 'Gênesis',
    level: 1,
    levelName: 'Fácil',
    question: 'De acordo com o relato do primeiro dia da criação física, o que Deus disse para vir à existência?',
    options: ['As águas do mar', 'A vegetação da terra', 'A luz física', 'O sol e a lua'],
    correctAnswerIndex: 2,
    citation: 'Gênesis 1:3'
  },
  {
    id: 'f14',
    theme: 'História de José',
    level: 1,
    levelName: 'Fácil',
    question: 'Que jovem hebreu interpretou os sonhos das vacas magras e das espigas secas do Faraó no Egito?',
    options: ['José', 'Benjamim', 'Rúben', 'Judá'],
    correctAnswerIndex: 0,
    citation: 'Gênesis 41:25-30'
  },
  {
    id: 'f15',
    theme: 'O Dilúvio',
    level: 1,
    levelName: 'Fácil',
    question: 'Quantas pessoas humanas no total sobreviveram ao Dilúvio global dentro da arca de Noé?',
    options: ['4 pessoas', '8 pessoas', '12 pessoas', '10 pessoas'],
    correctAnswerIndex: 1,
    citation: '1 Pedro 3:20'
  },
  {
    id: 'f16',
    theme: 'História de Jonas',
    level: 1,
    levelName: 'Fácil',
    question: 'Que criatura Deus providenciou para salvar o profeta Jonas após ele ter sido lançado na água pelo mar revolto?',
    options: ['Um grande tubarão', 'Um redemoinho manso', 'Um grande peixe', 'Uma balsa de madeira'],
    correctAnswerIndex: 2,
    citation: 'Jonas 1:17'
  },
  {
    id: 'f17',
    theme: 'O Pós-Dilúvio',
    level: 1,
    levelName: 'Fácil',
    question: 'Qual foi a primeira ave solta por Noé para testar se as águas do Dilúvio haviam baixado?',
    options: ['Uma pomba', 'Um corvo', 'Uma águia', 'Uma andorinha'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 8:7'
  },
  {
    id: 'f18',
    theme: 'Juventude de Jesus',
    level: 1,
    levelName: 'Fácil',
    question: 'Que profissão manual Jesus aprendeu no lar com seu pai adotivo José enquanto crescia em Nazaré?',
    options: ['Pescador de peixes', 'Carpinteiro', 'Tutor da Lei', 'Oleiro de barro'],
    correctAnswerIndex: 1,
    citation: 'Marcos 6:3'
  },
  {
    id: 'f19',
    theme: 'Nascimento de João Batista',
    level: 1,
    levelName: 'Fácil',
    question: 'Qual era o nome do idoso sacerdote, pai biológico de João Batista, que ficou temporariamente mudo?',
    options: ['Zacarias', 'Ananias', 'Caifás', 'Simeão'],
    correctAnswerIndex: 0,
    citation: 'Lucas 1:13, 20'
  },
  {
    id: 'f20',
    theme: 'O Êxodo de Moisés',
    level: 1,
    levelName: 'Fácil',
    question: 'Qual barreira d’água foi dividida milagrosamente sob a liderança de Moisés para que a congregação passasse a pé enxuto?',
    options: ['O Rio Jordão', 'O Mar da Galileia', 'O Mar Vermelho', 'O Rio Eufrates'],
    correctAnswerIndex: 2,
    citation: 'Êxodo 14:21, 22'
  },

  // ================= 20 PERGUNTAS MÉDIAS (level: 2, levelName: 'Médio') =================
  {
    id: 'm1',
    theme: 'Abraão e Isaque',
    level: 2,
    levelName: 'Médio',
    question: 'Com que idade a fiel e idosa Sara deu à luz seu único filho prometido, Isaque?',
    options: ['75 anos', '80 anos', '90 anos', '100 anos'],
    correctAnswerIndex: 2,
    citation: 'Gênesis 17:17; 21:5'
  },
  {
    id: 'm2',
    theme: 'Chamado de Moisés',
    level: 2,
    levelName: 'Médio',
    question: 'Que fenômeno extraordinário despertou a atenção de Moisés em Midiã, onde Deus falou com ele pela primeira vez?',
    options: ['Um terremoto suave', 'Uma sarça em chamas que não se consumia', 'Um feixe de luz do céu', 'Uma coluna de nuvem densa'],
    correctAnswerIndex: 1,
    citation: 'Êxodo 3:2'
  },
  {
    id: 'm3',
    theme: 'Guerreiros de Gideão',
    level: 2,
    levelName: 'Médio',
    question: 'Jeová instruiu Gideão a reduzir seu exército de milhares para quantos homens de elite baseados na forma como bebiam água?',
    options: ['100 guerreiros', '300 guerreiros', '1.000 guerreiros', '5.000 guerreiros'],
    correctAnswerIndex: 1,
    citation: 'Juízes 7:7'
  },
  {
    id: 'm4',
    theme: 'História de Sansão',
    level: 2,
    levelName: 'Médio',
    question: 'Por causa de que mulher filisteia ardilosa Sansão teve seus cabelos raspados, perdendo a força nazireia?',
    options: ['Dalila', 'Orpa', 'Mical', 'Maaca'],
    correctAnswerIndex: 0,
    citation: 'Juízes 16:19'
  },
  {
    id: 'm5',
    theme: 'Espionagem em Canaã',
    level: 2,
    levelName: 'Médio',
    question: 'Quantos espias no total foram enviados originalmente por Moisés para explorar e avaliar as qualidades da terra de Canaã?',
    options: ['2 espias', '10 espias', '12 espias', '7 espias'],
    correctAnswerIndex: 2,
    citation: 'Números 13:2'
  },
  {
    id: 'm6',
    theme: 'Liderança Teocrática',
    level: 2,
    levelName: 'Médio',
    question: 'Quem foi expressamente nomeado por Deus para suceder o profeta Moisés e guiar Israel na conquista da Terra Prometida?',
    options: ['Arão', 'Josué', 'Calebe', 'Gideão'],
    correctAnswerIndex: 1,
    citation: 'Josué 1:1, 2'
  },
  {
    id: 'm7',
    theme: 'Traição de Jesus',
    level: 2,
    levelName: 'Médio',
    question: 'Quantas moedas de prata foram pagas a Judas Iscariotes pelos principais sacerdotes judeus para trair Jesus?',
    options: ['10 moedas', '20 moedas', '30 moedas', '50 moedas'],
    correctAnswerIndex: 2,
    citation: 'Mateus 26:15'
  },
  {
    id: 'm8',
    theme: 'Dúvida de Tomé',
    level: 2,
    levelName: 'Médio',
    question: 'Qual dos discípulos declarou que não acreditaria na ressurreição de Jesus a menos que visse as feridas dos pregos em suas mãos?',
    options: ['Filipe', 'Tomé', 'Simão, o Zelote', 'Bartolomeu'],
    correctAnswerIndex: 1,
    citation: 'João 20:25'
  },
  {
    id: 'm9',
    theme: 'Rei Salomão',
    level: 2,
    levelName: 'Médio',
    question: 'Ao assumir o trono de Judá e Israel, que dom de valor inestimável Salomão pediu a Jeová em vez de riqueza e vitórias?',
    options: ['A vida eterna', 'Um coração sábio e obediente', 'O controle de todas as nações vizinhas', 'Um imenso palácio de cedro'],
    correctAnswerIndex: 1,
    citation: '1 Reis 3:9'
  },
  {
    id: 'm10',
    theme: 'Origem dos Reis',
    level: 2,
    levelName: 'Médio',
    question: 'Quem foi ungido pelo profeta Samuel como o primeiríssimo rei humano da nação israelita?',
    options: ['Davi', 'Saul', 'Salomão', 'Abner'],
    correctAnswerIndex: 1,
    citation: '1 Samuel 10:1'
  },
  {
    id: 'm11',
    theme: 'Exílio de João',
    level: 2,
    levelName: 'Médio',
    question: 'Na costa de qual pequena ilha o idoso apóstolo João estava exilado quando escreveu o livro profético do Apocalipse?',
    options: ['Ilha de Creta', 'Ilha de Malta', 'Ilha de Patmos', 'Ilha de Chipre'],
    correctAnswerIndex: 2,
    citation: 'Apocalipse 1:9'
  },
  {
    id: 'm12',
    theme: 'Juízas Corajosas',
    level: 2,
    levelName: 'Médio',
    question: 'Que corajosa profetisa e única juíza registrada de Israel convocou o comandante Baraque para enfrentar o inimigo Sísera?',
    options: ['Débora', 'Rute', 'Ester', 'Miriã'],
    correctAnswerIndex: 0,
    citation: 'Juízes 4:4'
  },
  {
    id: 'm13',
    theme: 'Profissão de Apóstolo',
    level: 2,
    levelName: 'Médio',
    question: 'Que ocupação lucrativa, mas muito criticada, Mateus (também conhecido por Levi) exercia quando seguiu a Jesus?',
    options: ['Oficial militar', 'Cobrador de impostos ou publicano', 'Fabricante de tendas', 'Fariheiro templário'],
    correctAnswerIndex: 1,
    citation: 'Mateus 9:9; Lucas 5:27'
  },
  {
    id: 'm14',
    theme: 'Os Filhos de Jacó',
    level: 2,
    levelName: 'Médio',
    question: 'Qual era o nome do décimo segundo e mais jovem filho de Jacó, nascido de sua amada esposa Raquel?',
    options: ['José', 'Benjamim', 'Dã', 'Gade'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 35:18'
  },
  {
    id: 'm15',
    theme: 'Conflito Familiar Arcaico',
    level: 2,
    levelName: 'Médio',
    question: 'De acordo com Gênesis, qual foi o primeiríssimo homicídio da história da humanidade?',
    options: ['Abel tirando a vida de Sete', 'Caim matando seu próprio irmão Abel', 'Lameque punindo um jovem', 'Esaú ferindo seriamente Jacó'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 4:8'
  },
  {
    id: 'm16',
    theme: 'Geografia Bíblica',
    level: 2,
    levelName: 'Médio',
    question: 'De qual forte cidade fortificada originou-se o gigante guerreiro Golias, campeão do acampamento dos filisteus?',
    options: ['Gaza', 'Asdode', 'Gate', 'Ascalon'],
    correctAnswerIndex: 2,
    citation: '1 Samuel 17:4'
  },
  {
    id: 'm17',
    theme: 'Nascimento de Moisés',
    level: 2,
    levelName: 'Médio',
    question: 'Como se chamava a mãe biológica de Moisés, contratada ironicamente pela filha do Faraó para amamentá-lo?',
    options: ['Miriã', 'Joquebede', 'Rebeca', 'Zípora'],
    correctAnswerIndex: 1,
    citation: 'Êxodo 6:20; Números 26:59'
  },
  {
    id: 'm18',
    theme: 'O Arrebatamento do Profeta',
    level: 2,
    levelName: 'Médio',
    question: 'Qual profeta de Jeová foi retirado repentinamente da terra num redemoinho sob a presença de seu assistente Eliseu?',
    options: ['Elias', 'Isaías', 'Ezequiel', 'Samuel'],
    correctAnswerIndex: 0,
    citation: '2 Reis 2:11'
  },
  {
    id: 'm19',
    theme: 'Milagres Aquáticos',
    level: 2,
    levelName: 'Médio',
    question: 'Que famoso rio da Palestina teve seu fluxo dividido de volta após ser tocado pela capa de Elias, e logo em seguida por Eliseu?',
    options: ['Rio Nilo', 'Rio Jordão', 'Rio Querite', 'Rio Eufrates'],
    correctAnswerIndex: 1,
    citation: '2 Reis 2:8, 14'
  },
  {
    id: 'm20',
    theme: 'Origem de Saulo',
    level: 2,
    levelName: 'Médio',
    question: 'A qual tribo de Israel pertencia o apóstolo Paulo, o qual orgulhava-se de sua linhagem ancestral?',
    options: ['Tribo de Judá', 'Tribo de Levi', 'Tribo de Benjamim', 'Tribo de Rúben'],
    correctAnswerIndex: 2,
    citation: 'Romanos 11:1'
  },
  {
    id: 'm21',
    theme: 'Apocalipse (Nova Jerusalém)',
    level: 2,
    levelName: 'Médio',
    question: 'No livro do Apocalipse (Revelação), quantas portas de pérolas tem a muralha da Nova Jerusalém?',
    options: ['4 portas', '12 portas', '7 portas', '24 portas'],
    correctAnswerIndex: 1,
    citation: 'Apocalipse 21:12, 21'
  },
  {
    id: 'm22',
    theme: 'Apocalipse (Símbolos)',
    level: 2,
    levelName: 'Médio',
    question: 'Em Apocalipse, qual é o número registrado como o número da fera (ou animal selvagem)?',
    options: ['777', '144.000', '616', '666'],
    correctAnswerIndex: 3,
    citation: 'Apocalipse 13:18'
  },
  {
    id: 'm23',
    theme: 'Apocalipse (Sete Igrejas)',
    level: 2,
    levelName: 'Médio',
    question: 'No início do Apocalipse, a quantas congregações (ou igrejas) da província da Ásia João é instruído a enviar cartas escritas?',
    options: ['3 congregações', '7 congregações', '12 congregações', '10 congregações'],
    correctAnswerIndex: 1,
    citation: 'Apocalipse 1:4, 11'
  },
  {
    id: 'm24',
    theme: 'Reis de Judá',
    level: 2,
    levelName: 'Médio',
    question: 'Quantos anos tinha Josias quando começou a reinar em Jerusalém?',
    options: ['12 anos', '8 anos', '18 anos', '20 anos'],
    correctAnswerIndex: 1,
    citation: '2 Reis 22:1'
  },
  {
    id: 'm25',
    theme: 'Cartas de Paulo',
    level: 2,
    levelName: 'Médio',
    question: 'Qual é o menor livro das Escrituras Gregas Cristãs em número de versículos que foi escrito pelo apóstolo Paulo?',
    options: ['Filêmon', 'Tito', '2 João', 'Hebreus'],
    correctAnswerIndex: 0,
    citation: 'Filêmon 1-25'
  },

  // ================= 20 PERGUNTAS DIFÍCEIS (level: 3, levelName: 'Difícil') =================
  {
    id: 'd1',
    theme: 'Império de Babilônia',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual era o nome do desatento rei babilônico que promovia um banquete idólatra quando presenciou a escrita misteriosa do dedo na parede?',
    options: ['Nabucodonosor', 'Belsazar', 'Evil-Merodaque', 'Dario, o Medo'],
    correctAnswerIndex: 1,
    citation: 'Daniel 5:1-5'
  },
  {
    id: 'd2',
    theme: 'Queda de Jericó',
    level: 3,
    levelName: 'Difícil',
    question: 'No total, somando os cercos diários padrão e a marcha especial do último dia, quantas voltas completas ao redor de Jericó Israel deu antes dos muros ruírem?',
    options: ['7 voltas', '12 voltas', '13 voltas', '14 voltas'],
    correctAnswerIndex: 2,
    citation: 'Josué 6:3, 4 (1 por dia durante 6 dias, mais 7 voltas no 7º dia = 13 voltas)'
  },
  {
    id: 'd3',
    theme: 'Rei Ezequias',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual rei devoto de Judá obteve de Jeová uma adição milagrosa de 15 anos à sua expectativa de vida, acompanhado do sinal de sombras retrogradas?',
    options: ['Rei Josias', 'Rei Ezequias', 'Rei Josafá', 'Rei Manassés'],
    correctAnswerIndex: 1,
    citation: '2 Reis 20:5, 6'
  },
  {
    id: 'd4',
    theme: 'Tribulação de Jeremias',
    level: 3,
    levelName: 'Difícil',
    question: 'Que profeta fiel e sofredor foi jogado por príncipes rebeldes em uma cisterna profunda cheia de lama no pátio da guarda?',
    options: ['Ezequiel', 'Jeremias', 'Miqueias', 'Sofonias'],
    correctAnswerIndex: 1,
    citation: 'Jeremias 38:6'
  },
  {
    id: 'd5',
    theme: 'Biografia de Ester',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual era o nome original hebraico de nascimento da rainha Ester antes de ser levada ao palácio do rei persa Assuero?',
    options: ['Hadassa', 'Zípora', 'Maaca', 'Abigail'],
    correctAnswerIndex: 0,
    citation: 'Ester 2:7'
  },
  {
    id: 'd6',
    theme: 'Genealogia de Pedro',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual é o nome atribuído ao pai biológico de Simão Pedro e de seu irmão André no Evangelho de João na Tradução do Novo Mundo?',
    options: ['Alfeu', 'Santiaguino', 'João', 'Zebedeu'],
    correctAnswerIndex: 2,
    citation: 'João 1:42 ("Jesus olhou para ele e disse: \'Você é Simão, filho de João\'")'
  },
  {
    id: 'd7',
    theme: 'Arqueologia e Medidas',
    level: 3,
    levelName: 'Difícil',
    question: 'A Bíblia diz que Golias media "seis côvados e um palmo" de altura. De acordo com as estimativas baseadas no côvado comum, qual era a altura em metros?',
    options: ['Cerca de 2,35 metros', 'Cerca de 2,65 metros', 'Cerca de 2,90 metros', 'Cerca de 3,25 metros'],
    correctAnswerIndex: 2,
    citation: 'Estudo Perspicaz das Escrituras (1 Samuel 17:4)'
  },
  {
    id: 'd8',
    theme: 'Rei Reformador',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual jovem rei ascendeu ao trono de Judá com apenas oito anos de idade e comandou uma rigorosa varredura contra a falsa adoração no reino?',
    options: ['Rei Josias', 'Rei Josia', 'Rei Manassés', 'Rei Acazias'],
    correctAnswerIndex: 0,
    citation: '2 Reis 22:1; 23:3, 4'
  },
  {
    id: 'd9',
    theme: 'Pouso da Arca',
    level: 3,
    levelName: 'Difícil',
    question: 'Em que região montanhosa específica a colossal arca de Noé pousou após o decréscimo das águas do Dilúvio global?',
    options: ['Monte Hermom', 'Montes de Ararat', 'Monte Hor', 'Monte Sinai'],
    correctAnswerIndex: 1,
    citation: 'Gênesis 8:4'
  },
  {
    id: 'd10',
    theme: 'O Primeiro Gentio',
    level: 3,
    levelName: 'Difícil',
    question: 'Quem foi o centurião romano temente a Deus em Cesareia que se tornou o primeiríssimo gentio não circuncidado convertido ao cristianismo?',
    options: ['Cornélio', 'Félix', 'Sérgio Paulo', 'Lísias'],
    correctAnswerIndex: 0,
    citation: 'Atos 10:1-3; 10:44-48'
  },
  {
    id: 'd11',
    theme: 'História de Rute',
    level: 3,
    levelName: 'Difícil',
    question: 'Como se chamava a idosa sogra judaica da fiel moabita Rute, a quem ela jurou seguir incondicionalmente em Judá?',
    options: ['Orpa', 'Marlúcia', 'Noemi', 'Lia'],
    correctAnswerIndex: 2,
    citation: 'Rute 1:2, 16'
  },
  {
    id: 'd12',
    theme: 'Daniel na Corte',
    level: 3,
    levelName: 'Difícil',
    question: 'Que novo nome de origem babilônica foi dado a Daniel no início do cativeiro na corte real em Babilônia?',
    options: ['Beltebazar', 'Sadraque', 'Mesaque', 'Abednego'],
    correctAnswerIndex: 0,
    citation: 'Daniel 1:7'
  },
  {
    id: 'd13',
    theme: 'O Voto de Jefté',
    level: 3,
    levelName: 'Difícil',
    question: 'Que governante e juiz de Israel fez um voto solene que resultou no serviço exclusivo e vitalício de sua filha única no santuário de Jeová?',
    options: ['Jefté', 'Gideão', 'Sansão', 'Ab do Sul'],
    correctAnswerIndex: 0,
    citation: 'Juízes 11:30, 31, 39'
  },
  {
    id: 'd14',
    theme: 'O Julgamento de Paulo',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual orador público profissional ou advogado defendeu as acusações maliciosas do Sinédrio contra Paulo perante o governador romano Félix?',
    options: ['Lísias', 'Sérgio', 'Tértulo', 'Galião'],
    correctAnswerIndex: 2,
    citation: 'Atos 24:1, 2'
  },
  {
    id: 'd15',
    theme: 'Rei Desobediente de Judá',
    level: 3,
    levelName: 'Difícil',
    question: 'Que ímpio rei de Judá recusou os conselhos do profeta Isaías e chegou a passar seus próprios filhos pelo fogo no vale de Hinom?',
    options: ['Rei Acaz', 'Rei Josias', 'Rei Acabe', 'Rei Manassés'],
    correctAnswerIndex: 0,
    citation: '2 Reis 16:2, 3'
  },
  {
    id: 'd16',
    theme: 'Salmos Bíblicos',
    level: 3,
    levelName: 'Difícil',
    question: 'Excluindo suplementos e acréscimos apócrifos, quantos cânticos sagrados (Salmos) constituem o cânon hebraico canônico?',
    options: ['120 Salmos', '150 Salmos', '160 Salmos', '200 Salmos'],
    correctAnswerIndex: 1,
    citation: 'Divisão canônica tradicional de Salmos'
  },
  {
    id: 'd17',
    theme: 'Batalha de Megido',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual rei devoto de Judá ignorou a advertência teocrática, entrou disfarçado em batalha contra o Faraó Neco no vale de Megido e acabou perdendo a vida?',
    options: ['Rei Ezequias', 'Rei Josias', 'Rei Joás', 'Rei Amom'],
    correctAnswerIndex: 1,
    citation: '2 Reis 23:29; 2 Crônicas 35:20-24'
  },
  {
    id: 'd18',
    theme: 'O Animal Falador',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual era o nome do profeta ganancioso contratado pelo rei moabita Balaque cujo animal de carga falou milagrosamente?',
    options: ['Balaão', 'Jeú', 'Gazi', 'Eliú'],
    correctAnswerIndex: 0,
    citation: 'Números 22:5, 28-30'
  },
  {
    id: 'd19',
    theme: 'O Tabernáculo de Siló',
    level: 3,
    levelName: 'Difícil',
    question: 'Quem era o rei-sacerdote ou sumo sacerdote de Israel cuja má tutela dos filhos levou à queda espiritual de Siló na infância de Samuel?',
    options: ['Samuel', 'Eli', 'Fineias', 'Abiatar'],
    correctAnswerIndex: 1,
    citation: '1 Samuel 1:9; 2:12'
  },
  {
    id: 'd20',
    theme: 'Aliança Comercial do Templo',
    level: 3,
    levelName: 'Difícil',
    question: 'Qual era o nome do rei fenício de Tiro que manteve amizade estreita com Davi e forneceu os finos cedros do Líbano para o templo construído por Salomão?',
    options: ['Hirão', 'Tiglate-Pileser', 'Senaqueribe', 'Adonizeque'],
    correctAnswerIndex: 0,
    citation: '1 Reis 5:1, 2'
  },
  // ================= 20 PERGUNTAS ULTRA DIFÍCEIS / DIFÍCIL HARD (level: 4, levelName: 'Difícil Hard') =================
  {
    id: 'dh1',
    theme: 'Rei de Judá',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Quem foi o único rei de Judá que foi levado prisioneiro para Babilônia em ganchos e bronze, mas se arrependeu sinceramente e foi restaurado ao seu trono?',
    options: ['Ezequias', 'Manassés', 'Jeoaquim', 'Sedequias'],
    correctAnswerIndex: 1,
    citation: '2 Crônicas 33:11-13'
  },
  {
    id: 'dh2',
    theme: 'Sacerdotes fiéis',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual sacerdote fiel escondeu o jovem Jeoás no templo de Jeová por seis anos para salvá-lo da cruel rainha Atalia?',
    options: ['Joiada', 'Eliasibe', 'Hilquias', 'Zacarias'],
    correctAnswerIndex: 0,
    citation: '2 Reis 11:3'
  },
  {
    id: 'dh3',
    theme: 'Cidade Refúgio',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual das seguintes cidades do lado leste do Jordão foi designada por Moisés como uma das três cidades de refúgio?',
    options: ['Hebrom', 'Siquém', 'Bezer', 'Quedes'],
    correctAnswerIndex: 2,
    citation: 'Deuteronômio 4:43'
  },
  {
    id: 'dh4',
    theme: 'Juízes Menos Conhecidos',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual juiz de Israel liderou a nação por dez anos e pertencia à tribo de Zebulão?',
    options: ['Elon', 'Ibzan', 'Abdom', 'Tola'],
    correctAnswerIndex: 0,
    citation: 'Juízes 12:11'
  },
  {
    id: 'dh5',
    theme: 'História do Templo',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Em que ano do reinado de Salomão começou a construção do templo em Jerusalém?',
    options: ['Segundo ano', 'Quarto ano', 'Sétimo ano', 'Décimo ano'],
    correctAnswerIndex: 1,
    citation: '1 Reis 6:1'
  },
  {
    id: 'dh6',
    theme: 'O Fiel Ebede-Meleque',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual era o nacionalidade de Ebede-Meleque, o oficial da corte que destemidamente resgatou Jeremias da cisterna lamacenta?',
    options: ['Egípcio', 'Etíope', 'Babilônio', 'Moabita'],
    correctAnswerIndex: 1,
    citation: 'Jeremias 38:7'
  },
  {
    id: 'dh7',
    theme: 'Profecia de Daniel',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual foi o rei persa que emitiu o primeiro decreto oficial permitindo que os judeus retornassem a Jerusalém para reconstruir o templo?',
    options: ['Artaxerxes', 'Dario I', 'Ciro, o Grande', 'Xerxes I'],
    correctAnswerIndex: 2,
    citation: 'Esdras 1:1-3'
  },
  {
    id: 'dh8',
    theme: 'Instrumentos do Templo',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Quantas bacias de ouro foram feitas por Salomão para o Santo do Templo?',
    options: ['10 bacias', '5 bacias', '100 bacias', 'Só uma grande bacia'],
    correctAnswerIndex: 2,
    citation: '2 Crônicas 4:8 (Cem bacias de ouro)'
  },
  {
    id: 'dh9',
    theme: 'Inimigos de Neemias',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Além de Sambalate e Tobias, qual líder árabe se opôs ativamente à reconstrução das muralhas de Jerusalém por Neemias?',
    options: ['Gesém', 'Hadade', 'Mesas', 'Balaque'],
    correctAnswerIndex: 0,
    citation: 'Neemias 2:19'
  },
  {
    id: 'dh10',
    theme: 'Casamento de Isaque',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Como se chamava o servo fiel de Abraão enviado a Harã para encontrar uma esposa para Isaque?',
    options: ['Eliezer', 'Ziba', 'Geazi', 'Abisai'],
    correctAnswerIndex: 0,
    citation: 'Gênesis 15:2; 24:2'
  },
  {
    id: 'dh11',
    theme: 'Profetas Menores',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual profeta menor profetizou exclusivamente sobre a destruição de Nínive, anos após a pregação de Jonas?',
    options: ['Naum', 'Obadias', 'Sofonias', 'Habacuque'],
    correctAnswerIndex: 0,
    citation: 'Naum 1:1'
  },
  {
    id: 'dh12',
    theme: 'Geografia do Novo Testamento',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Em qual ilha o navio que transportava o apóstolo Paulo naufragou depois de enfrentar a tempestade de vento chamada "Euroaquilão"?',
    options: ['Chipre', 'Malta', 'Creta', 'Sicília'],
    correctAnswerIndex: 1,
    citation: 'Atos 27:14; 28:1'
  },
  {
    id: 'dh13',
    theme: 'Tribos de Israel',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual tribo foi abençoada por Moisés como aquela que "mora segura junto a Jeová", recebendo proteção contínua?',
    options: ['Benjamim', 'Efraim', 'Dan', 'Aser'],
    correctAnswerIndex: 0,
    citation: 'Deuteronômio 33:12'
  },
  {
    id: 'dh14',
    theme: 'Reis de Israel',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual rei de Israel governou por apenas sete dias antes de incendiar o palácio real sobre si mesmo ao ver a cidade cercada?',
    options: ['Zimri', 'Elá', 'Pecá', 'Salum'],
    correctAnswerIndex: 0,
    citation: '1 Reis 16:15-18'
  },
  {
    id: 'dh15',
    theme: 'História do Êxodo',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual era o nome do sogro de Moisés, também conhecido como Reuel, sacerdote de Midiã?',
    options: ['Jetro', 'Hobabe', 'Balão', 'Labão'],
    correctAnswerIndex: 0,
    citation: 'Êxodo 3:1; 18:1'
  },
  {
    id: 'dh16',
    theme: 'Visões de Zacarias',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Na primeira visão do profeta Zacarias, de que cor eram os cavalos que patrulhavam a terra?',
    options: ['Vermelhos, castanhos e brancos', 'Pretos, amarelos e cinzentos', 'Pálidos e vermelhos', 'Apenas brancos'],
    correctAnswerIndex: 0,
    citation: 'Zacarias 1:8'
  },
  {
    id: 'dh17',
    theme: 'Epístolas Paulinas',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'A qual desses companheiros Paulo solicitou que trouxesse "os pergaminhos, especialmente os de couro" que ele havia deixado em Trôade?',
    options: ['Timóteo', 'Tito', 'Lucas', 'Tíquico'],
    correctAnswerIndex: 0,
    citation: '2 Timóteo 4:13'
  },
  {
    id: 'dh18',
    theme: 'Estudo de Nomes',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Qual era o significado em português do nome profético "Maer-Salal-Has-Baz", dado ao filho do profeta Isaías?',
    options: ['Apressa-te ao despojo! Corre à presa!', 'Deus está conosco', 'Um restante voltará', 'A salvação pertence a Jeová'],
    correctAnswerIndex: 0,
    citation: 'Isaías 8:1 - nota'
  },
  {
    id: 'dh19',
    theme: 'Genealogia Bíblica',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Quem foi o pai espiritual de Lameque e avô de Noé, conhecido por ser o homem que mais tempo viveu registrado na Bíblia?',
    options: ['Matusalém', 'Enoque', 'Sete', 'Jarede'],
    correctAnswerIndex: 0,
    citation: 'Gênesis 5:25-27'
  },
  {
    id: 'dh20',
    theme: 'Mistérios de Gênesis',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Quem é descrito em Gênesis como "um poderoso caçador em oposição a Jeová" e fundador do reino de Babel?',
    options: ['Ninrode', 'Canaã', 'Mizraim', 'Assur'],
    correctAnswerIndex: 0,
    citation: 'Gênesis 10:8, 9'
  },
  {
    id: 'dh21',
    theme: 'Apocalipse (As Sete Taças)',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Em Apocalipse, qual praga atinge a terra quando a primeira das sete taças da ira de Deus é derramada?',
    options: ['As águas se tornam em sangue', 'Úlceras dolorosas e malignas nos humanos', 'A escuridão cobre o reino', 'Uma terrível chuva de pedras'],
    correctAnswerIndex: 1,
    citation: 'Apocalipse 16:2'
  },
  {
    id: 'dh22',
    theme: 'Apocalipse (As Sete Trombetas)',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'Quando o terceiro anjo tocou a sua trombeta em Apocalipse, uma grande estrela caiu do céu queimando como uma lâmpada. Qual era o nome dessa estrela?',
    options: ['Absinto', 'Apolion', 'Abadon', 'Lucena'],
    correctAnswerIndex: 0,
    citation: 'Apocalipse 8:10, 11'
  },
  {
    id: 'dh23',
    theme: 'Apocalipse (Os 144.000)',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'De acordo com o livro do Apocalipse, os 144.000 selados sob a proteção divina são descritos cantando o quê perante o trono?',
    options: ['O cântico de Moisés e do Cordeiro', 'Um novo cântico que ninguém mais podia aprender', 'Um hino de louvor ao Sumo Pastor', 'As canções tradicionais de Sião'],
    correctAnswerIndex: 1,
    citation: 'Apocalipse 14:3'
  },
  {
    id: 'dh24',
    theme: 'Apocalipse (Os Cavaleiros)',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'De acordo com o livro de Apocalipse (Revelação), que autoridade ou poder é dado ao cavaleiro do cavalo descorado?',
    options: ['Autoridade para inflamar a guerra mundial', 'Autoridade sobre a quarta parte da terra, para matar com espada, escassez de alimentos, praga mortífera e feras', 'Autoridade para balançar a balança econômica de forma injusta', 'Autoridade para selar os servos de Deus na testa'],
    correctAnswerIndex: 1,
    citation: 'Apocalipse 6:8'
  },
  {
    id: 'dh25',
    theme: 'Apocalipse (Símbolos)',
    level: 4,
    levelName: 'Difícil Hard',
    question: 'De acordo com Apocalipse 21, de que pedra preciosa é feito o muro da Nova Jerusalém, e qual é a sua primeira fundação?',
    options: ['Jaspe e jaspe', 'Ouro e safira', 'Jaspe e esmeralda', 'Diamante e rubi'],
    correctAnswerIndex: 0,
    citation: 'Apocalipse 21:18, 19'
  }
];
