import React from 'react';
import { useAuthStore } from '../store/authStore';
import { BookOpen, Users, BarChart3, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const adminStats = [
    {
      title: '총 시험',
      value: '12',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: '등록 학생',
      value: '248', 
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: '완료된 시험',
      value: '1,847',
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
    {
      title: '평균 점수',
      value: '78.5점',
      icon: BarChart3,
      color: 'bg-orange-500',
    },
  ];

  const studentStats = [
    {
      title: '응시 가능한 시험',
      value: '3',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: '완료한 시험',
      value: '8',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: '평균 점수',
      value: '82.3점',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      title: '클래스 순위',
      value: '12/45',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const stats = user?.role === 'student' ? studentStats : adminStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          안녕하세요, {user?.name}님!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {user?.role === 'student' 
            ? `${user.className} 소속 학생입니다.`
            : '자동채점시스템을 효율적으로 관리하세요.'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {user?.role === 'student' ? '최근 활동' : '빠른 작업'}
        </h2>
        
        {user?.role === 'student' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="text-sm font-medium text-gray-900">수학 중간고사</h3>
                <p className="text-sm text-gray-500">2024-03-15 응시완료 • 85점</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                완료
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="text-sm font-medium text-gray-900">영어 모의고사</h3>
                <p className="text-sm text-gray-500">2024-03-20 응시 예정</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                대기중
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">새 시험 생성</h3>
              <p className="text-sm text-gray-500">새로운 시험을 만들어보세요</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">학생 관리</h3>
              <p className="text-sm text-gray-500">학생 정보를 관리하세요</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">성적 분석</h3>
              <p className="text-sm text-gray-500">시험 결과를 분석하세요</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 