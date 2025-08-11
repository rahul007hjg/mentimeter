const express=require("express")
const app=express()
const jwt=require('jsonwebtoken')
const cors=require("cors")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(cors())
app.use(express.json())
app.post("/admin/signup", async (req, res) => {
  const { username, password, name } = req.body;
  const exist = await prisma.user.findUnique({ where: { username } });

  if (exist) {
    return res.status(400).json({ message: "User already exists" }); 
  }

  const user = await prisma.user.create({
    data: { name, password, username }
  });

  res.json({ user });
});

app.post("/user/signup", async (req, res) => {
  const { name, password, username } = req.body;
  const exist = await prisma.user.findUnique({ where: { username } });

  if (exist) {
    return res.status(400).json({ message: "User already exists" }); // ❗️Fix this
  }

  const user = await prisma.user.create({
    data: { name, password, username }
  });

  res.json({ user });
});

app.post("/user/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.username, id: user.id }, "123random");
  res.json({ token });
});

app.post("/admin/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.send("Invalid credentials");
  }

  const token = jwt.sign({ email: user.username, id: user.id }, "123random");
  res.json({ token });
});
app.post("/admin/quiz", async (req, res) => {
  try {
    const token = req.headers.token;
    const { title } = req.body;
    const decoded = jwt.verify(token, "123random");

    const quiz = await prisma.Quiz.create({
      data: {
        title: title,
        authorid: decoded.id
      }
    });

    if (quiz) {
      res.json({ quiz }); // ✅ This replaces the misleading 'user' key
    } else {
      res.status(500).json({ message: "Quiz creation failed" });
    }
  } catch (err) {
    console.error("Error in /admin/quiz:", err);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
});

app.post("/admin/questions",async(req,res)=>{
   
   const{quizid,question,answer}=req.body
    
   const quest=await prisma.Questions.create({
    data:{
        question:question,
        quizid:quizid,
        answer:answer
    }

   })
   res.json({quest})
})
app.post("/admin/question/option/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const { questionId, options, correct } = req.body; // `correct` is a string or array of correct options

    if (!questionId || !Array.isArray(options) || !correct) {
      return res.status(400).json({ message: "Missing or invalid input." });
    }

    if (options.length !== count) {
      return res.status(400).json({
        message: `Expected ${count} options, but received ${options.length}.`,
      });
    }

    // Save each option individually with isCorrect flag
    const createdOptions = [];
    for (const opt of options) {
      const isCorrect = Array.isArray(correct)
        ? correct.includes(opt)
        : correct === opt;

      const newOption = await prisma.option.create({
        data: {
          questionId,
          text: opt,
          isCorrect,
        },
      });

      createdOptions.push(newOption);
    }

    res.status(201).json({
      message: "Options and correct answer(s) saved successfully",
      options: createdOptions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/quiz/:id", async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({
      title: quiz.title,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options.map(o => o.text), // send only text
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/quiz/submit", async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Missing or invalid input." });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    const total = quiz.questions.length;
    const results = [];

    for (const submitted of answers) {
      const question = quiz.questions.find(q => q.id === submitted.questionId);
      if (!question) continue;

      const isCorrect = question.options.some(opt =>
        opt.isCorrect &&
        opt.text.trim().toLowerCase() === submitted.selected.trim().toLowerCase()
      );

      if (isCorrect) score++;

      results.push({
        questionId: question.id,
        question: question.question,
        selected: submitted.selected,
        correct: isCorrect,
        correctAnswers: question.options.filter(o => o.isCorrect).map(o => o.text),
      });
    }

    res.json({
      quizId,
      score,
      total,
      results
    });

  } catch (err) {
    console.error("Submit quiz error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/user/quiz/leaderboard",async(req,res)=>{
  const{quizid}=req.body

})



app.listen(3000)