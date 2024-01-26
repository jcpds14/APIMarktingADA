const router = require("express").Router();
const Person = require("../models/Person");

// Creation data
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatorio!" });
    return;
  }

  const person = {
    name,
    email,
    password,
  };

  try {
    await Person.create(person);

    res.status(201).json({ message: "Pessoa cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read data
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// dinamic route
router.get("/:id", async (req, res) => {
  //extract data from req, from url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "Cadastro não encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update data PUT or PATCH
//PUT espera atualização de todos os campos, PATCH espera atualização parcial
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, email, password } = req.body;

  const person = {
    name,
    email,
    password,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    if (updatePerson.matchedCount === 0) {
        res.status(422).json({ error: "Usuário não encontrado!" });
        return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ error: "Usuário não encontrado!" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Pessoa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

module.exports = router;
