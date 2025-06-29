const express = require("express");
const cors = require("cors");

const { sequelize } = require("./database/models");

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const checkoutRoutes = require("./routes/checkout.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (_, res) => res.status(200).json({ message: "API corriendo 🚀" }));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});


const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("📦 Conexión a base de datos establecida");
    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
  });
