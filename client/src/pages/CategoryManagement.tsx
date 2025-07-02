import React from 'react';

const CategoryManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">분류 관리</h1>
        <p className="mt-1 text-sm text-gray-600">
          대분류, 중분류, 소분류를 트리구조로 관리할 수 있습니다.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">분류 관리 기능이 곧 추가됩니다.</p>
      </div>
    </div>
  );
};

export default CategoryManagement; 