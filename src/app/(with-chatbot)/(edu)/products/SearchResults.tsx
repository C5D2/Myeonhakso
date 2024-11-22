'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchSearchLectures } from '@/data/fetchLecture';
import { Ilecture } from '@/types/lecture';
import Card from '@/components/Card';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<Ilecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const keyword = searchParams.get('keyword');
      if (keyword) {
        setIsLoading(true);
        try {
          const results = await fetchSearchLectures(keyword);
          setSearchResults(results || []);
        } catch (error) {
          console.error('Failed to fetch search results:', error);
          // 에러 처리 로직 추가
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grow-1 h-100">
      <div className="max-w-[1500px] mx-auto px-10 w-full mt-10">
        <h1 className="font-bold text-lg mb-10"> 검색 결과</h1>
        {searchResults.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {searchResults.map((item, index) => (
              <div
                className="w-[300px] h-[320px] rounded-xl"
                key={item._id || index}
              >
                <Card item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
