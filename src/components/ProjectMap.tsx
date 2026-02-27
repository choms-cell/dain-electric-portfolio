"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Portfolio } from "@/lib/types";
import "leaflet/dist/leaflet.css";

// 커스텀 마커 아이콘 (slate-900 점)
const createIcon = () =>
  L.divIcon({
    html: `<div style="width:14px;height:14px;background:#0f172a;border:2px solid white;border-radius:50%;box-shadow:0 1px 6px rgba(0,0,0,0.35)"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -12],
  });

// 구/군 단위 좌표
const DISTRICT_COORDS: Record<string, [number, number]> = {
  "서울_강남구": [37.5172, 127.0473], "서울_서초구": [37.4836, 127.0324],
  "서울_마포구": [37.5637, 126.9086], "서울_송파구": [37.5145, 127.1059],
  "서울_영등포구": [37.5262, 126.8962], "서울_중구": [37.5641, 126.9979],
  "서울_용산구": [37.5311, 126.9810], "서울_성동구": [37.5634, 127.0369],
  "서울_강서구": [37.5509, 126.8496], "서울_노원구": [37.6543, 127.0568],
  "경기_수원시": [37.2636, 127.0286], "경기_성남시": [37.4200, 127.1268],
  "경기_평택시": [36.9928, 127.1130], "경기_고양시": [37.6584, 126.8320],
  "경기_용인시": [37.2411, 127.1775], "경기_화성시": [37.1994, 126.8317],
  "경기_남양주시": [37.6360, 127.2163], "경기_안산시": [37.3219, 126.8309],
  "경기_부천시": [37.5035, 126.7660], "경기_안양시": [37.3943, 126.9568],
  "경기_파주시": [37.7601, 126.7802], "경기_시흥시": [37.3800, 126.8031],
  "경기_광명시": [37.4784, 126.8644], "경기_김포시": [37.6151, 126.7158],
  "인천_남동구": [37.4449, 126.7314], "인천_부평구": [37.4988, 126.7231],
  "인천_연수구": [37.4108, 126.6780], "인천_서구": [37.5458, 126.6759],
  "인천_중구": [37.4742, 126.6215], "인천_계양구": [37.5375, 126.7379],
  "부산_강서구": [35.2100, 128.9800], "부산_해운대구": [35.1631, 129.1634],
  "부산_부산진구": [35.1630, 129.0531], "부산_남구": [35.1368, 129.0846],
  "부산_사하구": [35.1042, 128.9742], "부산_수영구": [35.1451, 129.1139],
  "부산_동래구": [35.2044, 129.0842], "부산_북구": [35.1975, 128.9912],
  "대구_달서구": [35.8300, 128.5326], "대구_수성구": [35.8583, 128.6303],
  "대구_북구": [35.8855, 128.5828], "대구_중구": [35.8703, 128.5960],
  "광주_광산구": [35.2193, 126.7916], "광주_북구": [35.1745, 126.9120],
  "광주_서구": [35.1519, 126.8893], "광주_남구": [35.1338, 126.9027],
  "대전_유성구": [36.3624, 127.3561], "대전_서구": [36.3553, 127.3834],
  "대전_중구": [36.3250, 127.4213], "대전_대덕구": [36.3462, 127.4149],
  "울산_남구": [35.5201, 129.3023], "울산_북구": [35.5851, 129.3610],
  "울산_중구": [35.5636, 129.3188], "울산_동구": [35.5047, 129.4208],
  "세종_세종시": [36.4800, 127.2890], "세종_조치원읍": [36.6018, 127.3050],
  "충남_천안시": [36.8065, 127.1469], "충남_아산시": [36.7896, 127.0022],
  "충남_서산시": [36.7848, 126.4503], "충남_당진시": [36.8917, 126.6259],
  "충남_공주시": [36.4465, 127.1189], "충남_논산시": [36.1870, 127.0990],
  "충북_청주시": [36.6424, 127.4890], "충북_충주시": [36.9910, 127.9259],
  "전북_전주시": [35.8242, 127.1480], "전북_군산시": [35.9676, 126.7370],
  "전남_순천시": [34.9506, 127.4876], "전남_여수시": [34.7604, 127.6622],
  "경북_포항시": [36.0190, 129.3435], "경북_구미시": [36.1194, 128.3445],
  "경북_안동시": [36.5684, 128.7294], "경북_경산시": [35.8253, 128.7412],
  "경남_창원시": [35.2278, 128.6817], "경남_김해시": [35.2286, 128.8893],
  "경남_진주시": [35.1799, 128.1076], "경남_거제시": [34.8804, 128.6212],
  "강원_춘천시": [37.8813, 127.7298], "강원_원주시": [37.3422, 127.9202],
  "강원_강릉시": [37.7519, 128.8760],
  "제주_제주시": [33.4996, 126.5312], "제주_서귀포시": [33.2530, 126.5600],
};

// 시/도 중심 (fallback)
const REGION_CENTERS: Record<string, [number, number]> = {
  "서울": [37.5665, 126.9780], "경기": [37.4138, 127.5183],
  "인천": [37.4563, 126.7052], "부산": [35.1796, 129.0756],
  "대구": [35.8714, 128.6014], "광주": [35.1595, 126.8526],
  "대전": [36.3504, 127.3845], "울산": [35.5384, 129.3114],
  "세종": [36.4800, 127.2890], "강원": [37.8228, 128.1555],
  "충북": [36.8000, 127.7000], "충남": [36.5184, 126.8000],
  "전북": [35.7175, 127.1530], "전남": [34.8679, 126.9910],
  "경북": [36.4919, 128.8889], "경남": [35.4606, 128.2132],
  "제주": [33.4996, 126.5312],
};

function getCoords(region: string, district: string): [number, number] {
  return (
    DISTRICT_COORDS[`${region}_${district}`] ??
    REGION_CENTERS[region] ??
    [36.5, 127.8]
  );
}

// 같은 위치 겹치면 살짝 분산
function buildCoordMap(portfolios: Portfolio[]): Map<string, [number, number]> {
  const result = new Map<string, [number, number]>();
  const counter = new Map<string, number>();
  for (const p of portfolios) {
    const key = `${p.region}_${p.district}`;
    const n = counter.get(key) ?? 0;
    counter.set(key, n + 1);
    const [lat, lng] = getCoords(p.region, p.district);
    const angle = (n * 72 * Math.PI) / 180;
    const offset = n * 0.007;
    result.set(p._id, [lat + Math.sin(angle) * offset, lng + Math.cos(angle) * offset]);
  }
  return result;
}

interface Props {
  portfolios: Portfolio[];
}

export default function ProjectMap({ portfolios }: Props) {
  const coordMap = buildCoordMap(portfolios);
  const icon = createIcon();

  return (
    <div className="border border-slate-200 overflow-hidden">
      <MapContainer
        center={[36.5, 127.8]}
        zoom={7}
        style={{ height: "460px", width: "100%" }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {portfolios.map((p) => {
          const coords = coordMap.get(p._id);
          if (!coords) return null;
          return (
            <Marker key={p._id} position={coords} icon={icon}>
              <Popup minWidth={180}>
                <div style={{ padding: "4px 2px" }}>
                  <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                    {p.category} · {p.region} {p.district}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", marginBottom: "8px", lineHeight: "1.4" }}>
                    {p.title}
                  </p>
                  <a
                    href={`/portfolio/${p.slug.current}`}
                    style={{ fontSize: "11px", color: "#0f172a", fontWeight: 600, textDecoration: "underline" }}
                  >
                    자세히 보기 →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
