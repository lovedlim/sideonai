import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { SITE_URL } from "@/data/site";

// 실제 페이지만 싣는다. /typing, /md, /code는 바깥 사이트로 넘기는 주소라 넣지 않는다.
// 마지막으로 진행한 강의 날짜를 수정일로 쓴다. 예정된 강의(미래 날짜)는 빌드한 날로 끊는다.
const today = new Date().toISOString().slice(0, 10);
const lastCourse = courses.reduce((max, c) => (c.last > max && c.last <= today ? c.last : max), "");
const lastModified = new Date(lastCourse || today);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/activities`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
