const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Store the database file in the Glitch-provided disk space
const dbPath = path.resolve(__dirname, "comments4.db");
const db = new sqlite3.Database(dbPath);

const data = [
  {
    name: "Laura González",
    email: "laura_gonzalez@gmail.com",
    comment:
      "Esta experiencia me deja horrorizada. Es increíble cómo algunas personas pueden aprovecharse de la confianza que tenemos en ellas. Sandra debería rendir cuentas por su fraude. No puedo creer que existan este tipo de estafadoras en el mundo de las inversiones. ¡Tengan mucho cuidado!",
  },
  {
    name: "Mariana López",
    email: "mariana_lopez@icloud.com",
    comment:
      "Suena demasiado bueno para ser verdad. Siempre he tenido un mal presentimiento sobre las inversiones rápidas y fáciles. Es triste ver cómo le han hecho esto a alguien. Nunca debio confiar en Sandra, el mundo de las inversiones es muy riesgoso y si no conoces bien a la persona, más vale tener cuidado.",
  },
  {
    name: "Teresa Ruiz",
    email: "teresa.ruiz@yahoo.com",
    comment:
      "Esto es inaceptable. Sandra es una timadora. Me da mucha rabia por ti, que has perdido tanto dinero. Debemos compartir estas experiencias para que más mujeres no caigan en manos de personas engañosas como ella. La confianza no se debe jugar así.",
  },
  {
    name: "Gabriela Martínez",
    email: "gabrielamartinez@gmail.com",
    comment:
      "Perdón por tu mala experiencia. Conozco demasiadas historias de inversiones fallidas, pero esta es una de las peores. A veces, la gente finge ser amiga para beneficiarse. Ojalá logres recuperar tu dinero y que nadie más pase por lo mismo. ¡Es asqueroso!",
  },
  {
    name: "Ana Beltrán",
    email: "anabeltran@icloud.com",
    comment:
      "Esto es alarmante. Sandra Ocaranza se hace pasar por una amiga, pero en realidad solo busca estafar. Invertir en confianza es un error, y lo sabes por experiencia. Es muy importante que las mujeres aprendamos a reconocer estas señales y no confiar ciegamente. Qué pena lo que te ocurrió.",
  },
  {
    name: "Javier Morales",
    email: "javier_morales@hotmail.com",
    comment:
      "Es triste saber que hay personas como Sandra que juegan con la confianza de los demás. No puedo imaginar lo frustrante que debe ser intentar recuperar tu dinero y que no te respondan. Las inversiones requieren confianza, y ella claramente abusó de eso.",
  },
  {
    name: "Carlos Soto",
    email: "carlospsoto@gmail.com",
    comment:
      "Me parece increíble cómo algunas personas se aprovechan de la necesidad de otros. Sandra debe ser responsabilizada por sus actos. Espero que compartas tu historia en más lugares para que nadie más caiga en su trampa. No puedo creer cómo la gente puede ser tan deshonesta.",
  },
  {
    name: "Manuel Pérez",
    email: "manuelhperez@telmex.com",
    comment:
      "Esto es un desatino total. Invertir debería ser algo que se haga con confianza y transparencia. Sandra no solo falta al acuerdo, sino que también desapareció sin dejar rastro. Ojalá logres que le hagan justicia, esto es inaceptable.",
  },
  {
    name: "Eduardo Sánchez",
    email: "eduardo_sanchez@gmail.com",
    comment:
      "Suena como una experiencia horrible. La gente en el mundo de las inversiones puede ser muy deshonesta, y parece que Sandra es un gran ejemplo de esto. Espero que sirva de lección para los demás sobre con quién vale la pena invertir.",
  },
  {
    name: "Felipe Jiménez",
    email: "felipejimenez@hotmail.com",
    comment:
      "Esta situación es realmente frustrante. Es lamentable que Sandra haya abusado de la confianza y amistad. Invertir requiere hacer una buena investigación sobre la persona, y es triste ver que esto no funcionó. Debemos estar siempre alertas.",
  },
    {
    name: "Ana Gonzalez",
    email: "expressartedigital@hotmail.com",
    comment:
      "No es la primera vez que escucho de alguien estafado por Sandra. Es una persona que gana tu confianza, para después quedarse con tu dinero. No entiendo cómo se puede atrever. ¡Cuidado con Sandra Elena Ramos!",
  },
  {
    name: "Ricardo Torres",
    email: "dtorresh78@gmail.com",
    comment:
      "Sandra es una estafadora y esperemos que la detengan pronto. Alguna autoridad debe hacer algo al respecto, se cuenta con las evidencias.",
  },
   {
    name: "Cristina Rodríguez",
    email: "pichyrolo@gmail.com",
    comment:
      "Cómo puede haber personas tan cínicas, como Sandra Elena Ramos Ocaranza, decir que es amiga y te hagan un fraude, no se puede quedar así como que no hizo nada, es un delito tiene que pagar, y no andar por la vida como si nada.",
  },
  {
    name: "Agustin",
    email: "rarias52@gmail.com",
    comment:
      "Esta rata pronto va a caer, ya probó las mieles del del fraude, la trampa ya está puesta ,pronto vamos a tener noticias.",
  },  
  {
    name: "Melissa Diaz",
    email: "creandumx@gmail.com",
    comment:
      "Regresa el dinero que se te entregó Sandra Elena Ramos Ocaranza! Eres una estafadora 😡 da la cara.",
  },
];

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      comment TEXT NOT NULL,
      date TEXT NOT NULL,
      ip TEXT NOT NULL
    );
  `);
  
    db.run(`
    CREATE TABLE IF NOT EXISTS reportabuse (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      reportInfo TEXT NOT NULL,
      date TEXT NOT NULL,
      ip TEXT NOT NULL
    );
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      ipAddress TEXT NOT NULL,
      hostname TEXT NOT NULL,
      country TEXT NOT NULL,
      city TEXT NOT NULL,
      region TEXT NOT NULL,      
      userAgent TEXT NOT NULL,
      page TEXT NOT NULL
    );
  `);

  let stmt = db.prepare(
    `INSERT INTO comments (email, name, comment, date, ip)
     SELECT ?, ?, ?, ?, ?
     WHERE NOT EXISTS (SELECT 1 FROM comments WHERE email = ?)`
  );

  data.forEach((record) => {
    stmt.run(
      record.email,
      record.name,
      record.comment,
      new Date().toISOString(),
      "127.0.0.1",
      record.email
    );
  });

  stmt.finalize();
});

module.exports = db;
