import express from "express";
import cors from "cors";
import { config } from "dotenv"

config();


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("sv running");
})

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
            }
            ],
        back_urls: {
            success: "https://github.com/nahug07",
            failure: "https://github.com/nahug07",
            pending: "https://github.com/nahug07",
        },
        auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            error: "error create reference"
        })
    }

})

app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
})
