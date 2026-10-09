# 과정 묶음(courses.py) + 고른 사진(picks.json) → 웹용 webp와 src/data/courses.ts 를 만든다.
#   python3 list/2026-10/build_courses.py
# picks.json: {"과정id": ["사진/<폴더>/<파일>", "public/images/activities/x.webp", "생성/<id>.png", ...]}
#   값의 맨 앞 사진이 대표(커버)가 된다. 2~5장.
import hashlib, json, os, sys, unicodedata
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
import courses  # noqa: E402

OUT_IMG = os.path.join(REPO, "public", "images", "courses")
OUT_TS = os.path.join(REPO, "src", "data", "courses.ts")
TODAY = "2026-10-09"

# 분야. 홈페이지의 분야 탭과 같다.
SECTOR = {
    "corp": "기업",
    "media": "방송 · 미디어",
    "public": "공공 · 소방",
    "edu": "대학 · 교육 · 컨퍼런스",
}
# 분야 안에서는 규모가 큰 기관부터, 같은 기관 안에서는 대표 과정부터 보인다.
ORDER = [
    # 기업
    "gsretail", "kbcard", "ncsoft", "nexon", "jb", "multicampus", "vaiv", "datasolution", "medengine",
    # 공공 · 소방
    "kcg", "fire-advanced", "fire-basic", "fire-commander", "fire-chiefs", "fire-newcomer", "fire-promotion",
    "fire-officer", "fire-admin", "fire-hazmat", "fire-safety-edu", "fire-tlss",
    "kca", "kalis", "kipf", "kwdi", "gbsa", "seoul-lifelong", "seongnam-youth", "gangnam-teachers",
    # 방송 · 미디어
    "ebs-digital-school", "ebs-newhire", "ebs-business", "ebs-hr", "ebs-youth", "ebs-2025",
    "mbccb", "tbc", "etnews-claudecode", "etnews-vibe-1day", "kpf", "kobeta-beginner", "kobeta-python", "koba",
    # 대학 · 교육 · 컨퍼런스
    "kisa-vibe", "kisa-web3", "uos", "busan-catholic", "inflearn-sme", "hanbit", "kvrda", "music-assoc",
    "joongang-girls", "modulabs",
]
SECTOR_OF = {
    **{k: "public" for k in ["fire-chiefs", "fire-newcomer", "fire-officer", "fire-admin", "fire-hazmat",
                             "fire-safety-edu", "fire-promotion", "fire-basic", "fire-advanced", "fire-tlss",
                             "fire-commander", "kcg", "kalis", "kipf", "kwdi", "seoul-lifelong", "kca",
                             "gangnam-teachers", "tutor-fire"]},
    **{k: "media" for k in ["ebs-2025", "ebs-digital-school", "ebs-business", "ebs-youth", "ebs-newhire", "ebs-hr",
                            "kobeta-beginner", "kobeta-python", "koba", "tbc", "mbccb", "kpf"]},
    **{k: "corp" for k in ["nexon", "vaiv", "multicampus", "jb", "kbcard", "gsretail", "medengine", "ncsoft",
                           "datasolution"]},
    "gbsa": "public", "seongnam-youth": "public", "etnews-claudecode": "media", "etnews-vibe-1day": "media",
}

# 기존 사이트에 있던 링크와 메모를 살린다.
LINKS = {
    "etnews-vibe-1day": [
        ("1차", "https://conference.etnews.com/conf_info.html?uid=385"),
        ("2차", "https://conference.etnews.com/conf_info.html?uid=406"),
        ("3차", "https://conference.etnews.com/conf_info.html?uid=417"),
        ("4차", "https://conference.etnews.com/conf_info.html?uid=448"),
        ("5차", "https://conference.etnews.com/conf_info.html?uid=461"),
        ("중급반", "https://conference.etnews.com/conf_info.html?uid=467"),
    ],
    "ebs-2025": [("과정 안내", "http://edu.kobeta.com/education/index-list_cate1.php?idx=209&code=all&bgu=view")],
    "kobeta-beginner": [("과정 안내", "http://edu.kobeta.com/education/index-list_cate2.php?idx=228&code=all&bgu=view")],
    "kvrda": [("과정 안내", "https://www.metaverse-campus.kr/lecture/viewAll.do?pageIndex=1&menu_idx=50&lecIdx=17&proIdx=262&selYear=&selApplyStatus=")],
    "gbsa": [("과정 안내", "https://inf.run/A96Ct")],
    "kisa-web3": [("프로그램", "https://blockchainweek.co.kr/2025/programDay.do?tab=2")],
    "kisa-vibe": [("메타코드 워크숍 기사", "https://www.datanet.co.kr/news/articleView.html?idxno=203465")],
}
NOTE = {
    "jb": "사내 경진대회(해커톤) 기술 심사 40개 팀",
    "fire-newcomer": "신임자 122기 169명",
    "kisa-vibe": "오프라인 워크숍과 VOD",
    "medengine": "위메이드 계열 게임사",
    "kvrda": "메타버스 캠퍼스",
    "gbsa": "디지털 오픈랩 × 인프런",
    "ebs-digital-school": "교육 외 현업 적용 프로젝트까지 진행",
    "joongang-girls": "커서 AI와 v0로 웹사이트 만들기",
}
# 일정표에는 없지만 기존 사이트에 있던 강연
EXTRA = [
    dict(id="modulabs", org="모두의연구소", title="n8n, AI를 나만의 업무 파트너로", dates=["2025"], sector="edu",
         links=[("행사 안내", "https://event-us.kr/modu/event/100282")]),
]
# 홈 실적 섹션에 크게 올릴 과정 (순서대로)
FEATURED = ["kbcard", "ebs-digital-school", "gsretail", "ncsoft", "koba"]
# 기관명 띠와 목록에서 맨 앞에 세울 기관. 이름만 들어도 아는 곳부터
BRANDS_FIRST = ["EBS", "GS리테일", "KB국민카드", "NC", "넥슨코리아", "JB금융지주", "KISA", "MBC충북", "서울시립대학교", "멀티캠퍼스", "전자신문"]


def webp(src, dst):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im.thumbnail((1600, 1600))
    im.save(dst, "WEBP", quality=74, method=6)
    return im.size


def main():
    picks = json.load(open(os.path.join(HERE, "picks.json")))
    os.makedirs(OUT_IMG, exist_ok=True)
    for f in os.listdir(OUT_IMG):
        os.remove(os.path.join(OUT_IMG, f))
    rows = []
    allc = [dict(id=k, org=o, title=t, dates=d, sector=SECTOR_OF.get(k, "edu"), links=LINKS.get(k, [])) for k, o, t, d in courses.C] + EXTRA
    for c in allc:
        photos = []
        for i, p in enumerate(picks.get(c["id"], [])[:5]):
            src = os.path.join(REPO, p) if p.startswith("public/") else os.path.join(HERE, p)
            src = unicodedata.normalize("NFD", src) if not os.path.exists(src) else src
            # 사진을 바꾸면 주소도 바뀌게 내용 해시를 붙인다(이미지 최적화 캐시가 옛 사진을 내주지 않게)
            tmp = os.path.join(OUT_IMG, "_tmp.webp")
            w, h = webp(src, tmp)
            digest = hashlib.sha1(open(tmp, "rb").read()).hexdigest()[:8]
            name = f"{c['id']}-{i + 1}-{digest}.webp"
            os.replace(tmp, os.path.join(OUT_IMG, name))
            kind = "illustration" if p.startswith("생성/") else "slide" if p.startswith("교안/") else "photo"
            photos.append(dict(src=f"/images/courses/{name}", w=w, h=h, kind=kind))
        done = [d for d in c["dates"] if d <= TODAY]
        years = sorted({d[:4] for d in c["dates"]})
        rows.append(dict(
            id=c["id"], org=c["org"], title=c["title"], sector=c["sector"],
            sessions=len(done) if done else 0, upcoming=len(c["dates"]) - len(done),
            years=years[0] if len(years) == 1 else f"{years[0]}–{years[-1][2:]}",
            last=max(c["dates"]), note=NOTE.get(c["id"]),
            links=[dict(label=a, href=b) for a, b in c["links"]], photos=photos,
        ))
    missing = [r["id"] for r in rows if r["id"] not in ORDER]
    assert not missing, f"ORDER에 없는 과정: {missing}"
    rows.sort(key=lambda r: (list(SECTOR).index(r["sector"]), ORDER.index(r["id"])))
    total = sum(r["sessions"] for r in rows)  # 강의한 날짜 수. 하루에 두 기관이면 2회
    orgs = list(dict.fromkeys(r["org"].split(" (")[0] for r in rows))
    orgs = [o for o in BRANDS_FIRST if o in orgs] + [o for o in orgs if o not in BRANDS_FIRST]
    ts = [
        "// 자동 생성 파일 — list/2026-10/build_courses.py 로 다시 만든다. 직접 고치지 말 것.",
        "",
        "export type Sector = " + " | ".join(json.dumps(k) for k in SECTOR) + ";",
        "// kind: photo 현장 사진, slide 실제 교안 화면, illustration 사진이 없는 과정에 넣은 생성 이미지\nexport interface CoursePhoto { src: string; w: number; h: number; kind: \"photo\" | \"slide\" | \"illustration\" }",
        "export interface Course {",
        "  id: string; org: string; title: string; sector: Sector;",
        "  sessions: number; upcoming: number; years: string; last: string;",
        "  note?: string; links: { label: string; href: string }[]; photos: CoursePhoto[];",
        "}",
        "",
        f"export const SECTORS: Record<Sector, string> = {json.dumps(SECTOR, ensure_ascii=False)};",
        f"export const courses: Course[] = {json.dumps(rows, ensure_ascii=False, indent=1)};",
        f"export const FEATURED: string[] = {json.dumps(FEATURED)};",
        f"export const totalSessions = {total};",
        f"export const orgCount = {len(orgs)};",
        f"export const orgNames: string[] = {json.dumps(orgs, ensure_ascii=False)};",
        "",
    ]
    open(OUT_TS, "w").write("\n".join(ts).replace(": null", ": undefined"))
    print("courses", len(rows), "photos", sum(len(r["photos"]) for r in rows), "sessions", total, "orgs", len(orgs))
    print("사진 없음:", [r["id"] for r in rows if not r["photos"]])


if __name__ == "__main__":
    main()
