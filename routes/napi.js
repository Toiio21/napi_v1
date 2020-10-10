const {Router} = require('express')
const Napi = require('../models/Napi')
const router = Router()

router.get('/', async (req, res)=> {
  const napis = await Napi.find({}).lean()

  res.render('index', {
    title: 'NAPI',
    isIndex: true,
    napis,
  })
})
router.get('/apis', (req, res) =>{
  res.render('apis', {
    title: 'apis',
    isApis: true,
  })
})
router.post('/apis', async (req, res) =>{
  const napi = new Napi({
    title: req.body.title
  })

  await napi.save()
  res.redirect('/')
})


router.post('/complete', async (req, res) => {
  const napi = await Napi.findById(req.body.id)

  napi.completed = req.body.completed
  await napi.save()

  res.redirect('/')
})

module.exports = router