import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Course Enrollment Form</h1>
      <p className="mt-2 text-gray-600">
        온라인 교육 플랫폼 수강 신청 폼 과제입니다.
      </p>

      <Link
        href="/enrollment"
        className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-white"
      >
        수강 신청 시작하기
      </Link>
    </main>
  );
}