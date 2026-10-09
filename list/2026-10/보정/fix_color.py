# 프로젝터 빛이 번진 사진의 색 보정: 연두·노랑 계열 채도를 낮추고, 흰 물체 기준으로 색 균형을 맞춘다.
import sys, numpy as np
from PIL import Image, ImageOps

def fix(src, dst, green=0.45, overall=0.9, wb=1.0):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    a = np.asarray(im).astype(np.float32) / 255
    # 색 균형: 밝은 부분(책상·천장)의 평균이 회색이 되도록
    lum = a.mean(axis=2)
    bright = lum > np.percentile(lum, 70)
    m = a[bright].mean(axis=0)
    gain = (m.mean() / m) ** wb
    a = np.clip(a * gain, 0, 1)
    hsv = np.asarray(Image.fromarray((a * 255).astype(np.uint8)).convert("HSV")).astype(np.float32)
    h = hsv[..., 0] * 360 / 255
    # 노랑~연두(45~120도)는 많이, 나머지는 조금
    w = np.clip(1 - np.abs(h - 82) / 40, 0, 1)
    hsv[..., 1] *= overall * (1 - w * (1 - green))
    out = Image.fromarray(hsv.astype(np.uint8), "HSV").convert("RGB")
    out.save(dst, quality=92)

if __name__ == "__main__":
    fix(sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), float(sys.argv[5]))
