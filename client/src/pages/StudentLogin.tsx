import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import { BookOpen, User, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

interface StudentLoginForm {
  studentId: string;
  password: string;
}

const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginForm>();

  const onSubmit = async (data: StudentLoginForm) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.token, {
          id: result.student.id,
          studentId: result.student.studentId,
          name: result.student.name,
          role: 'student',
          className: result.student.className,
        });
        toast.success('로그인 성공');
        navigate('/dashboard');
      } else {
        toast.error(result.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      toast.error('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-12 w-12 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">EasyScore Pro</h1>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            학생 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              관리자이신가요? 여기를 클릭하여 관리자 로그인
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                학번
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('studentId', { required: '학번을 입력해주세요.' })}
                  type="text"
                  autoComplete="username"
                  className="input pl-10"
                  placeholder="학번을 입력하세요"
                />
              </div>
              {errors.studentId && (
                <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', { required: '비밀번호를 입력해주세요.' })}
                  type="password"
                  autoComplete="current-password"
                  className="input pl-10"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full h-12 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 focus:ring-green-500"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>로그인</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              테스트 계정: student001 / password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin; 