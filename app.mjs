// Servidor
import express from "express"           // Correr el servidor
import session from 'express-session';  // Crear sesiones en express (datos guardados en el servidor)
import path from "path";                // Creacion de rutas

// Middlewares para cambias de pagina
import cors from "cors"                 // Aceptar todas la fuentes
import bodyParser from 'body-parser';   // Renderizar paginas
import { fileURLToPath } from 'url';    // Trabajar con urls 

// Configuracion modular (ruteos)
const __filename = fileURLToPath(import.meta.url);  // Obtenemos la carpeta actual
const __dirname = path.dirname(__filename);         // Creamos una ruta default para añadirla como prefijo

// Creamos una referencia al servidor
const app = express();

// Configuración de sesión
app.use(session({
    secret: 'miclaveultrasecreta',  // Llave
    resave: false,                 //
    saveUninitialized: true,
    cookie: { secure: false }
}));


// Middlewares
app.use(cors());                                    // Aceptar todas las fuentes
app.use(bodyParser.json());                         // Aceptar peticiones JSON
app.use(bodyParser.urlencoded({ extended: true })); // Aceptar encoded en URL

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));    // Creamos la ruta para encontrar los archivos dentro de la carpeta public (archivos estaticos)

// Configuración para renderizar plantillas
app.set('view engine', 'ejs');                      // Motor .ejs permite plantillas HTML con codigo dinamico (codigo incrustrado)
app.set('views', path.join(__dirname, 'views'));

// Ruta principal - Sirve index.html
app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/login', (req, res) => {
    res.render('login', {});
});

app.get('/register', (req, res) => {
    res.render('register', {});
});

app.get('/quiz', (req, res) => {
    const userId = req.query.id; // Obtener el ID de la URL
    res.render('quiz', { userId: userId });
});

app.get('/balance', (req, res) => {
    res.render('balance', {});
});

app.get('/port-selector', (req, res) => {
    res.render('port-selector', {});
});

// Ruta para renderizar la plantilla de assets de un portfolio específico
app.get('/portfolio/assets/:portfolioId', (req, res) => {
    const { portfolioId } = req.params;
    
    // Aquí puedes obtener los datos del portfolio desde tu base de datos si es necesario
    // const portfolioData = await getPortfolioById(portfolioId);
    
    res.render('portfolio-assets', {
        portfolioId: portfolioId,
        // otros datos que quieras pasar a la plantilla
        title: `Portfolio ${portfolioId}`,
        // portfolioData: portfolioData
    });
});














// Rutas de API
// app.use('/api/auth', authRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

function startServer() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
}

/* istanbul ignore next */
// if (require.main === module) {
//   startServer();
// }
startServer();

// module.exports = {app, startServer};

