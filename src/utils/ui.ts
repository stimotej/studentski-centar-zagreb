/**
 * Static interface text, HR/EN.
 *
 * This is for the site's own chrome — navigation, buttons, headings, empty
 * states. Editable *content* does not belong here: that lives in WordPress and
 * is read through `localized()` in ./i18n.
 *
 * Croatian is the source of truth. A missing English entry falls back to
 * Croatian rather than showing a key, so a half-finished translation degrades
 * into a mixed page instead of a broken one — the same rule content follows.
 *
 *   const t = useUI();
 *   <button>{t("common.readMore")}</button>
 */

import { useRouter } from "next/router";
import { isEnglish } from "./i18n";

/** Croatian is the complete set; English may lag behind it. */
export const HR = {
  // ---- navigation ----------------------------------------------------
  "nav.main": "Glavna navigacija",
  "nav.home": "Početna",
  "nav.obavijesti": "Obavijesti",
  "nav.studentServis": "Student servis",
  "nav.poslovi": "Poslovi",
  "nav.prehrana": "Prehrana",
  "nav.smjestaj": "Smještaj",
  "nav.sport": "Sport",
  "nav.kultura": "Kultura",
  "nav.turizam": "Turizam",
  "nav.catering": "Catering",
  "nav.najamProstora": "Najam prostora",
  "nav.mediji": "Mediji",
  "nav.teatarTd": "Teatar &TD",
  "nav.francuskiPaviljon": "Francuski paviljon",
  "nav.prijava": "Prijava",
  "nav.prijavaStudent": "Prijava student",
  "nav.prijavaPoslodavac": "Prijava poslodavac",
  "nav.zaposlenici": "Zaposlenici",
  "nav.accessibility": "Pristupačnost",

  // ---- common UI -----------------------------------------------------
  "common.readMore": "Saznaj više",
  "common.faq": "Često postavljana pitanja",
  "common.questionsAndHelp": "Pitanja i pomoć",
  "common.contact": "Kontakt",
  "common.workingHours": "Radno vrijeme blagajni",
  "common.location": "Lokacija",
  "common.relatedContent": "Popratni sadržaj",
  "common.documents": "Dokumenti",
  "common.gallery": "Galerija",

  // ---- empty states --------------------------------------------------
  "empty.obavijesti": "Nema obavijesti za prikaz",
  "empty.faq": "Nema pitanja za prikaz",
  "empty.notFound": "Nije pronađena obavijest",

  // ---- organisation --------------------------------------------------
  "org.name": "Studentski centar u Zagrebu",
  "org.university": "Sveučilište u Zagrebu",

  "smjestaj.pageTitle": "Smještaj",
  "smjestaj.dorms": "Studentski domovi",
  "smjestaj.dormsUpper": "STUDENTSKI DOMOVI",
  "smjestaj.stay": "Boravak u studentskome domu",
  "smjestaj.criteria":
    "Poštovani budući stanari studentskih domova, za boravak u studentskome domu potrebno je ispuniti slijedeći kriteriji:",
  "smjestaj.applyTender": "Prijava za natječaj",
  "smjestaj.applyVia":
    "Za prijavu na natječaj za studentski smještaj prijavite se putem linka  nastavku.",
  "smjestaj.counselling": "SAVJETOVALIŠTE",
  "smjestaj.intro":
    "SC Zagreb nudi smještaj u 4 studentska doma na atraktivnim lokacijama u gradu Zagrebu.",
  "smjestaj.newsTitle": "Obavijesti - studentski smještaj",
  "cards.contact": "Kontakt",
  "cards.settlements": "Naselja",
  "cards.tender": "Natječaj",
  "cards.prehranaUpper": "PREHRANA",
  "cards.smjestajUpper": "SMJEŠTAJ",
  "cards.studentServisUpper": "STUDENT SERVIS",
  "cards.jobs": "Poslovi",
  "cards.becomeMember": "Postani član",
  "cards.signIn": "Prijava",
  "cards.restaurants": "Restorani",
  "kultura.pageTitle": "Kultura",
  "kultura.today": "Danas",
  "kultura.goToList": "Idi na popis",
  "kultura.eventCalendar": "Kalendar evenata",
  "kultura.noEventsToday": "Nema evenata na današnji dan",
  "kultura.coursesWorkshops": "Tečajevi i radionice",
  "common.readMoreUpper": "SAZNAJ VIŠE",
  "sport.yearRound": "CJELOGODIŠNJE",
  "sport.educational": "EDUKACIJSKE AKTIVNOSTI",
  "sport.information": "INFORMACIJE",
  "sport.competitive": "NATJECATELJSKE AKTIVNOSTI",
  "sport.occasional": "POVREMENE",
  "sport.recreational": "REKREACIJSKE AKTIVNOSTI",
  "sport.photos": "SLIKE",
  "sport.sporting": "SPORTSKE",
  "sport.professional": "STRUČNE",
  "sport.social": "ZABAVNE AKTIVNOSTI",
  "prehrana.dailyMenu": "Dnevni meni",
  "prehrana.breakfast": "Doručak",
  "prehrana.lunch": "Ručak",
  "prehrana.dinner": "Večera",
  "prehrana.choice": "Izbor",
  "prehrana.sides": "Prilozi",
  "prehrana.menu": "Menu",
  "prehrana.vegetarian": "Vegeterijanski menu",
  "empty.menus": "Nema menija za prikaz",
  "home.information": "Informacije",
  "home.calendar": "Kalendar",

  "a11y.title": "Pristupačnost",
  "a11y.clear": "Obriši odabir",
  "a11y.underlineLinks": "Podcrtaj poveznice",
  "a11y.largeText": "Povećani tekst",
  "a11y.grayscale": "Sivi tonovi",
  "a11y.lightBackground": "Svijetla pozadina",
  "a11y.highContrast": "Visoki kontrast",
  "a11y.readableFont": "Čitljiv font",
  "membership.title": "Članstvo u student servisu",
  "membership.photos": "Dvije male fotografije",
  "membership.idCard": "Osobna iskaznica",
  "membership.bankAccount":
    "Osobni žiro ili tekući račun u banci na teritoriju Republike Hrvatske",
  "membership.diploma":
    "Preslika svjedodžbe završnog razreda srednje škole ili maturalne svjedodžbe",
  "membership.status": "Status studenta/ice za tekuću akademsku godinu",
  "membership.xica": "Studentska iskaznica - X-ica",
  "membership.employers": "Članstvo poslodavaca u Student servis",
  "membership.employersIntro":
    "Jednostavan sustav prijave ovih poslodavaca u bazu Studentskog centra u Zagrebu.",
  "sport.pageTitle": "Sport",
  "sport.pageTitleUpper": "SPORT",
  "sport.educationalTc": "Edukacijske aktivnosti",
  "sport.competitiveTc": "Natjecateljske aktivnosti",
  "sport.recreationalTc": "Rekreacijske aktivnosti",
  "sport.fun": "Zabava",
  "prehrana.pageTitle": "Prehrana",
  "prehrana.restaurants": "Restorani",
  "prehrana.restaurantsTitle": "Restorani Studentskog Centra u Zagrebu",
  "prehrana.studentLogin": "Student - prijava u issp.srce.hr",
  "jobs.pageTitle": "Svi poslovi",
  "jobs.forms": "Obrasci",
  "jobs.search": "Pretraži poslove...",
  "jobs.type": "Vrsta posla",
  "jobs.searchUpper": "PRETRAŽI POSLOVE",
  "jobs.metaTitle":
    "Ponuda poslova; Studentski centar u Zagrebu; Sveučilište u Zagrebu",
  "empty.jobs": "Nema poslova za prikaz",
  "ss.pageTitle": "Student servis",
  "ss.signupMembershipEmployers": "PRIJAVA ČLANSTVO POSLODAVCI",
  "obavijesti.pageTitle": "Obavijesti",
  "obavijesti.all": "Sve obavijesti",
  "obavijesti.categories": "Kategorije",
  "obavijesti.search": "Pretraži obavijesti...",
  "obavijesti.metaTitle": "Obavijesti Studentskog Centra u Zagrebu",
  "dorm.photos": "Fotografije",
  "dorm.notFound": "Nije pronađen studentski dom",
  "empty.photos": "Nema fotografija za prikaz",

  "nutrition.importance": "Važnost kvalitetne prehrane",
  "nutrition.varied": "Raznovrsna prehrana",
  "nutrition.vitamins": "Vitamini i minerali",
  "nutrition.activity": "Tjelesna aktivnost",
  "nutrition.weight": "Normalna tjelesna masa",
  "sign.title": "Digitalno potpisivanje",
  "sign.contracts": "Digitalno potpisivanje ugovora",
  "sign.extract":
    "Izvadite ugovor za poslodavca preko baze podataka aktivnih poslodavaca Studentskog centra u Zagrebu.",
  "sign.mobile":
    "Potpišite ugovore digitalno putem mobitela kroz sigurnosni certifikat 4. razine. Brzo, jednostavno i sigurno.",
  "sign.sync": "Sinkronizacija sa bazom podataka",
  "help.address": "ADRESA",
  "help.email": "EMAIL ADRESA",
  "help.phone": "TELEFON",
  "help.directorsOffice": "URED RAVNATELJA",
  "contract.number": "BROJ UGOVORA",
  "contract.payments": "ISPLATE NAKNADA",
  "contract.taxFree": "NEOPOREZIVI PRIMITAK",
  "contract.signAfterEmployer": "POTPIS UGOVORA NAKON POSLODAVCA",
  "login.employer": "POSLODAVAC",
  "login.student": "STUDENT",
  "login.employerSignIn": "PRIJAVA POSLODAVAC",
  "login.studentSignIn": "PRIJAVA STUDENT",
  "nav.goHome": "Idi na početnu stranicu",
  "nav.openMenu": "Otvori navigaciju",
  "ads.close": "Zatvori oglas",
  "rent.title": "Plaćanje stanarine on-line putem",
  "rent.accessProfile": "Pristupiti osobnom profilu putem linka:",
  "rent.afterLogin": "Nakon prijave u osobni profil, kliknuti na „",
  "rent.charges": "Naplata smještaja",
  "login.pageTitle": "Prijava",
  "login.studentPage": "Prijava studenata - Studentski centar u Zagrebu",
  "login.studentIntro":
    "Prijava studenata članova Student servisa za korištenje usluga",
  "login.employerPage": "Prijava poslodavac",
  "login.employerPageTitle": "Prijava poslodavac - Studentski centar u Zagrebu",
  "error.notFound": "Stranica nije pronađena",
  "error.notFoundMeta": "Stranica nije pronađena; Studentski centar u Zagrebu;",
  "error.server": "Došlo je do greške",
  "error.serverMeta": "Došlo je do greške; Studentski centar u Zagrebu;",
  "employer.fee": "Naknada posredniku",
  "employer.standard": "Studentski standard",
  "employer.pension": "Zdravstveno i mirovinski stup",
  "empty.eventNotFound": "Nije pronađen event",
  "empty.jobNotFound": "Nije pronađen posao",
  "empty.restaurantNotFound": "Nije pronađen restoran",
  "empty.courseNotFound": "Nije pronađen tečaj/radionica",
  "common.allergens": "Alergeni",
  "common.close": "Zatvori",
  "common.events": "Eventi",
  "membership.join": "Učlanjivanje",
  "membership.inPerson": "Učlanit se može samo osobno.",
  "kultura.metaTitle":
    "Kultura; Studentski centar u Zagrebu; Sveučilište u Zagrebu",
  "decor.backgroundShape": "Pozadinski oblik",
  "decor.scIcon": "Studentski centar ikona",
  "decor.ssIcon": "Student servis ikona",
  "allergen.gluten": "žitarice koje sadrže gluten i proizvodi od tih žitarica",
  "allergen.crustaceans": "rakovi i proizvodi od rakova",
  "allergen.eggs": "jaja i proizvodi od jaja",
  "allergen.fish": "riba i riblji proizvodi",
  "allergen.peanuts": "kikiriki i proizvodi od kikirikija",
  "allergen.soy": "zrna soje i proizvodi od soje",
  "allergen.milk": "mlijeko i mliječni proizvodi (uključujući laktozu)",
  "allergen.nuts": "orašasto voće i njegovi proizvodi",
  "allergen.celery": "celer i njegovi proizvodi",
  "allergen.mustard": "gorušica i proizvodi od gorušice",
  "allergen.sesame": "sjeme sezama i proizvodi od sjemena sezama",
  "allergen.sulphites": "sumporni dioksid i sulfiti",
  "allergen.lupin": "lupina i proizvodi od lupine",
  "allergen.molluscs": "mekušci i proizvodi od mekušaca",
  "allergen.mayContain": "može sadržavati navedeni alergen",
  "food.prepared":
    "Sva jela pripremljena su od profesionalnih kuhara sa svježim i kvalitetnim sastojcima.",
  "food.quality":
    "Za kvalitetniju pripremu jela koriste se kvalitetni sastojci sa fokusom da se pri kuhanju maksimalno iskoriste nutritivne vrijednosti namirnica. Detaljan opis alergena potražite na linku u nastavku.",
  "job.otherFees": "Druge naknade",
  "job.howToApply": "Način za prijavu",
  "job.description": "Opis posla",
  "job.otherNotes": "Ostale napomene i uvjeti",
  "job.duration": "Očekivano trajanje posla",
  "job.positions": "Potreban broj izvođača",
  "job.requiredSkills": "Potrebna znanja",
  "job.back": "Povratak",
  "job.startDate": "Početak rada",
  "job.desirableSkills": "Poželjne vještine",
  "job.hours": "Radno vrijeme",
  "job.rate": "Satnica",
  "job.whyYou": "Zašto tražimo tebe?",
  "job.applicationsUntil": "Prijave traju do",
  "sport.archive": "Arhiva",
  "sport.yearRoundTc": "Cjelogodišnje",
  "sport.occasionalTc": "Povremene",
  "sport.sportingTc": "Sportske",
  "sport.professionalTc": "Stručne",
  "sport.recreationIntro":
    "U ponudi rekreativnih aktivnosti koje su dostupne svim studentima Sveučilišta u Zagrebu, najviše je zanimanja za programe: fitness, aerobik, zumba fitness, funkcionalno-kondicijski trening.",
  "common.seeAll": "Vidi sve",
  "common.goToNews": "Idi na obavijesti",
  "empty.events": "Nema evenata za prikaz",
  "rent.intro":
    "Omogućeno je plaćanje smještaja u studentskim domovima on-line putem tokom cijele akademke godine. Student na ovaj način može platiti sva dosadašnja dugovanja, kao i stanarinu za mjesec unaprijed.",
  "rent.rightSide":
    "Sa desne strane vidljiva je opcija „Plaćanje odabranih usluga“ na čiji se klik otvara obrazac za plaćanje stanarine (sukladno odabranim opcijama).",
  "rent.cardDetails":
    "U obrazac potrebno je unijeti broj kartice, datum isteka i kontrolni broj. Ako su ti podaci ispravno upisani, transakciju je potrebno potvrditi nekim oblikom tokena (čitač kartice, mtoken – kao i na svakom web plaćanju).",
  "rent.receipt":
    "Ukoliko je transakcija uspješna, student može dohvatiti račun u PDF obliku.",
  "rent.note":
    "Napomena: nije moguće platiti stanarinu za mjesec unaprijed ukoliko nisu podmirena sva ranije pristigla dugovanja.",
  "ss.contractTitle": "Ugovaranje posla",
  "ss.regulation": "PRAVILNIK O STUDENTSKOM ZAPOŠLJAVANJU",
  "ss.employerDuty":
    "Poslodavac je dužan popuniti obrazac ugovora te ga ovjeriti najkasnije u roku od 15 dana nakon obavljenog posla.",
  "ss.account": "osobni žiro ili tekući račun",
  "ss.signedInAdvance": "potpisuju unaprijed",
  "ss.duringYear": "tijekom godine",
  "ss.digitalSearch":
    "Digitalno pretraživanje tržišta rada i studentskih poslova.",
  "ss.fullPayout": "Isplata punog iznosa zarade studentu, bez naknade.",
  "ss.marketProcessing":
    "Obrada tržišta studentskog rada i posredovanja u pronalasku posla.",
  "ss.billing":
    "Obračun i naplata studentske zarade od poslodavca u korist studenta.",
  "ss.records":
    "Vođenje očevidnika članova redovnih studenata i obavljenih posredovanja.",
  "ss.membershipBoth": "Članstvo studenta i poslodavaca u Student servisu.",
  "membership.upper": "ČLANSTVO U STUDENT SERVISU",
  "membership.enables":
    "Omogućuje obavljanje studentskih poslova, izdavanje ugovora o djelu poslodavcima i isplatu naknada na žiro račun studenta. Član student servisa može biti student i maturant ali najdulje 3 mjeseca od završetka srednjoškolskog obrazovanja.",
  "membership.conditions": "Uvjeti za članstvo i prijava.",
  "membership.beforeJoining":
    "Prije učlanjenja potrebno je provjeriti imate li osnovno zdravstveno osiguranje.",
  "prehrana.restaurantsIntro":
    "Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju.",
  "prehrana.rightsData": "Podaci o studentskim pravima i akademskim karticama",
  "prehrana.systemLogin": "Prijava u sustav",
  "prehrana.students": "STUDENTI",
  "footer.builtBy": "Izradio",
  "wallet.title": "Digitalni studentski novčanik",
  "wallet.tagline": "PLATI BRŽE, UŽIVAJ DUŽE.",
  "help.contactUs": "KONTAKTIRAJ NAS",
  "td.tickets":
    "Ulaznice za predstave Teatra &TD, koncerte i određene filmske projekcije u SC-u, osim na našim blagajnama možete kupiti i putem online platforme za prodaju ulaznica Ulaznice.hr te na njihovim prodajnim mjestima.",
  "nutrition.body":
    "Ljudsko je tijelo sofisticiran mehanizam za čiji je rad i normalno funkcioniranje prehrana i sastojni prehrane",
  "nutrition.digestion":
    "Organizam i probava svake osobe se dovoljno razlikuju da isti režim prehrane može rezultirati sa drugačijim ishodom",
  "nutrition.students":
    "Važnost kvalitetne i razvnovrsne prehrane za studente i uspjeh.",
  "login.employerProfile":
    "Korisnički profil poslodavca omogućuje objavu poslova, upravljanje postojećim poslovima, pregled prijavljenih studenata i izdavanje ugovora.",
  "login.studentProfile":
    "Korisnički profil studenta omogućuje uređivanje profila studenta, pretraživanje poslova, izdavanje ugovora, status isplata i pregled zarade.",
  "ss.intermediary": "POSREDNIK U STUDENTSKOM ZAPOŠLJAVANJU",
  "smjestaj.tender2022": "Natječaj za smještaj 2022/2023",
  "smjestaj.personalRight":
    "Pravo na smještaj u studentskom domu je osobno pravo studenta i nije prenosivo na drugu osobu.",
  "restaurant.offerIncludes": "Ponuda uključuje:",
  "restaurant.openingHours": "RADNO VRIJEME",
  "login.goToSignIn": "Idi na prijavu",
  "login.aaiSystem": "Prijava u Web sustav s AAI korisničkim računom",
  "sign.instant": "Izvadite i potpišite ugovor u trenu putem mobitela.",
  "sign.stored":
    "Svi ugovori su pohranjeni i zaštićeni vremenskim žigom. U bilo kojem trenutku pogledajte sve ugovore i statuse.",
  "employer.contribution":
    "DAVANJA POSLODAVCA STUDENT SERVISU IZNOSE 18,00% NA NETO ZARADU STUDENATA",
  "employer.howUsed": "Kako se koristi naknada od 18,00%?",
  "error.goHome": "Idi na početnu",
  "empty.information": "Nema informacija za prikaz",
  "common.loadMore": "Učitaj više",
  "ss.intro":
    "Student servis studentskog centar Sveučilišta u Zagrebu posreduje u pronalasku studentskih poslova između studenata i poslodavaca.",
  "empty.newEvents": "Nema novih evenata za prikaz",
  "empty.courses": "Nema tečajeva/radionica za prikaz.",
  "help.postalAddress":
    "Studentski centar Zagreb, Savska cesta 25, 10000, Zagreb, Hrvatska",
  "nav.menuDescription":
    "Izbornik glavne navigacije stranice. Koristite tipkovnicu ili miš za odabir željene stranice.",
  "common.underConstruction": "Stranica u izradi",
  "smjestaj.tenderCard": "Natječaj za studentski smještaj",
  "ss.oldSite": "Stara web stranica",
  "ss.legalRole":
    "Student servis obavlja ulogu propisanu Zakonom o obavljanju studentski poslova (NN 96/18, 16/20) Republike Hrvatske i u tome zastupa studente u potraživanju zarade za obavljeni posao prema poslodavcima. Pri zapošljavanju studenata zaključuje se ugovor o djelu koji Student servis, kao posrednik, izdaje poslodavcima.",
  "login.studentProfileFull":
    "Korisnički profil studenta omogućuje uređivanje profila studenta, pretraživanje poslova, izdavanje ugovora, statuse isplata, ažuriranje podataka i korisničku podršku.",
  "login.employerProfileFull":
    "Korisnički profil poslodavca omogućuje objavu poslova, upravljanje postojećim poslovima, pregled prijavljenih kandidata, pregled studentskih ugovora i računa.",
  "ss.introFull":
    "Student servis studentskog centar Sveučilišta u Zagrebu posreduje u pronalasku studentskih poslova između studenata i poslodavaca. Pronađite najbolje poslove na oglasniku studentskih poslova.",
  "contract.payoutsFull":
    "Isplate se obavljaju nakon što poslodavac - naručitelj posla plati račun Studentskom centru u Zagrebu. Isplate se vrše na <strong>osobni žiro ili tekući račun</strong> studente otvorenog u bilo kojoj banci na teritoriju Republike Hrvatske.",
  "contract.numberFull":
    "Student, član Student servisa može podizati <strong>tijekom godine</strong> neograničen broj ugovora, ukoliko prethodno podignute redovite vraća u Student servis. Student/ica može mjesečno preuzeti tri ugovora za istog poslodavca pod uvjetom da prethodno podignute redovito vraća u Student servis.",
  "contract.taxFreeFull":
    "Uz isplatu redovite ugovorene plaće, poslodavci imaju mogućnost dodatnog nagrađivanja radnika kroz isplatu neoporezivih primitaka, nagrada, naknada i potpora.",
  "sign.storedFull":
    "Svi ugovori su pohranjeni i zaštićeni vremenskim žigom. U bilo kojem trenutku pogledajte sve ugovore i statuse ugovora.",
  "nutrition.bodyFull":
    "Ljudsko je tijelo sofisticiran mehanizam za čiji je rad i normalno funkcioniranje prehrana i sastojni prehrane vrlo bitna. Za bolje tjelesne funkcije, rast i akademski uspjeh kvalitetna prehrana je jako bitna a to je ono što Studentski centar kroz svoje restorane pruža studentima.",
  "nutrition.digestionFull":
    "Organizam i probava svake osobe se dovoljno razlikuju da isti režim prehrane može rezultirati sa drugačijim ishodima. Zato je bitno istražiti i testirati vlastiti organizam te prilagoditi režim prehrane tim potrebama.",
  "smjestaj.personalRightFull":
    "Pravo na smještaj u studentskom domu je osobno pravo studenta i nije prenosivo na drugu osobu. Studentski centar u Zagrebu će odmah po useljenju studenata u studentske domove obavljati intenzivne kontrole ostvarenog prava i sukladno Pravilniku o domskom redu i uvjetima boravka studenata u studentskim domovima sankcionirati prekršitelje.",
  "smjestaj.counsellingFull":
    "U sklopu studentskog doma „Cvjetno naselje“ možete koristiti usluge BESPLATNOG savjetovanja. Savjetovanje će se održavati prema unaprijed dogovorenim terminima i dostupno je svim studentima korisnicima usluga Studentskog centra u Zagrebu, kao i radnicima Studentskog centra u Zagrebu.",
  "rent.errorContact":
    "Ako se na formi za plaćanje prikaže da je transakcija uspješna, a na ekranu za rezervaciju smještaja bude pogreška kako transakcija nije uspjela - došlo je do pogreške kod kreiranja računa. Student bi u tom slučaju trebao kontaktirati Poslovnicu SC-a putem e-maila (poslovnica@sczg.hr) te navesti svoje osobne podatke (ime, prezime, OIB), broj rezervacije i kratak opis što je pošlo krivo (poželjna je preslika ekrana), kako bi se transakcija ručno stornirala.",
  "kultura.coursesIntro":
    "Studentski centar u Zagrebu nudi širok izbor tečajeva i radionica za sve zainteresirane. Bez obzira na vaše iskustvo ili interese, imamo nešto za svakoga. Pridružite nam se i istražite što sve možete naučiti!",
  "contract.signWarning":
    "Student/ica potpisuje ugovor nakon što poslodavac uredno popuni i uvjeri ugovor, nikako prije. Upozoravamo studente da nikome, nikad ništa ne <strong>potpisuju unaprijed</strong>.",
  "fee.placement": "Posredovanje u studentskom zapošljavanju",
  "fee.collection": "Osiguranje naplate od poslodavaca",
  "fee.support": "Korisnička podrška studentima",
  "fee.pension": "5% doprinosa za Mirovinsko osiguranje",
  "fee.health":
    "0,5% doprinos za Zdravstveno osiguranje za slučaj ozljede na radu i profesionalne bolesti",
  "fee.standard": "Poboljšanje studentskog standarda",
  "fee.projects": "Financiranje studentskih projekata",
  "fee.scholarships": "Stipendiranje studenata",
  "fee.perContract": "/ po ugovoru",
  "sign.headingUpper": "DIGITALNO POTPISIVANJE UGOVORA",
  "login.eContracts":
    "Izdavanje e-ugovora, pregled ugovora, ispis potvrda, zarade",
  "membership.results":
    "Ispis moji Rezultati na <a href='https://www.postani-student.hr/'>www.postani-student.hr</a>",
  "login.noAaiAccount":
    "Ukoliko nemate AAI korisnički račun, prijaviti se možete ovdje",
  "home.metaTitle":
    "Studentski Centar u Zagrebu, Sveučilište u Zagrebu; Kultura, Prehrana, Smještaj, Student servis, Sport, Teatar &TD",
  "rent.selectWhat":
    "U srednjem dijelu ekrana potrebno je odabrati što se plaća, na način da se odabir potvrdi klikom na praznu kučicu.",
} as const;

export type UIKey = keyof typeof HR;

/** Only the keys that have been translated need to appear here. */
export const EN: Partial<Record<UIKey, string>> = {
  "nav.main": "Main navigation",
  "nav.home": "Home",
  "nav.obavijesti": "News",
  "nav.studentServis": "Student service",
  "nav.poslovi": "Jobs",
  "nav.prehrana": "Dining",
  "nav.smjestaj": "Accommodation",
  "nav.sport": "Sport",
  "nav.kultura": "Culture",
  "nav.turizam": "Tourism",
  "nav.catering": "Catering",
  "nav.najamProstora": "Venue hire",
  "nav.mediji": "Media",
  // Proper names stay as they are.
  "nav.teatarTd": "Teatar &TD",
  "nav.francuskiPaviljon": "Francuski paviljon",
  "nav.prijava": "Sign in",
  "nav.prijavaStudent": "Student sign-in",
  "nav.prijavaPoslodavac": "Employer sign-in",
  "nav.zaposlenici": "Staff",
  "nav.accessibility": "Accessibility",

  "common.readMore": "Read more",
  "common.faq": "Frequently asked questions",
  "common.questionsAndHelp": "Questions and help",
  "common.contact": "Contact",
  "common.workingHours": "Cashier opening hours",
  "common.location": "Location",
  "common.relatedContent": "Facilities",
  "common.documents": "Documents",
  "common.gallery": "Gallery",

  "empty.obavijesti": "No news to show",
  "empty.faq": "No questions to show",
  "empty.notFound": "Notice not found",

  "org.name": "University of Zagreb Student Centre",
  "org.university": "University of Zagreb",

  "smjestaj.pageTitle": "Accommodation",
  "smjestaj.dorms": "Student dormitories",
  "smjestaj.dormsUpper": "STUDENT DORMITORIES",
  "smjestaj.stay": "Living in a student dormitory",
  "smjestaj.criteria":
    "Dear future residents, the following criteria must be met in order to live in a student dormitory:",
  "smjestaj.applyTender": "Apply to the call",
  "smjestaj.applyVia":
    "To apply for student accommodation, use the link below.",
  "smjestaj.counselling": "COUNSELLING",
  "smjestaj.intro":
    "The University of Zagreb Student Centre offers accommodation in four student dormitories in attractive locations across Zagreb.",
  "smjestaj.newsTitle": "News — student accommodation",
  "cards.contact": "Contact",
  "cards.settlements": "Villages",
  "cards.tender": "Call for applications",
  "cards.prehranaUpper": "DINING",
  "cards.smjestajUpper": "ACCOMMODATION",
  "cards.studentServisUpper": "STUDENT SERVICE",
  "cards.jobs": "Jobs",
  "cards.becomeMember": "Become a member",
  "cards.signIn": "Sign in",
  "cards.restaurants": "Restaurants",
  "kultura.pageTitle": "Culture",
  "kultura.today": "Today",
  "kultura.goToList": "Go to the list",
  "kultura.eventCalendar": "Event calendar",
  "kultura.noEventsToday": "No events today",
  "kultura.coursesWorkshops": "Courses and workshops",
  "common.readMoreUpper": "READ MORE",
  "sport.yearRound": "YEAR-ROUND",
  "sport.educational": "EDUCATIONAL ACTIVITIES",
  "sport.information": "INFORMATION",
  "sport.competitive": "COMPETITIVE ACTIVITIES",
  "sport.occasional": "OCCASIONAL",
  "sport.recreational": "RECREATIONAL ACTIVITIES",
  "sport.photos": "PHOTOS",
  "sport.sporting": "SPORTING",
  "sport.professional": "PROFESSIONAL",
  "sport.social": "SOCIAL ACTIVITIES",
  "prehrana.dailyMenu": "Daily menu",
  "prehrana.breakfast": "Breakfast",
  "prehrana.lunch": "Lunch",
  "prehrana.dinner": "Dinner",
  "prehrana.choice": "Choice",
  "prehrana.sides": "Sides",
  "prehrana.menu": "Menu",
  "prehrana.vegetarian": "Vegetarian menu",
  "empty.menus": "No menus to show",
  "home.information": "Information",
  "home.calendar": "Calendar",

  "a11y.title": "Accessibility",
  "a11y.clear": "Clear selection",
  "a11y.underlineLinks": "Underline links",
  "a11y.largeText": "Larger text",
  "a11y.grayscale": "Greyscale",
  "a11y.lightBackground": "Light background",
  "a11y.highContrast": "High contrast",
  "a11y.readableFont": "Readable font",
  "membership.title": "Student service membership",
  "membership.photos": "Two small photographs",
  "membership.idCard": "Identity card",
  "membership.bankAccount":
    "A personal giro or current account with a bank in the Republic of Croatia",
  "membership.diploma":
    "A copy of your final-year secondary school certificate or school-leaving certificate",
  "membership.status": "Student status for the current academic year",
  "membership.xica": "Student card — X-ica",
  "membership.employers": "Employer membership of the Student service",
  "membership.employersIntro":
    "A simple way for employers to register in the University of Zagreb Student Centre database.",
  "sport.pageTitle": "Sport",
  "sport.pageTitleUpper": "SPORT",
  "sport.educationalTc": "Educational activities",
  "sport.competitiveTc": "Competitive activities",
  "sport.recreationalTc": "Recreational activities",
  "sport.fun": "Entertainment",
  "prehrana.pageTitle": "Dining",
  "prehrana.restaurants": "Restaurants",
  "prehrana.restaurantsTitle":
    "Restaurants of the University of Zagreb Student Centre",
  "prehrana.studentLogin": "Students — sign in at issp.srce.hr",
  "jobs.pageTitle": "All jobs",
  "jobs.forms": "Forms",
  "jobs.search": "Search jobs…",
  "jobs.type": "Job type",
  "jobs.searchUpper": "SEARCH JOBS",
  "jobs.metaTitle": "Job listings; University of Zagreb Student Centre",
  "empty.jobs": "No jobs to show",
  "ss.pageTitle": "Student service",
  "ss.signupMembershipEmployers": "SIGN-IN · MEMBERSHIP · EMPLOYERS",
  "obavijesti.pageTitle": "News",
  "obavijesti.all": "All news",
  "obavijesti.categories": "Categories",
  "obavijesti.search": "Search news…",
  "obavijesti.metaTitle": "News from University of Zagreb Student Centre",
  "dorm.photos": "Photographs",
  "dorm.notFound": "Student dormitory not found",
  "empty.photos": "No photographs to show",

  "nutrition.importance": "Why good nutrition matters",
  "nutrition.varied": "A varied diet",
  "nutrition.vitamins": "Vitamins and minerals",
  "nutrition.activity": "Physical activity",
  "nutrition.weight": "A healthy body weight",
  "sign.title": "Digital signing",
  "sign.contracts": "Signing contracts digitally",
  "sign.extract":
    "Retrieve an employer contract from the University of Zagreb Student Centre database of active employers.",
  "sign.mobile":
    "Sign contracts digitally on your phone using a level-4 security certificate. Fast, simple and secure.",
  "sign.sync": "Database synchronisation",
  "help.address": "ADDRESS",
  "help.email": "EMAIL ADDRESS",
  "help.phone": "TELEPHONE",
  "help.directorsOffice": "DIRECTOR'S OFFICE",
  "contract.number": "CONTRACT NUMBER",
  "contract.payments": "FEE PAYMENTS",
  "contract.taxFree": "TAX-FREE INCOME",
  "contract.signAfterEmployer": "SIGN AFTER THE EMPLOYER",
  "login.employer": "EMPLOYER",
  "login.student": "STUDENT",
  "login.employerSignIn": "EMPLOYER SIGN-IN",
  "login.studentSignIn": "STUDENT SIGN-IN",
  "nav.goHome": "Go to the home page",
  "nav.openMenu": "Open navigation",
  "ads.close": "Close advert",
  "rent.title": "Paying rent online",
  "rent.accessProfile": "Sign in to your personal profile at:",
  "rent.afterLogin": "Once signed in, click “",
  "rent.charges": "Naplata smještaja",
  "login.pageTitle": "Sign in",
  "login.studentPage": "Student sign-in — University of Zagreb Student Centre",
  "login.studentIntro":
    "Sign-in for students who are members of the Student service",
  "login.employerPage": "Employer sign-in",
  "login.employerPageTitle":
    "Employer sign-in — University of Zagreb Student Centre",
  "error.notFound": "Page not found",
  "error.notFoundMeta": "Page not found; University of Zagreb Student Centre;",
  "error.server": "Something went wrong",
  "error.serverMeta":
    "Something went wrong; University of Zagreb Student Centre;",
  "employer.fee": "Agency fee",
  "employer.standard": "Student standard levy",
  "employer.pension": "Health and pension contributions",
  "empty.eventNotFound": "Event not found",
  "empty.jobNotFound": "Job not found",
  "empty.restaurantNotFound": "Restaurant not found",
  "empty.courseNotFound": "Course or workshop not found",
  "common.allergens": "Allergens",
  "common.close": "Close",
  "common.events": "Events",
  "membership.join": "Joining",
  "membership.inPerson": "You can only join in person.",
  "kultura.metaTitle": "Culture; University of Zagreb Student Centre",
  "decor.backgroundShape": "Background shape",
  "decor.scIcon": "University of Zagreb Student Centre icon",
  "decor.ssIcon": "Student service icon",
  "allergen.gluten": "cereals containing gluten and products thereof",
  "allergen.crustaceans": "crustaceans and products thereof",
  "allergen.eggs": "eggs and products thereof",
  "allergen.fish": "fish and fish products",
  "allergen.peanuts": "peanuts and products thereof",
  "allergen.soy": "soybeans and products thereof",
  "allergen.milk": "milk and dairy products (including lactose)",
  "allergen.nuts": "tree nuts and products thereof",
  "allergen.celery": "celery and products thereof",
  "allergen.mustard": "mustard and products thereof",
  "allergen.sesame": "sesame seeds and products thereof",
  "allergen.sulphites": "sulphur dioxide and sulphites",
  "allergen.lupin": "lupin and products thereof",
  "allergen.molluscs": "molluscs and products thereof",
  "allergen.mayContain": "may contain the listed allergen",
  "food.prepared":
    "All dishes are prepared by professional chefs using fresh, high-quality ingredients.",
  "food.quality":
    "Quality ingredients are used so that cooking preserves as much of their nutritional value as possible. A detailed description of allergens is available at the link below.",
  "job.otherFees": "Other allowances",
  "job.howToApply": "How to apply",
  "job.description": "Job description",
  "job.otherNotes": "Other notes and conditions",
  "job.duration": "Expected duration",
  "job.positions": "Positions available",
  "job.requiredSkills": "Required skills",
  "job.back": "Back",
  "job.startDate": "Start date",
  "job.desirableSkills": "Desirable skills",
  "job.hours": "Working hours",
  "job.rate": "Hourly rate",
  "job.whyYou": "Why we are looking for you",
  "job.applicationsUntil": "Applications open until",
  "sport.archive": "Archive",
  "sport.yearRoundTc": "Year-round",
  "sport.occasionalTc": "Occasional",
  "sport.sportingTc": "Sporting",
  "sport.professionalTc": "Professional",
  "sport.recreationIntro":
    "Among the recreational activities open to all University of Zagreb students, the most popular are fitness, aerobics, Zumba fitness and functional conditioning training.",
  "common.seeAll": "See all",
  "common.goToNews": "Go to news",
  "empty.events": "No events to show",
  "rent.intro":
    "Accommodation in student dormitories can be paid online throughout the academic year. This lets students settle any outstanding debts as well as pay rent one month in advance.",
  "rent.rightSide":
    "On the right you will see “Plaćanje odabranih usluga” (Pay for selected services); clicking it opens the rent payment form for the options you selected.",
  "rent.cardDetails":
    "Enter your card number, expiry date and security code. If those details are correct, confirm the transaction with a token of some kind (card reader, mToken — as with any online payment).",
  "rent.receipt":
    "If the transaction succeeds, you can download the receipt as a PDF.",
  "rent.note":
    "Please note: rent cannot be paid a month in advance unless all earlier debts have been settled.",
  "ss.contractTitle": "Arranging work",
  "ss.regulation": "STUDENT EMPLOYMENT REGULATIONS",
  "ss.employerDuty":
    "The employer must complete and certify the contract form within 15 days of the work being carried out.",
  "ss.account": "personal giro or current account",
  "ss.signedInAdvance": "signed in advance",
  "ss.duringYear": "during the year",
  "ss.digitalSearch":
    "Digital searching of the labour market and student jobs.",
  "ss.fullPayout":
    "The full amount earned is paid to the student, with no fee.",
  "ss.marketProcessing":
    "Analysis of the student labour market and job placement.",
  "ss.billing":
    "Calculating and collecting student earnings from employers on the student's behalf.",
  "ss.records":
    "Keeping records of full-time student members and placements made.",
  "ss.membershipBoth":
    "Membership of the Student service for students and employers.",
  "membership.upper": "STUDENT SERVICE MEMBERSHIP",
  "membership.enables":
    "It allows you to take student jobs, lets employers issue service contracts, and pays your earnings into your giro account. Students and school leavers can join, the latter for at most three months after finishing secondary school.",
  "membership.conditions": "Membership conditions and registration.",
  "membership.beforeJoining":
    "Before joining, check that you have basic health insurance.",
  "prehrana.restaurantsIntro":
    "The University of Zagreb Student Centre has 16 restaurants in attractive locations across the city. Each restaurant's page shows the dishes being served that day.",
  "prehrana.rightsData":
    "Information on student entitlements and academic cards",
  "prehrana.systemLogin": "Sign in to the system",
  "prehrana.students": "STUDENTS",
  "footer.builtBy": "Built by",
  "wallet.title": "Digital student wallet",
  "wallet.tagline": "PAY FASTER, ENJOY LONGER.",
  "help.contactUs": "CONTACT US",
  "td.tickets":
    "Tickets for Teatar &TD performances, concerts and selected film screenings at SC can be bought at our box offices, and also through the online ticketing platform Ulaznice.hr and at their points of sale.",
  "nutrition.body":
    "The human body is a sophisticated mechanism whose functioning depends on diet and the nutrients it provides",
  "nutrition.digestion":
    "Every person's body and digestion differ enough that the same diet can produce different results",
  "nutrition.students":
    "Why a good, varied diet matters for students and their success.",
  "login.employerProfile":
    "An employer account lets you post jobs, manage existing listings, review student applications and issue contracts.",
  "login.studentProfile":
    "A student account lets you edit your profile, search jobs, issue contracts, and check payment status and earnings.",
  "ss.intermediary": "STUDENT EMPLOYMENT AGENCY",
  "smjestaj.tender2022": "Accommodation call 2022/2023",
  "smjestaj.personalRight":
    "The right to a place in a student dormitory is personal to the student and cannot be transferred to anyone else.",
  "restaurant.offerIncludes": "The offer includes:",
  "restaurant.openingHours": "OPENING HOURS",
  "login.goToSignIn": "Go to sign-in",
  "login.aaiSystem": "Sign in to the web system with an AAI account",
  "sign.instant": "Issue and sign a contract in moments on your phone.",
  "sign.stored":
    "All contracts are stored and protected with a timestamp. View every contract and its status at any time.",
  "employer.contribution":
    "EMPLOYER CONTRIBUTIONS TO THE STUDENT SERVICE ARE 18,00% OF THE STUDENT'S NET EARNINGS",
  "employer.howUsed": "How is the 18,00% fee used?",
  "error.goHome": "Go to the home page",
  "empty.information": "No information to show",
  "common.loadMore": "Load more",
  "ss.intro":
    "The Student service of the University of Zagreb Student Centre connects students with employers looking for student workers.",
  "empty.newEvents": "No new events to show",
  "empty.courses": "No courses or workshops to show.",
  "help.postalAddress":
    "University of Zagreb Student Centre, Savska cesta 25, 10000 Zagreb, Croatia",
  "nav.menuDescription":
    "The site's main navigation menu. Use the keyboard or mouse to choose a page.",
  "common.underConstruction": "Page under construction",
  "smjestaj.tenderCard": "Student accommodation call",
  "ss.oldSite": "Old website",
  "ss.legalRole":
    "The Student service performs the role set out in the Croatian Student Work Act (NN 96/18, 16/20), representing students in claiming payment from employers for work done. When a student is engaged, a service contract is concluded, which the Student service issues to the employer as intermediary.",
  "login.studentProfileFull":
    "A student account lets you edit your profile, search for jobs, issue contracts, check payment status, update your details and get support.",
  "login.employerProfileFull":
    "An employer account lets you post jobs, manage existing listings, review applicants, and view student contracts and invoices.",
  "ss.introFull":
    "The Student service of the University of Zagreb Student Centre connects students with employers looking for student workers. Find the best openings on the student job board.",
  "contract.payoutsFull":
    "Payments are made once the employer who commissioned the work has paid the invoice to the University of Zagreb Student Centre. Payment goes to the student's <strong>personal giro or current account</strong> held at any bank in the Republic of Croatia.",
  "contract.numberFull":
    "A student who is a member of the Student service may take out an unlimited number of contracts <strong>during the year</strong>, provided earlier ones are returned to the Student service. A student may take up to three contracts a month for the same employer, again provided earlier ones are returned.",
  "contract.taxFreeFull":
    "Alongside the agreed pay, employers may reward workers further through tax-free payments, bonuses, allowances and support.",
  "sign.storedFull":
    "All contracts are stored and protected with a timestamp. View every contract and its status at any time.",
  "nutrition.bodyFull":
    "The human body is a sophisticated mechanism whose working and normal functioning depend heavily on diet and its components. Good nutrition matters for physical function, growth and academic success — and that is what the University of Zagreb Student Centre provides students through its restaurants.",
  "nutrition.digestionFull":
    "People's bodies and digestion differ enough that the same diet can produce different results. It is worth understanding your own body and adapting your diet to suit it.",
  "smjestaj.personalRightFull":
    "The right to a place in a student dormitory is personal to the student and cannot be transferred. As soon as students move in, the University of Zagreb Student Centre carries out thorough checks that the right is properly held, and penalises breaches under the Dormitory Rules and residence conditions.",
  "smjestaj.counsellingFull":
    "FREE counselling is available at the “Cvjetno naselje” student dormitory. Sessions run by prior appointment and are open to all students using the University of Zagreb Student Centre's services, as well as to its staff.",
  "rent.errorContact":
    "If the payment form reports success but the accommodation reservation screen shows the transaction failed, an error occurred while creating the receipt. Contact the SC office by email at (poslovnica@sczg.hr), giving your personal details (first name, surname, OIB), the reservation number and a short description of what went wrong (a screenshot helps), so the transaction can be reversed manually.",
  "kultura.coursesIntro":
    "The University of Zagreb Student Centre offers a wide range of courses and workshops. Whatever your experience or interests, there is something for everyone — join us and see what you can learn.",
  "contract.signWarning":
    "Students sign the contract only after the employer has properly completed and certified it — never before. We warn students never to sign anything for anyone <strong>in advance</strong>.",
  "fee.placement": "Student job placement",
  "fee.collection": "Guaranteed collection from employers",
  "fee.support": "Support for students",
  "fee.pension": "5% pension insurance contribution",
  "fee.health":
    "0,5% health insurance contribution for workplace injury and occupational illness",
  "fee.standard": "Improving student welfare",
  "fee.projects": "Funding student projects",
  "fee.scholarships": "Student scholarships",
  "fee.perContract": "/ per contract",
  "sign.headingUpper": "DIGITAL CONTRACT SIGNING",
  "login.eContracts":
    "Issuing e-contracts, viewing contracts, printing certificates, earnings",
  "membership.results":
    "A printout of My Results from <a href='https://www.postani-student.hr/'>www.postani-student.hr</a>",
  "login.noAaiAccount":
    "If you do not have an AAI account, you can sign in here",
  "home.metaTitle":
    "University of Zagreb Student Centre; Culture, Dining, Accommodation, Student service, Sport, Teatar &TD",
  "rent.selectWhat":
    "In the middle of the screen, select what you are paying for by ticking the empty checkbox.",
};

/** Resolve one key for a locale. Falls back to Croatian, never to the key. */
export const uiString = (locale: string | undefined, key: UIKey): string =>
  (isEnglish(locale) ? EN[key] : undefined) ?? HR[key];

/** Hook form, for components that already run on the client. */
export const useUI = () => {
  const { locale } = useRouter();
  return (key: UIKey) => uiString(locale, key);
};
