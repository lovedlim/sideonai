# 파비콘: 밤하늘 바탕의 둥근 사각형에 한나체 "AI"(청록)와 로고 아이덴트의 호박색 궤도.
# 작은 크기에서도 읽히게 크기마다 따로 그린다. 궤도가 있어야 어도비 일러스트레이터 아이콘과 헷갈리지 않는다.
import io, sys
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageFilter

REPO = sys.argv[1]
f = TTFont(f"{REPO}/src/app/fonts/baemin/BMHANNAPro.woff2"); f.flavor = None
buf = io.BytesIO(); f.save(buf); buf.seek(0)
FONT = buf.getvalue()

def draw(size, glow=True):
    S = size * 8  # 크게 그린 뒤 줄여서 가장자리를 매끄럽게
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    r = int(S * 0.22)
    d.rounded_rectangle([0, 0, S - 1, S - 1], r, fill=(3, 6, 11, 255))
    if glow:
        g = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(g).ellipse([S * 0.15, S * 0.15, S * 0.85, S * 0.85], fill=(77, 243, 255, 70))
        g = g.filter(ImageFilter.GaussianBlur(S * 0.12))
        mask = Image.new("L", (S, S), 0); ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], r, fill=255)
        im.paste(Image.alpha_composite(im, g), (0, 0), mask)
        d = ImageDraw.Draw(im)
    font = ImageFont.truetype(io.BytesIO(FONT), int(S * (0.7 if size <= 32 else 0.6)))
    x0, y0, x1, y1 = d.textbbox((0, 0), "AI", font=font)
    tx, ty = (S - (x1 - x0)) / 2 - x0, (S - (y1 - y0)) / 2 - y0
    if size >= 48:
        # 기울어진 궤도(아이덴트의 ellipse rotate(-12)와 같은 모양). 행성 고리처럼 위쪽은 글자 뒤, 아래쪽은 글자 앞으로 지나간다
        orb = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(orb).ellipse([S * 0.04, S * 0.31, S * 0.96, S * 0.69], outline=(255, 180, 84, 255), width=int(S * 0.035))
        orb = orb.rotate(12, resample=Image.BICUBIC)
        im.alpha_composite(orb)
        d = ImageDraw.Draw(im)
        d.text((tx, ty), "AI", font=font, fill=(77, 243, 255, 255))
        front = Image.new("L", (S, S), 0)
        ImageDraw.Draw(front).polygon([(0, S * 0.62), (S, S * 0.45), (S, S), (0, S)], fill=255)  # 궤도 기울기를 따라 아래쪽 절반
        im.paste(orb, (0, 0), Image.composite(orb.getchannel("A"), Image.new("L", (S, S), 0), front))
    else:
        # 탭 크기에서는 궤도 대신 궤도를 도는 호박색 점 하나
        d.text((tx, ty), "AI", font=font, fill=(77, 243, 255, 255))
        rr = S * 0.09
        cx, cy = S * 0.84, S * 0.8
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(255, 180, 84, 255))
    return im.resize((size, size), Image.LANCZOS)

out = sys.argv[2]
ico = [draw(s, glow=s > 32) for s in (16, 32, 48)]
ico[2].save(f"{out}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:2])
draw(192).save(f"{out}/icon.png", optimize=True)
apple = draw(180); bg = Image.new("RGBA", apple.size, (3, 6, 11, 255)); bg.alpha_composite(apple)
bg.convert("RGB").save(f"{out}/apple-icon.png", optimize=True)  # 아이폰은 투명 모서리를 검게 채우므로 꽉 채운 사각형
draw(512).save(f"{out}/preview-512.png")
