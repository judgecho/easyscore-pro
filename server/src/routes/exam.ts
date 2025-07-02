import express from 'express';

const router = express.Router();

// 시험 목록 조회
router.get('/', (req, res) => {
  res.json({ message: '시험 목록 조회 기능이 곧 추가됩니다.' });
});

// 시험 생성
router.post('/', (req, res) => {
  res.json({ message: '시험 생성 기능이 곧 추가됩니다.' });
});

// 시험 상세 조회
router.get('/:id', (req, res) => {
  res.json({ message: '시험 상세 조회 기능이 곧 추가됩니다.' });
});

// 시험 수정
router.put('/:id', (req, res) => {
  res.json({ message: '시험 수정 기능이 곧 추가됩니다.' });
});

// 시험 삭제
router.delete('/:id', (req, res) => {
  res.json({ message: '시험 삭제 기능이 곧 추가됩니다.' });
});

export { router as examRouter }; 