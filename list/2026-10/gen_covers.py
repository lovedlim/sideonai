# 현장 사진이 없는 과정에 넣을 일러스트를 만든다.  python3 gen_covers.py <과정id> ...
# 키는 iCloud work/202609_소방_관리자/api.md 첫 줄에서 읽는다(저장소에 넣지 않는다). 결과는 생성/<id>.png
import base64, json, os, ssl, sys, urllib.request
import certifi

KEY = open(os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs/work/202609_소방_관리자/api.md"),
           encoding="utf-8").read().strip().splitlines()[0].strip()
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "생성")

# 모든 그림이 한 묶음으로 보이게 화풍을 고정한다. 사람 얼굴과 글자는 넣지 않는다(가짜 현장 사진처럼 보이지 않게).
STYLE = """Editorial still-life illustration for a premium Korean AI-education firm.
Muted warm palette: deep charcoal #17181b, warm paper #f2f2ef, aged brass #9a7440 and #c9a063 accents, soft shadows.
Style: refined risograph / gouache texture, calm, minimal, generous negative space, centered composition, wide 3:2 frame.
Strictly no text, no letters, no logos, no human faces, no photorealistic people. Not a photograph."""

MOTIF = {
    "kca": "a consumer-protection theme: a balanced brass scale beside an open laptop showing abstract code blocks, a receipt and a shopping bag as quiet props",
    "kisa-vibe": "a glowing laptop on a desk with a speech bubble turning into a small web app window, a blockchain chain of brass cubes in the background",
    "kisa-web3": "a conference stage seen from the back of the hall, a large blank screen, interlinked brass cubes floating like a blockchain",
    "busan-catholic": "a university lecture desk with an open lesson-plan notebook and a laptop on a video call grid, a small cathedral-arch window shadow",
    "fire-chiefs": "a fire chief's helmet resting on a command table beside a tablet showing an abstract incident map with brass markers",
    "fire-officer": "a firefighter's helmet and gloves next to a laptop with abstract document blocks, a brass rank badge",
    "fire-hazmat": "hazardous-materials storage drums with diamond warning shapes (no text) and a tablet analysing them, brass and charcoal",
    "fire-safety-edu": "a fire-safety teaching kit: a small fire extinguisher, a smoke detector and printed lesson cards fanned out next to a laptop",
    "fire-promotion": "a firefighter helmet on a stack of exam books with a laptop and an upward brass stair motif suggesting promotion",
    "fire-admin": "official paperwork, a stamp and a spreadsheet on a laptop, a firefighter helmet in the corner of the desk",
    "fire-basic": "a computer lab desk with a firefighter helmet beside a monitor showing abstract chat bubbles and charts",
    "kalis": "infrastructure safety: a bridge and a building cross-section blueprint with a tablet running AI analysis",
    "kipf": "a research desk with tax and finance charts, a calculator and a laptop with abstract AI assistant panels",
    "kwdi": "a research institute desk with data charts and a python snake made of brass wire coiled around a laptop",
    "seoul-lifelong": "an adult-learning classroom table with notebooks, coffee cups and a laptop showing a simple chat interface",
    "gangnam-teachers": "a teacher's desk with a chalkboard eraser, lesson plans and a tablet showing an AI chat",
    "seongnam-youth": "a junior developer's desk with a laptop, headphones and a small robot companion pair-programming",
    "multicampus": "a modern corporate training room with a laptop showing code and a big abstract screen",
    "nexon": "a game studio desk with a controller, pixel-art blocks and a laptop where Korean speech bubbles become code",
    "vaiv": "a collaboration table with two laptops facing each other and a brass robot hand meeting a human hand above them (no faces)",
    "joongang-girls": "a high-school teacher's desk with a laptop building a simple website wireframe, colored pencils",
    "ebs-2025": "a broadcast studio desk with a camera, a microphone and a laptop generating content cards",
    "ebs-youth": "a bright creative workshop table for teenagers with laptops, sticky notes and a small app prototype on a phone",
    "ebs-hr": "an HR team's desk with personnel folders turning into automated spreadsheet flows on a laptop",
    "ncsoft": "an HR workspace with a calendar, candidate folders and a laptop running an AI coworker panel",
    "datasolution": "a dashboard on a large monitor with charts, a terminal window and a cup of coffee, brass accents",
    "medengine": "a game company desk with a terminal window and pixel-art sprites, online class headset",
    "hanbit": "a stack of books beside a laptop showing a reading-challenge web app with progress bars",
    "inflearn-sme": "an online course setup: a laptop with a video lesson, a ring light and a notebook",
    "gbsa": "data collection: a web page flowing into a spreadsheet and charts on a laptop",
    "modulabs": "an automation workflow drawn as connected brass nodes floating over a laptop",
    "music-assoc": "a piano keyboard, sheet music and a laptop where musical notes turn into code blocks",
    "uos": "a university hackathon table with laptops, sticky notes and an MVP prototype on a phone",
    "kobeta-python": "a broadcast control room console with a laptop running python charts",
    "tbc": "a regional broadcaster newsroom desk with a camera and a laptop automating video content",
    "mbccb": "a broadcast studio with a laptop running a terminal and a weather map",
    "ebs-newhire": "a new-employee orientation desk with a welcome kit and a laptop building a web app",
    "ebs-business": "a business center meeting table with laptops and an abstract product dashboard",
    "kcg": "a coast guard cap and binoculars beside a tablet showing an abstract sea map with brass markers",
    "jb": "a bank hackathon: laptops, a trophy and abstract fintech charts",
}


def gen(cid):
    os.makedirs(OUT, exist_ok=True)
    body = json.dumps({"model": "gpt-image-2.5-sunburst", "prompt": STYLE + "\nSubject: " + MOTIF[cid],
                       "size": "1536x1024", "quality": "high", "n": 1}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body,
                                 headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    try:
        r = json.loads(urllib.request.urlopen(req, timeout=300, context=ssl.create_default_context(cafile=certifi.where())).read())
    except urllib.error.HTTPError as e:
        print(cid, "HTTP", e.code, e.read().decode()[:300], flush=True)
        return
    d = r["data"][0]
    png = base64.b64decode(d["b64_json"]) if "b64_json" in d else urllib.request.urlopen(d["url"]).read()
    open(os.path.join(OUT, cid + ".png"), "wb").write(png)
    print(cid, "ok", len(png), flush=True)


if __name__ == "__main__":
    for c in sys.argv[1:]:
        gen(c)
