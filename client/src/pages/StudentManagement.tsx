import React from 'react';

const StudentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">학생 관리</h1>
        <p className="mt-1 text-sm text-gray-600">
          학생 정보를 관리하고 퇴원 처리를 할 수 있습니다.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">학생 관리 기능이 곧 추가됩니다.</p>
      </div>
    </div>
  );
};

export default StudentManagement; 