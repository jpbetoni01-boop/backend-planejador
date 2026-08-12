import express from "express";
import cors from "cors";
import sgMail from "@sendgrid/mail";

const app = express();
app.use(express.json());
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const COORDENADOR = "jpbetoni01@gmail.com";
const REMETENTE = "jpbetoni01@gmail.com";

app.post("/api/enviar-email", async (req, res) => {
  const { destinatario, assunto, conteudo } = req.body;

  if (destinatario !== COORDENADOR) {
    return res.status(403).json({ erro: "Destinatário não autorizado" });
  }

  try {
    await sgMail.send({
      to: destinatario,
      from: REMETENTE,
      subject: assunto || "Planejador de aulas",
      text: conteudo,
      html: `<pre>${conteudo}</pre>`
    });
    res.json({ sucesso: true });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao enviar e-mail" });
  }
});

app.listen(3000, () => console.log("API rodando na porta 3000"));