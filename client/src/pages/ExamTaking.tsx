import React from 'react';

const ExamTaking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">시험 응시</h1>
        <p className="mt-1 text-sm text-gray-600">
          배정된 시험을 선택하고 응시할 수 있습니다.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">시험 응시 기능이 곧 추가됩니다.</p>
      </div>
    </div>
  );
};

export default ExamTaking; 