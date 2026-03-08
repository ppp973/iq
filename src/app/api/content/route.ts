import { NextResponse } from 'next/server';

const HEADERS = {
  "Accept": "application/json, text/plain, */*",
  "Platform": "WEB",
  "Authorization": process.env.STUDYIQ_TOKEN || "",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Referer": "https://www.studyiq.com/",
  "Origin": "https://www.studyiq.com"
};

export async function POST(request: Request) {
  try {
    const { courseId } = await request.json();

    if (!courseId) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    // Trying multiple endpoints like your python script
    const endpoints = [
      `https://backend.studyiq.net/app-content-ws/v2/course/getDetails?courseId=${courseId}`,
      `https://backend.studyiq.net/app-content-ws/v1/course/content?courseId=${courseId}`,
      `https://backend.studyiq.net/app-content-ws/course/lectures?courseId=${courseId}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { headers: HEADERS });
        if (res.ok) {
          const data = await res.json();
          // Check if data actually has content
          if (data && (data.data || data.courseContent || data.lectures)) {
            return NextResponse.json({ success: true, data: data });
          }
        }
      } catch (e) {
        continue;
      }
    }

    return NextResponse.json({ success: false, error: "Content Not Found or Token Expired" }, { status: 404 });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
