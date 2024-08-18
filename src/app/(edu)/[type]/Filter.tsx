import React from 'react';

export default function Filter() {
  return (
    <div className="w-[20%]">
      <div className="border border-gray-30 rounded-xl mx-[100px]">
        <h3 className="p-5 font-bold">필터</h3>

        <hr />

        <div className="p-10 flex flex-col">
          <select
            name="sortName"
            id=""
            className="border border-gray-30 rounded-md px-5 py-1 mb-10 mx-auto w-[80%]"
          >
            <option value="new">최신순</option>
            <option value="old">오래된순</option>
            <option value="popular">인기순</option>
            <option value="">가격높은순</option>
            <option value="가격낮은순">가격낮은순</option>
          </select>

          <hr className="mb-10" />

          <label className="font-semibold mb-3">강의 형태</label>
          <div className="flex flex-col gap-2 mb-10">
            <div>
              <input type="radio" name="method" value="" /> <span>온라인</span>
            </div>
            <div>
              <input type="radio" name="method" /> <span>오프라인</span>
            </div>
          </div>

          <hr className="mb-10" />

          <label className="font-semibold mb-3">난이도</label>
          <div className="flex flex-col gap-2">
            <div>
              <input type="radio" /> <span>입문</span>
            </div>
            <div>
              <input type="radio" /> <span>초급</span>
            </div>
            <div>
              <input type="radio" /> <span>중급</span>
            </div>
            <div>
              <input type="radio" /> <span>고급</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
