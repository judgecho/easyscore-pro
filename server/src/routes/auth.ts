import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Database } from '../database/database';
import { createError } from '../middleware/errorHandler';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 관리자/교사 로그인
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(createError(400, '사용자명과 비밀번호를 입력해주세요.'));
    }

    const db = Database.getInstance();
    
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err: any, user: any) => {
        if (err) {
          return next(createError(500, '데이터베이스 오류가 발생했습니다.'));
        }

        if (!user) {
          return next(createError(401, '잘못된 사용자명 또는 비밀번호입니다.'));
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          return next(createError(401, '잘못된 사용자명 또는 비밀번호입니다.'));
        }

        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          message: '로그인 성공',
          token,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role
          }
        });
      }
    );
  } catch (error) {
    next(error);
  }
});

// 학생 로그인
router.post('/student-login', async (req, res, next) => {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return next(createError(400, '학번과 비밀번호를 입력해주세요.'));
    }

    const db = Database.getInstance();
    
    db.get(
      'SELECT * FROM students WHERE student_id = ? AND is_active = 1',
      [studentId],
      async (err: any, student: any) => {
        if (err) {
          return next(createError(500, '데이터베이스 오류가 발생했습니다.'));
        }

        if (!student) {
          return next(createError(401, '잘못된 학번 또는 비밀번호입니다.'));
        }

        const isValidPassword = await bcrypt.compare(password, student.password);
        
        if (!isValidPassword) {
          return next(createError(401, '잘못된 학번 또는 비밀번호입니다.'));
        }

        const token = jwt.sign(
          { id: student.id, studentId: student.student_id, role: 'student' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          message: '로그인 성공',
          token,
          student: {
            id: student.id,
            studentId: student.student_id,
            name: student.name,
            className: student.class_name
          }
        });
      }
    );
  } catch (error) {
    next(error);
  }
});

// 토큰 검증
router.get('/verify', (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(createError(401, '토큰이 필요합니다.'));
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    next(createError(401, '유효하지 않은 토큰입니다.'));
  }
});

export { router as authRouter }; 