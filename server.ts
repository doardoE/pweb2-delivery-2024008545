import express from "express";
import { join } from "node:path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";

import { apiRouter } from "./src/routes/index.js";
import { injetarLocals } from "./src/middleware/locals.middleware.js";
import {
  middlewareDeErros,
  naoEncontrado,
} from "./src/middleware/erros.views.middleware.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", join(process.cwd(), "src", "views"));
app.set("layout", "layouts/base");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(process.cwd(), "src", "public")));
app.use(expressLayouts);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "segredo-dev",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);
app.use(flash());
app.use(injetarLocals);
app.use((req, res, next) => {
  res.locals.flash = {
    sucesso: req.flash("sucesso"),
    erro: req.flash("erro"),
  };
  next();
});
app.use(
  methodOverride((req) => {
    const method = req.body?._method ?? req.query?._method;
    return typeof method === "string" ? method : "";
  }),
);

app.use("/", apiRouter);
app.use(naoEncontrado);
app.use(middlewareDeErros);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Delivery Tracker rodando em http://localhost:${PORT}`),
);
