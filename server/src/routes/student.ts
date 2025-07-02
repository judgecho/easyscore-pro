import express from 'express';

const router = express.Router();

// 학생 목록 조회
router.get('/', (req, res) => {
  res.json({ message: '학생 목록 조회 기능이 곧 추가됩니다.' });
});

// 학생 등록
router.post('/', (req, res) => {
  res.json({ message: '학생 등록 기능이 곧 추가됩니다.' });
});

// 학생 수정
router.put('/:id', (req, res) => {
  res.json({ message: '학생 수정 기능이 곧 추가됩니다.' });
});

// 학생 삭제 (퇴원 처리)
router.delete('/:id', (req, res) => {
  res.json({ message: '학생 퇴원 처리 기능이 곧 추가됩니다.' });
});

export { router as studentRouter }; 