const express = require('express')
const cors = require('cors')
const app = express()
const Home = require('./modelos/home')
const router = express.Router()
router.use(express.urlencoded({extended: true}))
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;



app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})


let DataHome = {};

app.get('/', async (req, res) => {
  try {
    const result = await Home.findOne({
      order: [
        ['id', 'DESC']
      ],
    });

    DataHome = {
      text_one: result.text_one,
      text_two: result.text_two,
      text_three: result.text_three,
      btn_title: result.btn_title,
      btn_link: result.btn_link,
    };

    res.json({
      success: true,
      datahome: DataHome
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar dados.'
    });
  }
});




app.post('/add-home', bodyParser.urlencoded({ extended: true }), async (req, res) => {
  const textOne = req.body.text_one;
  const textTwo = req.body.text_two;
  const textThree = req.body.text_three;
  const btnTitle = req.body.btn_title;
  const btnLink = req.body.btn_link;

  // faça o que desejar com os dados do formulário
  try {
    const result = await Home.create({
      text_one: textOne,
      text_two: textTwo,
      text_three: textThree,
      btn_title: btnTitle,
      btn_link: btnLink
    });
    console.log(result);
    res.send('Formulário enviado com sucesso!');
  } catch (error) {
    console.error(error);
    res.send('Erro ao enviar o formulário!');
  }
});
app.listen(8082, ()=>{
    console.log('servidor iniciado na porta: 8082: http//localhost:8082 ')
})