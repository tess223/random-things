import express from 'express'

const router = express.Router()
import Mood from '../models/mood.js'

// 新增记录
router.post('/', async (req, res) => {
  try {
    const mood = new Mood(req.body)
    await mood.save()
    res.json(mood)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取所有记录
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ createdAt: -1 })
    res.json(moods)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 删除记录
router.delete('/:id', async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router;