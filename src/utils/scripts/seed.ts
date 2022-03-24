import { set, ref } from 'firebase/database';
import { exit } from 'process';
import { DB, PointsMode } from '../../shared/models/db';
import { db } from '../firebase/firebase';

const questions = [
  "Ce găsești în geanta unei studente?",
  "Care este cel mai folosit lucru într-o cameră de studenți?",
  "Care este cel mai tare club din Cluj?",
  "Cum iți treci cel mai uşor o restanță?",
  "Cum poți să nu adormi la cursuri ?",
  "Cel mai bun înlocuitor pentru mâncare este?",
  "Ce mâncare se găsește în frigiderul unei persoane care sta la cămin?",
  "Mâncarea pe care se luptă tot studentul la cantină?",
  "Cea mai nasoală materie este?",
  "Care e cea mai bună bere din Lidl?",
  "Băutura care nu ar trebui să lipsească din frigider este:",
  "Cele mai frecventate busuri de către studenți?",
  "Care sunt ingredientele din zacuscă?",
  "Care este foietajul preferat al studenților de la Lidl?",
  "De ce un student ar sta mai bine peste weekend la părinți în loc să stea la cămin/chirie?",
  "O studentă își poate pune pe Tinder descrierea : 'Ies doar cu cineva care ......'",
  "Care sunt motivele pentru care un student nu termină facultatea?",
  "Pe ce cheltuie studenții banii?",
  "La ce tip de party vor studenții să meargă?",
  "Ce găsești sub patul de cămin?",
  "Ce faci cu mâncarea din caserola de acasă?",
  "Ce face un student cu banii de pe bursă?",
  "Ce primește un student de acasă?",
  "Ce fac studenții joia?",
  "Ce fac studenții când e frig în cameră?",
  "Unde merg studenții la cafea?",
  "Scuze când te prinde portarul în cămin și tu nu stai în cămin",
  "Unde mergi să bei?",
  "Cum convingi colegii să iți lase camera libera?",
  "Scuze că ai întârziat",
  "Berea preferată de studenți",
  "Unde își iau masa stundentii între laboratoare?",
  "Pe ce se ceartă colegii de cameră?",
  "Cele mai groaznice locuri în care te poți trezi după beție",
  "Jocuri stundeti",
  "Cum spui că ai restanță fară să spui că ai restanță?",
  "Ce poți pierde la un party?",
  "Ce se fură în cămin?",
  "Ce gătește studentul?",
  "Ce își aduce studentul când se mută?",
  "Ce mâncare nu se strică dacă nu o pui la frigider?",
  "De unde își comandă stundetul de mâncare?",
  "Ce se poate întinde pe pâine?",
  "Studentul uită să...",
  "Ce obiecte se pot strica într-o cameră de cămin/apartament?",
  "Ce platformă preferă stundetii?",
  "Ce superputeri ar vrea stundetii să aibă în timpul examenelor?",
  "Serialul preferat în sesiune",
  "Cele mai așteptate vacanțe (fară cea de vară) ?",
  "Cu ce pleci acasă?",
  "De ce stau studenții în chirie și nu în cămin?",
  "Criterii după care îmi aleg colegul de apartament/camera de cămin?"
];

const answers = [
	["Absorbante-24","Servetele umede-15","Laptop-15","Elastice de par-14","Foi-13","Make-up-12","Pixuri-7"],
	["Laptop-28","Frigider-22","Tirbuson-13","Zacuscă-12","Tigaie-6","Microunde-11","Uscator de rufe-8",""],
	["After Eight-27","Euphoria-20","Form-18","Caro-12","NOA-7","Midi-5","Phi18-4","Revolution-7"],
	["Copiezi-33","Inveti-31","Pui un pomelnic-23","Trimiti pe altcineva-6","Te milogești de prof-4","Mita-3","","",""],
	["Nu te duci-36","Cafea-20","Razi cu prietenii-15","Te joci pe telefon-13","Energizant-7","Somn de dinainte-5","Iti faci notite-4",""],
	["Somn-24","Bere-22","Tigari-17","Cafea-16","Apa-13","Energizant-8","","",""],
	["Alcool-27","Snitele-23","Zacusca-20","Nimic-14","Mezeluri-8","Chiftele-5","Salata de boeuf-3"],
	["Snitel-30","Cartofi Prajiti-18","Cas pane-15","Prajitura-13","Snitel Elvetian/Gordon Bleu-12","Gratar de porc-7","Friptura de pui-5","","",""],
	["Rezistenta materialelor-34","Mecanica - Furdulea-17","Electronica de putere - Festila-16","ASDN - Cret-15","MP - Cistelecan-15","TM - Varga-3","","",""],
	["Peroni-26","Becks-23","Neumarkt-18","Argus-10","Calsberg-9","Steampunk-5","Perlenbacher-5","Strasnic-4"],
	["Bere-73","Tuica/Palinca-13","Vin-13","Suc(Cocktail)-11","Vodka-7","Whisky-5","Gin-5","Rom-3","","",""],
	["24B-33","35-27","25-10","46B-9","5-9","43P-6","45-3","50-3"],
	["Gogosar-21","Vinete-19","Ceapa-18","Fasole-17","Rosii-13","Morcovi-7","Ciuperci-5","",""],
	["Pizza snack-39","Foietaj cu carnacior-21","Foietaj cu ciocolata-14","Gogosi-12","Foietaj cu Telemea-9","Melc cu stafide-5","","",""],
	["Mancare-36","Spalat haine-27","Ii sarac-17","Prieteni-8","Colegi de camera enervanti-7","Obligat de parinti-5","","","",""],
	["E dotat peste tot-22","Nu are restante-18","Are bani-18","Are masina-17","E amuzant-13","E destept-12","","","",""],
	["Restante-40","Petreceri-23","Nu-si ia licenta-17","Devine parinte-14","N-are bani de taxa-6","","","","",""],
	["Bautura-25","Tigari-23","Mancare-19","Restante-14","Camin/Chirie-11","Chestii pt camera-5","","","",""],
	["Glow in the crush-24","Retro-22","Tehnoase-16","Retromaneloteca-16","Kitsch-14","DnB-5","PPP-4","","",""],
	["Papuci-27","Sticle/PET-uri-19","Gandaci-15","Praf/Mizerie-14","Sosete-12","Colegu din alta camera-8","","","",""],
  ["O mănânci și o speli - 32","O arunci - 25","O îngheți - 19","O dai la colegu - 13","Pisicile din campus - 7","O lași pe geam - 4"],
  ["Îi bea - 29","Îi mănâncă - 25","Ieși în club - 19","Plătești datoriile - 12","Scoți fetele în oraș - 7","Bagi benzină - 5","Mergi în vacanță - 3"],
  ["Chiftele și șnițele - 33","Sarmale - 25"," Ciorbă - 19","Salată de boeuf - 15","Tocăniță - 6","Bere - 2"],
  ["Beau - 36","Învață - 27","Merge acasă - 19","Infinity - 10","Voluntariat - 8"],
  ["Pornesc uscătorul de păr - 31","Dăm drumul la dus să iasă aburi - 29","Sex - 20","Duș - 11","Deschid geamul - 9"],
  ["Tonomat - 30","Meron - 24","Starbucks - 18","Apropo - 12","Caro - 10","Jogo - 6"],
  ["Fac un proiect - 28","Am venit să las un pachet - 26","Jur că sunt de aici - 20","Mi-am uitat ceva - 12","Am un frate/ o soră - 8","Sunt de la deratizare - 6"],
  ["Apartamentul cuiva - 31","Cămin - 25","Parc - 19","Infinity - 13","Janis - 8","Sediu - 4"],
  ["O să fie și rândul tău - 33","Spăl vasele și fac curat - 26","O bere - 18","Îți dau mâncarea mea - 13","Doar de data asta - 7","Îți fac temele o săptămână - 3"],
  ["Am pierdut busul - 28","Nu am găsit sala - 26","Stau în Florești/Mărăști - 16","Acum am venit de acasă - 10","Voluntariat - 9","Am luat un pachet - 7","Am fost la țigară - 4"],
  ["Dormi - 31","Nu intri - 26","Mănânci - 17","Înjuri - 15","Pleci - 9","Ești atent - 2"],
  ["Ursus - 26","Ciucaș - 21","Desperados - 16","Timișoreana - 12","Corona - 10","Neumarkt - 8 ","Staropramen - 5","Paulaner - 2"],
  ["Cantină - 29","Nu mănâncă - 24","Magazinul de la colț - 18","Caro - 12","Form - 9","Apropo - 5","Shadow - 3"],
  ["Spălat de vase - 34","Păstrarea liniștii - 21","Baie - 16","Mâncare - 14","Băutură - 9","Părăsirea perimetrului - 6"],
  ["Facultate - 28","Spital - 20","Patul fostei/fostului - 18","Șanț - 12","Baie - 10","Într-un mijloc de transport - 7","Înapoi în club - 5"],
  ["Beerpong - 31","Bărcuță/Autobuz/Corabie - 20","Kings - 18","Picolo - 15","Bolț - 10","FlipCup - 6"],
  ["Mărire de la 4 la 5 - 34","Mi-a plăcut prea mult prima dată - 25","Nu am vrut să par disperat - 19","Nu am nevoie de vacanță - 13","Economisesc măriri - 7"],
  ["Vocea - 28","Portofel - 21","Prietenii - 19","Telefon - 13","Chei - 10","Geacă - 6","Ochelari - 3"],
  ["Țigări - 34","Mâncare - 27","Băutură - 19","Șlapi - 12","Oale - 6","Haine - 2"],
  ["Lapte cu cereale - 29","Cartofi prăjiți - 25","Ouă - 24","Paste - 13","Prăjitură - 4","Ciorbă - 3","Pește - 2"],
  ["Haine - 32","Sandwich maker - 19","Cuptor cu microunde - 15","Frigider - 14","Cafetieră - 11","Aspirator - 6","Covor - 3"],
  ["Conserve - 28","Cerealele - 25","Snacks - 16","Dulciuri - 14","Pâine - 10","Fructe - 7"],
  ["Mc/KFC - 42","Big Belly - 16","Mado - 13","Rosa - 11","Irish Pub - 9","Poco Loco - 5","20 Pizza - 4"],
  [ "Pate - 23","Zacuscă - 21","Cremă de brânză - 17","Nutella - 14","Unt - 12","Gem - 8","Icre - 5" ],
  [ "Meargă la cursuri - 29","Teme - 21","Mănânce - 19","Plătească chiria/căminul - 15","Doarmă - 11","Meargă acasă - 5"],
  [ "Becul - 27","WC - 24","Peretele - 16","Paharele - 14","Frigiderul - 11","Coșul de gunoi - 8"],
  [ "Teams - 40","Discord - 25","Zoom - 11","Google classroom - 9","Moodle - 6","Github - 5","Skype - 4"],
  ["Atotștiutor - 33","Citirea gândurilor - 21","Controlul timpului - 17","Teleportare - 11","Super Vedere - 10","Invizibilitate - 8"],
  ["Peaky Blinders - 25","Lucifer - 22","Casa de papel - 17","Sex Education - 13","Euphoria - 10","Breaking Bad - 7","Narcos - 6"],
  ["Crăciun - 34","Paște - 30","Cele 3 zile de vacanță intersemestrială - 14","1 Mai - 13"," 1 Decembrie - 5","Zilele de nume - 4"],
  ["Tren - 29","Bus - 24","Mașina cuiva - 19","Mașina personală - 11","Pe jos - 9","BlaBlaCar - 8"],
  ["Vor spațiu personal - 27","Confort/Aspect - 22","Au prea mulți bani - 19","Nu au prins loc - 17","Au nevoie de liniște - 9","Nu vor să împartă mâncarea - 6"],
  ["Vibe - 32","Organizare/Îngrijire - 21","Inteligență - 17","Aspect - 13","Pretenții - 12","Bani - 5"], 
];

const lightningQuestions = [
  "Ce iei obligatoriu cu tine în camping?",
  "La ce sărbători ai de dat cadouri?",
  "Sporturi care se joacă în apa..",
  "Ce ai putea să închizi/stingi când pleci de acasă?",
  "Lucruri pe care le găsești în CV-ul cuiva dar nu sunt adevărate.",
  "Lucruri la care oamenii sunt alergici de obicei",
  "Obiecte pentru care facem economii în viață",
  "Numește mâncarea/alimentul pe care o/îl eviți înainte de o întâlnire.",
  "Locuri unde nu este politicos să râzi..",
  "Numește un loc în care găsești de obicei mai multe femei decât bărbați",
  "Ce poți uita în taxi/bus?",
  "Ce cadou nu ai vrea să primești pentru că l-ai considera o insultă",
  "În afară de albastru, ce culoare poate avea cerneală?",
  "Ce animal domestic scoate sunete enervante?",
  "Ce faci iarna afară ca să te distrezi?",
  "Ce animale fac țop/sar?",
  "Ce faci prima oară când te trezești?",
  "Am aruncat undița în lac și în loc de pește am prins...",
  "Ce admiră vecinul la casa ta?",
  "Numește ceva rotund",
  "Numește un semn de circulație",
  "Ce fruct are un singur sâmbure?",
  "Numește un animal din zodiac",
  "Un vrăjitor faimos.",
  "Ceva ce ții mereu în priză.",
  "Animale de la zoo.",
  "Ce sporturi se joacă în echipă?",
  "Meserie prin care o persoană poate deveni faimoasă.",
  "Un supererou cunoscut.",
  "Numește o culoare de lenjerie pe care o păstrezi pentru evenimente speciale.",
  "Ce lucruri găsești într-un portofel",
  "Ce faci după o despărțire?",
  "Pe ce stăm jos?",
  "Rețele de socializare populare.",
  "Ce porți pe mănă?",
  "Brand de încălțăminte cunoscută.",
  "Numește o floare care poate fi albă/",
  "Ce bagi la cuptor.",
  "Bradul este în centrul atenției de Crăciun. Ce copac este vedetă într-o poezie?",
  "Ce haine își cumpără moșul când merge în vacanță în Hawaii",
  "În afară de litera O, ce literă este simpatică și dolofană",
  "Ce este tare?",
  "La ce ești atent când conduci?",
  "Cum poate fi o friptură?",
  "Cum poți nota rapid o idee de un milion de dolari când nu ai niciun pix la tine?",
  "În afară de reni ce animale poate înhamă la sanie moșul?",
  "Ce strălucește frumos?",
  "Ce oferă oamenii ca simbol al iubirii?",
  "Ce gen de muzică asculți pe plajă?",
  "Unde stai cel mai mult în picioare?",
];


const lightningAnswers = [
  ["Cort - 36", "Sac de dormit - 21", "Ghiozdan - 12", "Mâncare - 11", "Hârtie igienică - 8", "Spray insecte - 7", "Busolă - 5"],
  ["Crăciun - 35", "Zile de naștere - 32", "Valentine’s day - 18", "Mother’s / Father’s day - 8", "Aniversări - 5"],
  ["Înot - 34", "Surf - 29", "Cu barca, caiac - 14", "Jet Ski - 11", "Diving - 9", "Polo - 3"],
  ["Cuptor / Aragaz - 30", "Placă / Uscător de păr / Fier de călcat - 23", "Televizor - 21", "Căldură - 16", "Lumină - 10"],
  ["Educație - 28", "Job Title - 24", "Durata unui job - 18", "Skills - 15", "Realizări / Proiecte - 11"],
  ["Alune - 29", "Lactate - 27", "Praf / Polen - 19", "Păr de animale - 14", "Pește - 11"],
  ["Casă - 31", "Mașină - 25", "Vacanță - 19", "Telefon - 9", "Calculator - 8", "Inel de logodnă - 7"],
  ["Usturoi - 27", "Ceapă - 25", "Cârnați / Coaste - 19", "Fasole - 15", "Picant - 14"],
  ["Înmormântare - 39", "Când te oprește poliția - 23", "Facultate / Examen - 25", "În sala de judecată - 13"],
  ["Coafor - 30", "Mall - 23", "Spa - 17", "Biserică - 13", "Cafenea - 11", "Plajă - 6"],
  ["Telefon - 26", "Portofel / Poșetă - 25", "Geacă - 21", "Ghiozdan - 16", "Umbrelă - 12"],
  ["Săpun / Deodorant - 28", "Periuță de dinți - 22", "Abonament la sală - 21", "Second Hand - 15", "Carte de dezvoltare personală - 14"],
  ["Roșu - 41", "Neagră - 24", "Verde - 17", "Violet / Mov - 13", "Maro - 5"],
  ["Câinele - 35", "Cocoș - 24", "Pisica - 16", "Porc - 13", "Vacă - 12"],
  ["Mă dau cu sania - 28", "Om de zăpadă - 23", "Mă bat cu bulgări - 19", "Schiez - 14", "Patinez - 10", "Beau vin fiert - 6"],
  ["Iepure - 57", "Broască - 21", "Greiere - 15", "Cangur - 7"],
  ["Te speli pe dinți - 35", "Faci cafea / fumezi țigară - 30", "Telefon - 20", "Duș - 10", "Patul - 5"],
  ["Cizmă - 27", "Broască - 24", "Alge - 20", "Sticlă - 17", "Stoică - 12"],
  ["Vecina - 30", "Acoperișul - 24", "Florile - 19", "Gardul - 16", "Curtea - 11"],
  ["Minge - 40", "Roată - 25", "Pahar / Cană - 16", "Soarele - 11", "Nasture - 8"],
  ["Stop - 32", "Interzis - 26", "Prioritate - 20", "Sens unic - 14", "Trecere pietoni - 8"],
  ["Piersică / Caisă - 31", "Cireașă - 24", "Prună - 20", "Vișină - 15", "Avocado - 10"],
  ["Berbec - 28", "Leu - 24", "Scorpion - 19", "Taur - 16", "Pești - 13"],
  ["Harry Potter - 37", "Merlin - 26", "Gandalf - 15", "Doctor Strange - 13", "Vrăjitorul din Oz - 9"],
  ["TV - 33", "Frigider - 25", "Computer - 20", "Lampă - 12", "Telefon - 10"],
  ["Urs - 27", "Leu - 23", "Girafă - 20", "Elefant - 17", "Tigru - 13"],
  ["Fotbal - 40", "Baschet - 25", "Baseball - 20", "Handbal - 10", "Volei - 5"],
  ["Cântăreț - 36", "Actor - 34", "Atlet / Sport - 15", "Scriitor - 10", "Prezentator de știri - 5"],
  ["Superman - 31", "Batman - 24", "Spiderman - 19", "Ironman - 15", "Captain America - 11"],
  ["Roșu - 31", "Negru - 25", "Alb - 17", "Roz - 12", "Albastru - 10", "Verde - 5"],
  ["Card de credit-34", "Bani cash-23", "Act de identitate-18", "Prezervativ-15", "Cupoane-10"],
  ["Plangi-29", "Blochezi fostul/fosta-25", "Cauti pe altcineva-21", "Ii arunci lucrurile-15", "Mananci ciocolata etc-10"],
  ["Scaun-31", "Canapea-26", "Pe jos-19", "Pe bordura-16", "Pe cineva/in poala-8",],
  ["TikTok-29", "Instagram-24", "Facebook-20", "Snapchat-16", "Twitter-11"],
  ["Ceas-31", "Bratara-25", "Tatuaj-20", "Inel-13", "Oja-11"],
  ["Nike-35", "Adidas-27", "Vans-17", "Puma-14", "Converse-7"],
  ["Trandafir-28", "Crin-24", "Margareta-20", "Ghiocel-16", "Lalea-12"],
  ["Carne-41", "Cartofi-23", "Prajitura/Tort-17", "Legume-12", "Tava-7"],
  ["Tei-25", "Salcam-20", "Salcia-19", "Nucul-13", "Plop-10", "Ciresul-8", "Marul-5"],
  ["Costum de baie-36", "Camasa-20", "Palarie-15", "Pantaloni scurti-14", "Tricou-9", "Slapi-6"],
  ["Q-40", "B-26", "D-20", "C-9", "G-3", "S-2"],
  ["Piatra-32", "Fierul-24", "Caramida-16", "Asfaltul-11", "Gheata-9", "Alcoolul-8"],
  ["Drum-31", "Pietoni-27", "Trafic-19", "Alte masini-11", "Gropi-8", "Semafor-4"],
  ["Suculenta-43", "In sange-25", "Frageda-18", "Arsa-8", "Cu sos-6"],
  ["In telefon-28", "Cu creionul-24", "Rujul-20", "Creta-16", "Carioca-7", "Capul-5"],
  ["Cai-26", "Cerbi-25", "Caini-21", "Lupi-13", "Magari-9", "Ursi polari-6"],
  ["Soarele-36", "Stelele-21", "Diamantele-18", "Luna-14", "Aur-8", "Glob disco-3"],
  ["Flori-34", "Inima-26", "Inel-20", "Ciocolata-11", "Sarutari-6", "Promisiuni-3"],
  ["Dance-36", "Pop-24", "Latino-15", "Manele-12", "Techno-11", "Rock-2"],
  ["La munca-41", "Coada-21", "Mijloace de transport in comun-17", "Concert-14", "Biserica-7"]
];

const mapQuestions = (qs: string[], as: string[][]) => {
  return qs
  .map((question, index) => ({
    id: index,
    revealed: false,
    text: question,
    answers: as[index].flatMap((answer) => {
      if (!answer.trim()) return [];
      
      const regex = /^(.+)-\s*(\d+)\s*$/;

      const result = regex.exec(answer);

      if (result === null) throw new Error(`String ${answer} is not valid`);

      return [{
        text: result[1],
        points: +result[2],
        revealed: false,
      }];
    }),
  }));
}

const questionData = mapQuestions(questions, answers);

const flashQuestionData = mapQuestions(lightningQuestions, lightningAnswers);

const applicationData: Omit<DB, 'questions' | 'flashQuestions'> = {
  currentQuestion: 0,
  pointsMultiplier: PointsMode.Single,
  team1: {
    name: 'Team 1',
    points: 0,
  },
  team2: {
    name: 'Team 2',
    points: 0,
  },
  flashRoundTeam: 1,
  flash: {
    answers1: [
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
    ],
    answers2: [
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
      {
        answer: '',
        points: 0,
      },
    ],
  }
}

const finalSeedingData: DB = {
  ...applicationData,
  questions: questionData,
  flashQuestions: flashQuestionData,
}

set(ref(db, '/'), finalSeedingData).then(() => {
  console.log('Seeding done.');
  exit();
});
